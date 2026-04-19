import { NextResponse } from "next/server";
import DodoPayments from "dodopayments";
import { Connection, Keypair, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, createTransferInstruction } from '@solana/spl-token';
import bs58 from 'bs58';

const dodo = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY, 
  environment: "test_mode", 
});


const USDC_MINT = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get("id");
    const targetWalletStr = searchParams.get("wallet"); 

    if (!paymentId || !targetWalletStr) {
      return NextResponse.json({ error: "Missing ID or Wallet" }, { status: 400 });
    }

    const payment = await dodo.payments.retrieve(paymentId);

    if (payment.status === 'succeeded') {
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      const secretKeyBytes = bs58.decode(process.env.TREASURY_PRIVATE_KEY as string);
      const treasuryWallet = Keypair.fromSecretKey(secretKeyBytes);
      const userWalletAddress = new PublicKey(targetWalletStr);

    
      const senderATA = await getAssociatedTokenAddress(USDC_MINT, treasuryWallet.publicKey);
      const receiverATA = await getAssociatedTokenAddress(USDC_MINT, userWalletAddress);

  
      const receiverAccountInfo = await connection.getAccountInfo(receiverATA);

      
      const transaction = new Transaction();

    
      if (!receiverAccountInfo) {
        transaction.add(
          createAssociatedTokenAccountInstruction(
            treasuryWallet.publicKey, 
            receiverATA,              
            userWalletAddress,        
            USDC_MINT                 
          )
        );
      }

const baseAmountInCents = Math.round(payment.total_amount / 1.18);

const fiatAmountPaid = baseAmountInCents / 100;

const amountInMicroUSDC = fiatAmountPaid * 1000000;

      
      transaction.add(
        createTransferInstruction(
          senderATA,   
          receiverATA,
          treasuryWallet.publicKey,
          amountInMicroUSDC
        )
      );

      
      const signature = await sendAndConfirmTransaction(
        connection, 
        transaction, 
        [treasuryWallet]
      );

      return NextResponse.json({ status: payment.status, hash: signature });
    }

    return NextResponse.json({ status: payment.status });
  } catch (error) {
    console.error("Bridge Error:", error);
    return NextResponse.json({ error: "Bridge failed" }, { status: 500 });
  }
}