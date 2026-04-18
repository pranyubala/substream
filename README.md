# ⚡️ SubStream Protocol
**The Fiat-to-Crypto Settlement Layer for Global Freelancers and Autonomous AI Agents.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-substream.vercel.app-blue?style=for-the-badge)](https://substream-amber.vercel.app/)
[![Pitch Video](https://img.shields.io/badge/Pitch_Video-YouTube-red?style=for-the-badge)](https://YOUR_YOUTUBE_LINK_HERE)
[![Built With](https://img.shields.io/badge/Built_With-Next.js_|_Solana_|_Dodo-black?style=for-the-badge)]()

> **Built for the Payments Track | Superteam India x Dodo Payments.** ## 🚨 The Problem: The Web2 to Web3 Chasm
The next iteration of the internet is being built by a borderless workforce of global freelancers and autonomous AI agents. Yet, they are forced to rely on fractured, legacy financial rails. 
1. **The Freelancer Tax:** Global workers lose 5% to 7% of their income to SWIFT network fees, currency conversion, and banking delays that take days to settle.
2. **The AI Financial Lockout:** Autonomous AI models can generate immense value (research, code, data), but they cannot open traditional bank accounts. Because they lack financial rails, they cannot autonomously charge humans for their work.

## 💡 The SubStream Solution
**SubStream bridges the chasm.** We have engineered a decentralized payment bridge that allows clients to pay for services in their local fiat currency (via standard credit cards), while the creator or AI agent instantly receives stablecoins (USDC) directly on the Solana blockchain.
* **Zero Wire Fees:** Bypassing legacy banking infrastructure entirely.
* **Instant Settlement:** Funds are bridged and settled on-chain in seconds.
* **Programmable Revenue:** AI agents can now gate their execution behind SubStream paywalls, autonomously collecting revenue without human intervention.

## 🚀 Core Infrastructure (The Flex)
We didn't just build a UI; we engineered a secure, autonomous Web2-to-Web3 bridging protocol.

* **🌐 Global Smart Invoices:** Generate checkout links instantly. Clients pay via Dodo's fiat rails, and the funds are autonomously bridged to your connected Solana wallet via SPL-Token smart contracts.
* **🤖 x402 AI Agent Protocol:** Native Web3 financial rails for AI models. Agents can programmatically generate Dodo payment links via our API to gate content, data, or execution.
* **🧾 On-Chain Settlement Ledger:** A real-time dashboard that verifies Web2 payment success via Dodo Webhooks and provides cryptographic Web3 transaction hashes directly from Solscan.
* **🔀 Dynamic Wallet Routing:** The protocol automatically detects the connected user's Solana wallet and routes the bridged crypto directly to their Associated Token Account (ATA).

## 🏗️ System Architecture 
SubStream operates as a secure middle-layer bridging traditional finance and blockchain execution.

1. **The Fiat Layer (Web2):** A user initiates a payment via the Next.js frontend. Dodo Payments securely processes the credit card.
2. **The Oracle/Webhook:** Dodo securely pings the SubStream backend API, confirming fiat settlement and providing metadata.
3. **The Web3 Bridge (Node):** The Next.js backend securely signs a transaction using an isolated Treasury Private Key. It utilizes `@solana/spl-token` to locate the user's Associated Token Account (ATA) and mints/transfers the equivalent value in Devnet USDC.
4. **The Settlement Verification:** The frontend dynamically updates, providing the user with a real, verifiable Solscan transaction hash.

## 🧑‍⚖️ Judge's Testing Guide (Quick Start)
This application is currently live and optimized for testing on **Solana Devnet** and **Dodo Test Mode**. 

**To experience the full fiat-to-crypto bridge:**
1. Connect a Solana Wallet (e.g., Phantom) to the dashboard and ensure it is set to **Devnet**.
2. Click **Deploy Smart Invoice** (or run the x402 AI simulation).
3. Open the generated Dodo payment link.
4. **Use the official Dodo Test Credit Card:**
   * **Card Number:** `4242 4242 4242 4242`
   * **Expiry:** `Any future date (e.g., 12/30)`
   * **CVC:** `123`
5. Upon redirect, watch the dashboard update from "Awaiting Fiat" to "Settled" and click the purple **View on Solscan** button to verify the real on-chain transfer!

> 🛡️ **Treasury Security Notice:** To preserve our Treasury's Devnet liquidity for all judges and prevent automated draining, manual invoices and AI agent simulations are strictly capped at a **$15.00 maximum** per transaction.

## 💻 Technical Stack
* **Frontend:** Next.js 14 (App Router), React, Tailwind CSS, Lucide Icons
* **Web3 Infrastructure:** `@solana/web3.js`, `@solana/spl-token`, Solana Wallet Adapter
* **Fiat Processing:** Dodo Payments API & Secure Webhooks
* **Deployment & Edge:** Vercel

## 🛠️ Local Development Setup
Want to run the bridge locally? 

1. Clone the repository:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/substream.git](https://github.com/YOUR_USERNAME/substream.git)
   cd substream
