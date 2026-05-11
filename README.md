# ⚡️ SubSettle Protocol
### Global Payments for Humans and AI — Instantly Settled on Solana

SubSettle is a fiat-to-crypto payment bridge that enables both humans and AI agents to receive instant, on-chain settlement.

🎬 **Live Demo:** https://youtu.be/QdDVQARddQw?si=XW5Qa8ReuPkD8wUB

🌐 **Live App:** https://subsettle-protocol.vercel.app/

**Built for the Superteam India x Dodo Payments Hackathon**

---

## 🚀 Quick Overview

SubSettle bridges the gap between traditional banking and the Solana ecosystem. 

* **The Client Experience:** Pay with a standard credit/debit card (Fiat) just like any Web2 store. No crypto knowledge or wallet required.
* **The Recipient Experience:** Receive instant USDC directly into a Solana wallet.
* **The Human-AI Synergy:** Humans use our AI to generate payment links with zero typing, while AI agents use our protocol to "bank" themselves autonomously.

---

## 🚨 The Problem

* **Human Friction:** Freelancers and SaaS owners lose 5–7% in fees to legacy banking (SWIFT) and wait 3–5 days for international payouts to clear.
* **The "Unbanked" AI:** Autonomous AI agents are currently excluded from the global economy because they cannot open traditional bank accounts to receive payments from humans.

---

## 💡 The Solution: A Frictionless Fiat-to-USDC Bridge

SubSettle is the first protocol of its kind designed to give AI agents a financial identity while keeping the payment process brilliantly simple for humans.

* **💳 Easy Fiat Payments:** Clients don't need crypto. They pay using a familiar, standard credit/debit card checkout via Dodo Payments.
* **🪙 Instant USDC Settlement:** Receivers get their funds instantly in stablecoins on Solana. No 3-day waiting periods. 
* **🤖 Built for the Agentic Web:** Autonomous AI agents can use our API (x402 protocol) to request payments and "bank" themselves without human intervention.
* **🪄 Zero-Typing AI Generation:** Human users don't need to manually type out payment forms. Our AI builds the fully configured checkout link with a single button click.

---

### 📊 Competitive Advantage & Business Model
*SubSettle is currently completely free (0% protocol fee) so users keep 100% of their earnings. In the future, we will introduce a highly competitive ~1.5% routing fee for enterprise/business accounts.*

---

### 📊 Competitive Advantage
| Feature | **SubSettle (Solana + Dodo)** | Stripe / PayPal | Traditional SWIFT |
| :--- | :--- | :--- | :--- |
| **Settlement Time** | **< 30 Seconds** | 2–7 Days (Payout) | 3–5 Business Days |
| **Total Fees** | **0% (Zero Protocol Fee)** | 3% – 4.5% + FX Fees | 5% – 7% + Flat Fees |
| **AI-Native (x402)** | ✅ **Native "Halt & Pay"** | ❌ Complex API | ❌ No |
| **Transparency** | ✅ **Public On-Chain Proof** | ❌ Private Ledger | ❌ Black Box |

---

## 🤖 Two Groundbreaking AI Capabilities

To truly bridge Web2 and Web3, we built native AI tooling for both sides of the transaction:

### 1. Zero-Typing AI Link Generation (For Humans)
Freelancers and creators don't need to manually type out product title, prices, or payment configurations. 
* With **one single button click**, our AI contextually drafts the entire checkout configuration and generates a secure Dodo payment link. No technical complexity, ready to share instantly.
> **Flow:** Human clicks button ➔ AI builds the link ➔ Client pays ➔ USDC arrives in wallet.

### 2. Autonomous Agent Payments via x402 (For AI)
SubSettle provides a next-generation financial bridge designed specifically for the Agentic Web. By implementing the x402 (Payment Required) protocol, AI agents can now "bank" themselves.
* An agent can autonomously request a payment, halt its workflow, and wait. Once a human pays via standard fiat card, the SubSettle backend verifies it and pushes USDC to the agent's wallet, triggering the agent to complete its task.
> **Flow:** AI calls API ➔ Receives 402 link ➔ Human pays fiat ➔ Backend verifies ➔ USDC sent to agent ➔ Agent finishes task.

---

## 🤖 Live Interactive Demo: The Autonomous x402 Agent

While my video demonstration highlights the human-facing dashboard, I invite the judges to experience the true underlying power of the SubSettle Protocol firsthand. 

**This project introduces a powerful, next-generation capability: a fully autonomous x402 Web3 payment agent.** This feature demonstrates the future of the Agentic Web. It proves that an AI can hit a data paywall, halt its own execution to request human fiat payment, and **autonomously wake back up** the exact millisecond the blockchain verifies the transaction—bridging traditional Web2 fiat seamlessly into Web3 autonomous logic.

### How to test the Autonomous Agent:

