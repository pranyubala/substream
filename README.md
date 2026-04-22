# ⚡️ SubSettle Protocol
### Global Payments for Humans and AI — Instantly Settled on Solana

SubSettle is a fiat-to-crypto payment layer that enables both humans and AI agents to receive instant, on-chain payments.

🎬 Live Demo: https://youtu.be/P5IU_QlRwYo?si=32m9DFG34arti7uT
🌐 Live App:  https://subsettle-protocol.vercel.app/

Built for the Superteam India x Dodo Payments Hackathon

---

## 🚨 The Problem

Global payments today are slow, expensive, and fragmented.

- Freelancers lose 5–7% in fees due to SWIFT, FX conversion, and intermediaries  
- Settlement takes 3–5 days across borders  
- AI agents cannot charge users due to a lack of autonomous financial infrastructure  

> The internet is global and autonomous — but payments are not.

---

## 💡 The Solution

SubSettle bridges fiat and crypto seamlessly.

Users pay via cards using Dodo Payments, while recipients receive USDC instantly on Solana.

### Key Benefits

- ⚡ Instant On-Chain Settlement — Funds arrive in seconds  
- 🌍 Global Payments — No banking friction  
- ❌ No SWIFT Dependency — Eliminate legacy rails  
- 🤖 AI Monetization (x402) — Agents can request payments autonomously  

---

## ⚡ How It Works

SubSettle simplifies global payments into 3 clear steps:

1. **Generate Payment Link**  
   A freelancer or AI agent creates a unique checkout link using SubSettle 

2. **Client Pays via Link**  
   The client opens the link and completes the payment using a standard credit card (via Dodo Payments)  

3. **Instant On-Chain Settlement**  
   The payment is verified via webhook, and USDC is instantly sent to the recipient’s wallet on Solana  

---

## 🤖 Autonomous Payments (x402)

SubSettle enables AI agents to monetize their work, unlocking a future where AI can earn, transact, and operate independently.

### The Automated AI Flow:

1. The AI agent requests payment to unlock a specific task or prompt  
2. The user receives a SubSettle checkout link  
3. The user completes the fiat payment  
4. The system verifies the transaction and autonomously releases the AI output  

---

## 🧠 Key Technical Components

### 🔹 Dynamic Token Routing
- Detects user Associated Token Accounts (ATA)  
- Auto-creates the ATA if it is missing  
- Ensures seamless USDC delivery  

---

### 🔹 Secure Webhook Verification
- Relies on Dodo Payments webhooks to confirm transactions  
- Backend verifies the payment securely  
- Prevents frontend spoofing or manipulation  

---

### 🔹 Treasury Architecture
- Utilizes a backend-controlled treasury wallet  
- Executes payouts securely  
- Keeps the frontend completely trustless  

---

## 🏗️ System Architecture


[Client] → Pays via Link ($50)
↓
[Dodo Payments] → Processes Fiat Checkout
↓
(Webhook Trigger)
↓
[SubSettle API] → Verifies Payment securely
↓
[Solana Devnet] → Transfers USDC to User Wallet
↓
[Dashboard] → Displays Transaction + Explorer Link


---

## 🧪 Judge Testing Guide

⚡ Recommended: Use USD payments for the best demo experience.

### Steps to Test:

1. Connect a Solana wallet (Phantom)  
2. Switch your network to Devnet  
3. Generate an invoice OR run the AI agent demo  
4. Open the generated payment link  

### Use the Test Card:

- Card: 4242 4242 4242 4242  
- Expiry: 12/29
- CVC: 123  

---

### After Payment:

- The dashboard status will update to **Settled**  
- The transaction will be fully visible on-chain (Devnet Solscan)  

---

## 🛡️ Demo Notice

- Transactions are currently capped at $15  
- Running on Solana Devnet using test USDC  
- Designed for consistent, secure demo performance  

---

## 🚧 Known Limitations

⚠️ This project uses USD-based payments in Dodo Test Mode.

Some region-specific payment methods (such as INR) may fail in sandbox environments due to strict regulatory API limitations and cross-border constraints.

To ensure a smooth judging experience, all core flows are fully functional using USD.

---

## 💼 Business Model

SubSettle acts as a highly efficient payment routing layer:

- Charges a ~1.5% transaction fee  
- Undercuts traditional Web3 on-ramps like Stripe Crypto or MoonPay  
- Built to scale with freelancers, SaaS platforms, and agentic AI economies  

---

## 💻 Tech Stack

**Frontend:** Next.js 14 (App Router), React, Tailwind CSS  
**Web3:** @solana/web3.js, @solana/spl-token, Solana Wallet Adapter  
**Payments:** Dodo Payments API, Secure Webhooks  
**Deployment:** Vercel  

---

## 🔮 Future Roadmap

- 🚀 Mainnet Deployment: Processing real fiat and USDC  
- 🔁 Auto Swaps: Integrating Raydium for token flexibility  
- 📦 x402 SDK: Plug-and-play payments for AI agents  

---

## 🏁 Conclusion

SubSettle redefines global payments by combining:

- Fiat accessibility  
- Instant crypto settlement  
- AI-native monetization  

> A payment layer built for both humans and autonomous systems.
