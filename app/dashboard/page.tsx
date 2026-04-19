"use client";
import { useState, useEffect } from "react";
import { Loader2, ExternalLink, Clock, CheckCircle2, Copy, Wallet, Bot, X } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";

export default function Dashboard() {
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);

  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false); 

  
  const { wallet, connected, select, publicKey } = useWallet();

  useEffect(() => {
    setIsMounted(true);
  }, []);

 useEffect(() => {
    const savedInvoices = localStorage.getItem("substream_v2");
    let loadedInvoices = savedInvoices ? JSON.parse(savedInvoices) : [];

    // Set initial load state right away so the UI doesn't look empty
    setInvoices(loadedInvoices);
    setIsLoaded(true);

    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const dodoPaymentId = urlParams.get("payment_id");

    if (!dodoPaymentId) return;

    const activeInvoiceId = localStorage.getItem("active_invoice");
    let pendingIndex = activeInvoiceId
      ? loadedInvoices.findIndex((inv: any) => inv.id === activeInvoiceId)
      : loadedInvoices.findIndex((inv: any) => inv.status === "pending");

    if (pendingIndex === -1) return;

    const checkPaymentInterval = setInterval(async () => {
      try {
        const userWalletStr = publicKey ? publicKey.toBase58() : "";
        const timestamp = Date.now(); // The ultimate cache-buster
        
        const res = await fetch(`/api/check-status?id=${dodoPaymentId}&wallet=${userWalletStr}&t=${timestamp}`, { cache: "no-store" });
        const data = await res.json();

      
        if (data.status === "succeeded") {
          loadedInvoices[pendingIndex].status = "paid";
          loadedInvoices[pendingIndex].id = dodoPaymentId;
          
          if (data.hash) {
            loadedInvoices[pendingIndex].hash = data.hash;
          }

          localStorage.setItem("substream_v2", JSON.stringify(loadedInvoices));
          localStorage.removeItem("active_invoice");
          setInvoices([...loadedInvoices]); // Force UI update
          window.history.replaceState({}, document.title, window.location.pathname);
          
          clearInterval(checkPaymentInterval); // Stop checking!
          
        } else if (data.status === "expired" || data.status === "failed" || data.status === "canceled") {
          loadedInvoices[pendingIndex].status = data.status;
          loadedInvoices[pendingIndex].id = dodoPaymentId;
          
          localStorage.setItem("substream_v2", JSON.stringify(loadedInvoices));
          localStorage.removeItem("active_invoice");
          setInvoices([...loadedInvoices]); // Force UI update
          window.history.replaceState({}, document.title, window.location.pathname);
          
          clearInterval(checkPaymentInterval); // Stop checking!
        }
        
      
      } catch (error) {
        console.error("Failed to verify payment:", error);
      }
    }, 2000); 
    
    return () => clearInterval(checkPaymentInterval);
  }, [publicKey]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("substream_v2", JSON.stringify(invoices));
    }
  }, [invoices, isLoaded]);

  const handleGenerateInvoice = async () => {
    setLoading(true);
    setPaymentLink("");
    try {
      const response = await fetch("/api/create-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planName: `Invoice for ${clientName}`, price: Number(amount) }),
      });
      
      const data = await response.json();
      if (data.url) {
        setPaymentLink(data.url);
        
        const newInvoice = {
          id: `INV-00${invoices.length + 1}`,
          client: clientName,
          amount: Number(amount),
          status: "pending",
          date: new Date().toLocaleDateString(),
          link: data.url,
        };
        
        setInvoices([newInvoice, ...invoices]);
        setClientName(""); 
        setAmount("");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to generate invoice.");
    }
    setLoading(false);
  };

  const handleSimulateAIAgent = async () => {
    setIsSimulating(true);
    const dynamicAmount = Math.floor(Math.random() * (15 - 5 + 1) + 5);

    try {
      const response = await fetch("/api/create-link", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          planName: `x402 Protocol: Autonomous Data Release`, 
          price: dynamicAmount 
        }),
      });
      
      const data = await response.json();
      
      if (data.url) {
        const aiInvoice = {
          id: `x402-AUTH-${Math.random().toString(36).substring(2, 9).toUpperCase()}`, 
          client: `🤖 AI Agent (research_bot_v4)`, 
          amount: dynamicAmount,
          status: "pending",
          date: new Date().toLocaleDateString(),
          link: data.url,
          walletAddress: wallet?.adapter?.publicKey?.toBase58() || "",
        };
        
        setInvoices((prev) => [aiInvoice, ...prev]);
      } else {
        alert("Simulation failed. Could not generate Dodo link.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to simulate AI Agent.");
    }
    setIsSimulating(false);
  };

  const copyToClipboard = (text: string, idToTrack?: string) => {
    if (idToTrack) {
      localStorage.setItem("active_invoice", idToTrack);
    }
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const totalVolume = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex justify-between items-center border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:bg-blue-500 transition-colors">
              <span className="font-bold text-white text-lg">S</span>
            </Link>
            <Link href="/">
              <h1 className="text-3xl font-bold tracking-tight font-serif hidden sm:block hover:text-zinc-300 transition-colors cursor-pointer">
                SubStream Protocol
              </h1>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-900 px-4 py-2 rounded-full text-xs font-mono flex items-center gap-2 hidden md:flex">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Solana Devnet: Active
            </span>
            
            {isMounted ? (
              <div className="flex items-center gap-3">
                {wallet && !connected && (
                  <button 
                    onClick={() => select(null)}
                    className="text-xs text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-md border border-red-500/20 transition-all font-medium"
                  >
                    Disconnect
                  </button>
                )}
                <WalletMultiButton style={{ backgroundColor: "#27272a", borderRadius: "8px", height: "40px" }} />
              </div>
            ) : (
              <div className="w-[135px] h-[40px] bg-zinc-800 animate-pulse rounded-lg border border-zinc-700"></div>
            )}
          </div>
        </header>

        {!connected ? (
          <div className="flex flex-col items-center justify-center py-24 sm:py-32 text-center animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center mb-8 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/10 blur-xl"></div>
              <Wallet className="w-10 h-10 text-blue-400 relative z-10" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Initialize SubStream Terminal</h2>
            <p className="text-zinc-400 max-w-md mx-auto mb-10 text-lg">
              Authenticate via your Solana wallet to access global fiat-to-crypto invoicing and deploy x402 autonomous billing agents.
            </p>
            {isMounted && (
               <div className="scale-110 shadow-[0_0_30px_rgba(37,99,235,0.2)] rounded-lg">
                 <WalletMultiButton style={{ backgroundColor: "#2563eb", borderRadius: "8px", height: "48px", padding: "0 32px", fontWeight: "bold" }} />
               </div>
            )}
          </div>
        ) : (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 bg-[#1a1a1a] rounded-2xl p-6 md:p-8 flex flex-col gap-6">
                <div>
                  <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.15em] mb-2">Total Volume Settled</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white tracking-tight">
                      ${totalVolume.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </span>
                    <span className="text-sm font-bold text-zinc-500">USDC</span>
                  </div>
                  <p className="text-xs text-emerald-500 mt-2 font-medium">Instant USDC Settlement via Dodo</p>
                </div>

                <div className="w-full h-px bg-[#27272a]"></div>

                <div>
                  <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.15em] mb-2">Total Invoices Executed</h3>
                  <span className="text-4xl font-bold text-zinc-300">{invoices.length}</span>
                </div>
              </div>

              {/* Manual Form */}
              <div className="md:col-span-2 bg-[#1a1a1a] rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-4 font-serif">Create Global Smart Invoice</h2>
                <p className="text-sm text-zinc-400 mb-8 max-w-xl leading-relaxed">
                  Generate a decentralized Dodo checkout link. Your client pays in local fiat, and you receive stablecoins (USDC) directly on Solana with zero wire fees.
                </p>
                   
                   
                <div className="mb-8 bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 flex items-start gap-4 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                  <div className="mt-0.5 p-2 bg-amber-500/20 rounded-lg">
                    <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-amber-400 mb-2 tracking-wide uppercase">Demo Mode (Solana Devnet)</h4>
                    <div className="text-sm text-amber-300/90 leading-relaxed space-y-2">
                      <p className="text-lg">
                        <strong className="text-amber-200 font-black">⚠️ Max Test Amount: $15.00</strong>
                      </p>
                      <p>
                        This demo uses test USDC on Solana Devnet. Please keep amounts within the limit for a consistent demo experience.
                          </p>
                    </div>
                  </div>
                </div>
              
               
                <form 
                  onSubmit={(e) => { 
                    e.preventDefault(); 
                    handleGenerateInvoice(); 
                  }} 
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Client / Project Identifier</label>
                    <input 
                      type="text" 
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                      className="w-full bg-[#09090b] border border-[#27272a] rounded-lg p-3 text-white focus:outline-none focus:border-zinc-500 transition-colors"
                      placeholder="e.g., Acme Corp Redesign"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Settlement Amount (USD)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-lg">$</span>
                      <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        min="1"
                        step="0.01"
                        className="w-full bg-[#09090b] border border-[#27272a] rounded-lg p-3 pl-8 text-white focus:outline-none focus:border-zinc-500 transition-colors"
                        placeholder="500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full sm:w-auto bg-[#a1a1aa] hover:bg-[#d4d4d8] text-black font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Deploy Smart Invoice"}
                    </button>
                  </div>
                </form>

                {/* Generated Link UI */}
                {paymentLink && (
                  <div className="mt-6 p-4 bg-black border border-[#27272a] rounded-lg animate-in fade-in duration-300">
                    <p className="text-xs text-emerald-400 font-bold mb-2 uppercase tracking-wider">Payment Protocol Initialized</p>
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        readOnly 
                        value={paymentLink} 
                        className="flex-1 bg-transparent text-zinc-300 font-mono text-sm outline-none"
                      />
                      <button 
                        onClick={() => copyToClipboard(paymentLink, invoices.length > 0 ? invoices[0].id : undefined)}
                        className="px-4 py-2 bg-[#27272a] hover:bg-zinc-700 rounded-md transition-colors text-white text-sm font-medium"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* AI PANEL */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -z-10"></div>
              
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <Bot className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold">x402 Autonomous Agent Billing</h3>
              </div>
              <p className="text-zinc-400 mb-6 max-w-3xl">
                Equip your AI models with native Web3 financial rails. When an agent gates execution behind a paywall, it triggers this endpoint to autonomously request fiat payment from human users.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4 flex flex-col justify-center">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Production API Key</label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-black border border-zinc-700 rounded-lg p-3 text-green-400 font-mono text-sm overflow-x-auto">
                        sk_live_sub_7f8a9b2c1d4e5f6
                      </code>
                      <button 
                        onClick={() => copyToClipboard("sk_live_sub_7f8a9b2c1d4e5f6")}
                        className="p-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg transition-colors text-white"
                        title="Copy API Key"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <p className="text-sm text-blue-400 leading-relaxed">
                      <span className="font-bold">x402 Protocol Active:</span> Revenue generated by your API agents bypasses legacy SWIFT networks, settling instantly to your Solana wallet.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="bg-black border border-zinc-800 rounded-lg p-5 font-mono text-xs sm:text-sm text-zinc-300 relative shadow-inner">
                    <div className="absolute top-0 right-0 px-3 py-1 bg-zinc-800 border-b border-l border-zinc-700 text-zinc-400 rounded-bl-lg rounded-tr-lg font-sans text-xs font-bold tracking-wider">
                      cURL
                    </div>
                    <pre className="overflow-x-auto mt-2 leading-relaxed">
<span className="text-pink-400">curl</span> -X POST https://api.substream.finance/v1/x402 \ <br/>
  -H <span className="text-green-300">"Authorization: Bearer sk_live_sub..."</span> \ <br/>
  -H <span className="text-green-300">"Content-Type: application/json"</span> \ <br/>
  -d <span className="text-yellow-300">{"{"}</span> <br/>
  <span className="text-blue-300">  "agent_id"</span>: <span className="text-green-300">"research_bot_v4"</span>, <br/>
  <span className="text-blue-300">  "amount_usd"</span>: <span className="text-purple-300">"VARIABLE"</span>, <br/>
  <span className="text-blue-300">  "description"</span>: <span className="text-green-300">"10,000 rows scraped"</span> <br/>
  <span className="text-yellow-300">{"}"}</span>
                    </pre>
                  </div>
                  
           
  <div className="flex items-start gap-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg shadow-inner mb-4">
    <span className="text-base leading-none">⚠️</span>
    <p>
      <span className="font-bold">Demo Mode (Devnet):</span> Autonomous agent payouts are strictly capped at $15.00 to preserve test network liquidity.
    </p>
  </div>

                  <button 
                    type="button" 
                    onClick={handleSimulateAIAgent}
                    disabled={isSimulating}
                    className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.3)] disabled:opacity-50"
                  >
                    {isSimulating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Bot className="w-5 h-5" />}
                    Run x402 Agent Simulation
                  </button>
                </div>
              </div>
            </div>

            {/* LEDGER */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-zinc-800 bg-zinc-900/50">
                <h3 className="text-xl font-bold">On-Chain Settlement Ledger</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-black/50 text-zinc-400 text-sm uppercase tracking-wider">
                      <th className="p-4 font-medium">Invoice ID</th>
                      <th className="p-4 font-medium">Entity</th>
                      <th className="p-4 font-medium">Timestamp</th>
                      <th className="p-4 font-medium">Amount</th>
                      <th className="p-4 font-medium">Network Status</th>
                      <th className="p-4 font-medium text-right">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {invoices.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-zinc-500 italic">
                          Awaiting network deployment. Generate your first smart invoice above!
                        </td>
                      </tr>
                    ) : (
                      invoices.map((inv, index) => (
                        <tr key={`${inv.id}-${index}`} className="hover:bg-zinc-800/50 transition-colors">
                          <td className="p-4 font-mono text-sm text-zinc-300">
                            {inv.id.startsWith('pay_') ? `${inv.id.substring(0, 12)}...` : inv.id}
                          </td>
                          <td className="p-4 font-medium">{inv.client}</td>
                          <td className="p-4 text-zinc-400 text-sm">{inv.date}</td>
                          <td className="p-4 font-mono text-white">${inv.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                          <td className="p-4">
                            {inv.status === "paid" ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Settled
                              </span>
                            ) : inv.status === "pending" ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                                <Clock className="w-3.5 h-3.5" /> Awaiting Fiat
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 capitalize">
                                <X className="w-3.5 h-3.5" /> {inv.status}
                              </span>
                            )}
                          </td>
                          
                          <td className="p-4 text-right">
                            {inv.status === "paid" && inv.hash ? (
                              <a 
                                href={`https://solscan.io/tx/${inv.hash}?cluster=devnet`}
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-600 hover:bg-green-500 text-white rounded-md transition-colors text-xs font-bold"
                                title="View Real Transaction on Solana Devnet"
                              >
                                View on Solscan ↗
                              </a>
                            ) : inv.status === "paid" ? (
                              <span className="text-zinc-600 text-sm italic flex items-center justify-end gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                              </span>
                            ) : (
                              <div className="flex justify-end gap-2">
                                <button 
                                  onClick={() => copyToClipboard(inv.link, inv.id)}
                                  className="p-2 bg-black border border-zinc-700 rounded-md hover:border-zinc-500 text-zinc-400 hover:text-white transition-colors"
                                  title="Copy Link"
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                                <a 
                                  href={inv.link} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  onClick={() => localStorage.setItem("active_invoice", inv.id)}
                                  className="p-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white transition-colors flex items-center"
                                  title="Open Link"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}