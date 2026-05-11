export const dynamic = 'force-dynamic'; 
export const fetchCache = 'force-no-store';

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
const processedPayments = new Set();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get("id");
    const targetWalletStr = searchParams.get("wallet"); 

    if (!paymentId || !targetWalletStr) {
      return NextResponse.json({ error: "Missing ID or Wallet" }, { status: 400 });
    }

    let paymentStatus: string = "pending";
    let totalAmount: number = 1770; 
    let taxAmount: number = 0; 

    try {
      if (paymentId.startsWith("cks_")) {
        const session: any = await dodo.checkoutSessions.retrieve(paymentId);
        
        const currentStatus = session.status || session.payment_status || "pending";
        paymentStatus = (currentStatus === "paid" || currentStatus === "succeeded" || currentStatus === "complete") ? "succeeded" : currentStatus;
        
        totalAmount = session.total_amount || session.amount_total || session.amount || 1770;
        taxAmount = session.tax_amount || session.tax || 0; 

        if (paymentStatus === "succeeded" && session.payment_id) {
            const actualPayment: any = await dodo.payments.retrieve(session.payment_id);
            totalAmount = actualPayment.total_amount || totalAmount;
            taxAmount = actualPayment.tax_amount || actualPayment.tax || taxAmount; 
        }

      } else {
        const payment: any = await dodo.payments.retrieve(paymentId);
        paymentStatus = payment.status || "pending";
        totalAmount = payment.total_amount || 1770;
        taxAmount = payment.tax_amount || payment.tax || 0; 
      }
    } catch (dodoError) {
      console.error("Dodo Retrieval Error:", dodoError);
      return NextResponse.json({ error: "Failed to fetch status from Dodo" }, { status: 500 });
    }

    if (paymentStatus === 'succeeded') {
      if (processedPayments.has(paymentId)) {
        return NextResponse.json({ status: paymentStatus, message: "already_processed" });
      }
      processedPayments.add(paymentId);

      // --- SOLANA SETTLEMENT ---
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
          createAssociatedTokenAccountInstruction(treasuryWallet.publicKey, receiverATA, userWalletAddress, USDC_MINT)
        );
      }

    
      const baseAmountInCents = totalAmount - taxAmount; 
      const fiatAmountPaid = baseAmountInCents / 100;
      const amountInMicroUSDC = Math.floor(fiatAmountPaid * 1000000);

      transaction.add(
        createTransferInstruction(senderATA, receiverATA, treasuryWallet.publicKey, amountInMicroUSDC)
      );

      const signature = await sendAndConfirmTransaction(connection, transaction, [treasuryWallet]);
      return NextResponse.json({ status: paymentStatus, hash: signature });
    }

    return NextResponse.json({ status: paymentStatus });

  } catch (error) {
    console.error("Bridge Error:", error);
    return NextResponse.json({ error: "Bridge failed" }, { status: 500 });
  }
}

