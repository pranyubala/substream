# ⚡️ SubStream Protocol  
### Global Payments for Humans and AI — Instantly Settled on Solana

**Live Demo Video:** *(add your link)*  
**GitHub Repo:** *(your repo link)*  

Built for the **Dodo Payments x Solana Global Hackathon**

---

# 🚨 The Problem

Global payments today are slow, expensive, and fragmented.

- Freelancers lose **5–7%** in fees due to SWIFT, FX conversion, and intermediaries  
- Settlement takes **3–5 days** across borders  
- AI agents cannot charge users because they lack financial infrastructure  

> The future internet is global and autonomous — but payments are still stuck in the past.

---

# 💡 The Solution

**SubStream bridges fiat and crypto seamlessly.**

Users pay using **cards or local payment methods**, while recipients instantly receive **USDC on Solana**.

### Key Benefits:
- ⚡ Instant Settlement — funds arrive in seconds  
- 🌍 Global Payments — no banking friction  
- ❌ No SWIFT Dependency — eliminate legacy rails  
- 🤖 AI Monetization (x402) — agents can request payments autonomously  

---

# 🤖 Autonomous Payments (x402)

SubStream introduces **agent-native payments**.

AI agents can:
- Generate payment requests  
- Gate execution behind paywalls  
- Receive payments without human intervention  

> This unlocks a new model where AI can earn, transact, and operate independently.

---
# ⚡ How It Works (Simple Flow)

SubStream makes global payments seamless in 3 steps:

1. **Create Payment**
   - A freelancer or AI agent generates a payment link

2. **Client Pays in Fiat**
   - The client pays using a credit card or local payment method via Dodo Payments

3. **Instant Crypto Settlement**
   - Funds are verified and instantly settled as USDC on Solana to the recipient’s wallet

---

### 🤖 AI Flow (x402)

1. AI agent requests payment  
2. User receives a payment link  
3. After payment, the AI completes its task  

> This enables AI to monetize work autonomously.
# 🧠 Key Technical Components

Building a fiat-to-crypto bridge requires synchronizing Web2 and Web3 systems.

### 🔹 Dynamic Token Routing
SubStream uses `@solana/spl-token` to:
- Detect user Associated Token Accounts (ATA)  
- Create them automatically if missing  
- Ensure seamless USDC delivery  

---

### 🔹 Secure Webhook Verification
- Payments are verified via **server-side webhooks (Dodo Payments)**  
- Backend acts as a trusted execution layer  
- Prevents frontend spoofing or manipulation  

---

### 🔹 Treasury Architecture
- Uses a backend-controlled treasury wallet  
- Signing authority remains isolated  
- Frontend remains trustless  

---

# 🏗️ System Architecture Flow

```
[Client] → Pays via Card ($50)
      ↓
[Dodo Payments] → Processes Fiat
      ↓
(Webhook Trigger)
      ↓
[SubStream API] → Verifies Payment
      ↓
[Solana Devnet] → Transfers USDC to User Wallet
      ↓
[Dashboard] → Displays Transaction + Solscan Link
```

---

# 🧪 Judge Testing Guide (Quick Start)

This app is live and optimized for **Solana Devnet + Dodo Test Mode**

### Steps:

1. Connect a **Solana Wallet (Phantom)** and switch to Devnet  
2. Click **Generate Invoice** or run **AI Agent Demo**  
3. Open generated payment link  
4. Use test card:

```
Card: 4242 4242 4242 4242  
Expiry: Any future date  
CVC: 123  
```

5. After payment:
   - Status updates to **Settled**  
   - Click **View on Solscan** to verify on-chain transaction  

---

# 🛡️ Demo Notice

⚠️ Transactions are capped at **$15**  

Running on **Solana Devnet with test USDC** to ensure consistent demo performance.

---

# 💼 Business Model

SubStream acts as a **payment routing layer**:

- Captures ~**1.5% fee per transaction**  
- Undercuts traditional providers like Stripe Crypto and MoonPay  
- Scales with global SaaS, freelancers, and AI economies  

---

# 💻 Tech Stack

**Frontend**
- Next.js 14 (App Router)  
- React + Tailwind CSS  

**Web3**
- @solana/web3.js  
- @solana/spl-token  
- Solana Wallet Adapter  

**Payments**
- Dodo Payments API  
- Secure Webhooks  

**Deployment**
- Vercel  

---

# 🔮 Future Roadmap

- 🚀 Mainnet Deployment — real USDC settlement  
- 🔁 Auto Swaps — integrate Raydium for token conversion  
- 📦 x402 SDK — plug-and-play monetization for AI agents  

---

# 🏁 Conclusion

SubStream is not just an invoicing tool.

It is a **payment infrastructure layer** that enables:
- Instant global transactions  
- Seamless fiat-to-crypto conversion  
- Autonomous monetization for AI agents  

---

### Built for the future of global payments on Solana ⚡