**Step 1: Prepare Your Terminal**
Open PowerShell on your machine. You do not need to run the repository locally to test this! I have pre-configured the script below to communicate directly with the live Vercel deployment. 

*(Note: If you prefer to test via localhost, simply change `https://subsettle-protocol.vercel.app/api/x402` to `http://localhost:3000/api/x402` in the two URLs within the script).*

**Step 2: Execute the Agent Script**
Copy the entire code block below, paste it into your PowerShell terminal, and press **Enter**:

```powershell
Write-Host "[SYSTEM] Initializing AI Agent: research_bot_v4..." -ForegroundColor Cyan
Write-Host "[AI] Requesting secure dataset from SubSettle Oracle..."

$authHeader = @{
    "Authorization" = "Bearer sk_live_sub_DEMO_KEY"
    "Content-Type" = "application/json"
}
$body = @{ agent_id = "research_bot_v4"; amount_usd = 10; description = "10,000 rows scraped" } | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://subsettle-protocol.vercel.app/api/x402" -Method Post -Headers $authHeader -Body $body
} catch {
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $reader.BaseStream.Position = 0
        $x402Response = $reader.ReadToEnd() | ConvertFrom-Json
        
        Write-Host ""
        Write-Host "!!! 402 PAYMENT REQUIRED !!!" -ForegroundColor Red
        Write-Host "[AI] Human assistance required. Please pay the invoice below:" -ForegroundColor Yellow
        Write-Host ">>> Link: $($x402Response.checkout_url)" -ForegroundColor Green
        Write-Host ""
        
        $sessionId = $x402Response.checkout_url.Split('/')[-1]
        
        $isPaid = $false
        Write-Host "[AI] Entering standby mode. Waiting for human payment..." -ForegroundColor DarkGray

        while (-not $isPaid) {
            Start-Sleep -Seconds 3 
            
            try {
                $checkUrl = "https://subsettle-protocol.vercel.app/api/check-status?id=$sessionId&wallet=8YVzR2XbBKh5o7R4y7rJm9UaL8GvW3eQxP1cT6kN4dF&t=$(Get-Date -UFormat %s)"
                $statusRes = Invoke-RestMethod -Uri $checkUrl -Method Get
                
                Write-Host " [$($statusRes.status)] " -NoNewline -ForegroundColor Yellow

                if ($statusRes.status -eq "succeeded") {
                    $isPaid = $true
                    Write-Host "`n`n===========================================" -ForegroundColor Green
                    Write-Host "[AI WAKE-UP SEQUENCE INITIATED]" -ForegroundColor Cyan
                    Write-Host "===========================================" -ForegroundColor Green
                    Write-Host "[SYSTEM] Fiat payment cleared. Solana USDC bridged successfully." -ForegroundColor Green
                    Write-Host "[SYSTEM] On-Chain Receipt: https://solscan.io/tx/$($statusRes.hash)?cluster=devnet" -ForegroundColor Green
                    Write-Host "[AI] Funds verified. Halt lifted. Downloading requested dataset now..." -ForegroundColor Cyan
                    Write-Host "[AI] Task Complete." -ForegroundColor Cyan
                }
            } catch {
                Write-Host " [BACKEND ERROR: $($_.Exception.Message)] " -NoNewline -ForegroundColor Red
            }
        }
    }
}
```

**Step 3: The AI Generates Your Payment Link**
Once you hit enter, the AI will attempt to fetch data but will be blocked by the SubSettle paywall. The AI will instantly generate a secure Dodo Payments checkout link, **send that link directly to your terminal**, and enter a standby mode waiting for you.

**Step 4: Complete the Fiat Payment**
`Ctrl + Click` the generated link in your terminal to open it in your browser. Complete the transaction using the global Dodo Test Card:
* **Card Number:** `4242 4242 4242 4242`
* **Expiry:** Any future date (e.g., `12/30`)
* **CVC:** Any 3 digits (e.g., `123`)

**Step 5: Autonomous Verification & Wake-Up**
Keep your terminal visible on your screen! Within seconds of clicking "Pay" in your browser, the SubSettle Oracle will verify the global fiat settlement and automatically bridge the exact USDC amount to the Solana Devnet. 

Watch the terminal—the AI agent will autonomously detect the successful transaction, wake back up, and output a clickable **Solscan Devnet Receipt** proving the on-chain settlement is complete.

---

### ⚡ Developer Note: System Speed & Devnet Wallet Quirks

**The SubSettle protocol backend and fiat-to-crypto bridge execute instantly.** However, when checking your Phantom Wallet on the Solana Devnet, you may notice two third-party UI quirks:

1. **Delayed Balance Updates (Wallet UI Lag):** Phantom heavily limits how often it pings the Devnet blockchain to save server resources. While our protocol transfers the USDC into your wallet instantly, Phantom's frontend UI might lag or require a manual refresh to "wake up" and display the new funds. 
2. **"Unknown Token" Display:** For security reasons, browser wallets purposefully strip logos and names from Devnet testing tokens to prevent scammers from impersonating Mainnet assets. 

*Rest assured, our backend infrastructure is highly optimized and fast. Because browser wallets can be slow to update on Devnet, the provided **Solscan receipt** serves as the immediate, verifiable proof that SubSettle flawlessly executed the transaction on-chain.*

---

## 🏗️ Technical Architecture

SubSettle operates as a high-security "Verification Oracle" ensuring no treasury movement happens without a valid fiat confirmation.

1.  **Card Checkout:** The user pays via credit card on the Dodo sandbox gateway.
2.  **Handshake Verification:** Upon redirect, our backend (`GET /api/webhook` alternative) performs a secure `dodo.payments.retrieve()` call to independently verify the payment status.
3.  **Treasury Signing:** Once `succeeded`, the backend utilizes the `TREASURY_PRIVATE_KEY` to sign the payout transaction.
4.  **On-Chain Settlement:** Using `@solana/spl-token`, the system automatically initializes an Associated Token Account (ATA) for the recipient if missing, and delivers the USDC.

```text

[ 💳 CARD PAY ] ➔ [ 🔍 SERVER-SIDE VERIFY ] ➔ [ ⚡ SOLANA SETTLEMENT ] ➔ [ 🧾 LEDGER SETTLED ]
 (Fiat Checkout)       (SubSettle Oracle)         (USDC to Wallet)         (Dashboard Update)
```

---

## 🚧 Sandbox Evaluation Notice

**⚠️ Recommendation: Please use the USD Test Card flow during checkout.**

To experience the true <30-second speed of our verified on-chain bridge, we highly recommend testing using the standard **USD Test Card** details provided below. 

Our backend protocol and bridging logic are entirely currency-agnostic and fully functional. However, please note a specific testing constraint: if the checkout client's billing country is set to **India AND the currency is set to INR**, the Dodo Payments Sandbox gateway may time out or fail to process. 

**Please Note:** This is not a bug in the SubSettle protocol. It is a strict compliance constraint built natively into the Dodo Payments test environment to simulate real-world financial regulations. Using the USD test card seamlessly bypasses this sandbox rule, allowing you to fully evaluate our Solana settlement architecture!

---

## 🧪 Judge Testing Guide

### Steps to Test:

1.  **Wallet Connection:** Connect your Solana wallet (e.g., Phantom) to the app.
2.  **Switch to Devnet:** Ensure your wallet network is set to **Devnet**.
3.  **Generate a Payment Link:** You can create a checkout link **manually** by filling out the details, OR click the **AI Generation** button to instantly draft it with zero typing.
4.  **Complete Checkout:** Open the generated link and pay using the test card details below.
5.  **Verify the Ledger:** Once paid, check your SubSettle dashboard. Our internal ledger will automatically update the transaction status to **Settled**.
6.  **Verify On-Chain:** Open your connected Phantom wallet (or check Solscan Devnet) to verify the instant USDC deposit.
7.  **Test the Autonomous AI (x402):** To evaluate the AI Agent "Halt & Pay" flow, please refer to the **"Technical Judge Verification"** section above and run the provided PowerShell script.

### Use the Test Card:

* **Card Number:** `4242 4242 4242 4242`
* **Expiry:** `12/29`
* **CVC:** `123`

---

## 💻 Technical Stack & Local Setup

### Core Technologies
* **Frontend:** Next.js 14 (App Router), React, Tailwind CSS
* **Backend / API:** Next.js Serverless Routes (Node.js)
* **Web3 & Blockchain:** `@solana/web3.js`, `@solana/spl-token`, Solana Wallet Adapter
* **Payments Infrastructure:** Dodo Payments API
* **Deployment:** Vercel

### Engineering Highlights
* **Security:** Server-side payment verification via Next.js backend APIs strictly prevents frontend spoofing or client-side manipulation.
* **Automation:** Programmatic Auto-ATA initialization ensures zero-friction settlement for "unbanked" or newly created Solana wallets.

### Local Installation
```bash
git clone https://github.com/pranyubala/subsettle.git
npm install
npm run dev
```

**Required Environment Variables (`.env.local`):**
```env
DODO_PAYMENTS_API_KEY=your_key
TREASURY_PRIVATE_KEY=your_base58_key
```

---

## 🔮 Future Roadmap

- 🚀 **Mainnet Deployment:** Real fiat to mainnet USDC settlement.
- 🔁 **Auto Swaps:** Integrating Raydium for multi-token payouts.
- 📦 **x402 SDK:** A plug-and-play npm package for AI developers to monetize agents instantly.

---

## 🏁 Conclusion

SubSettle is more than a payment link; it is the infrastructure for a world where AI and humans transact on the same level. **Fiat accessibility for humans, instant crypto settlement for the future.**

> *The bridge to the Agentic Web.*
