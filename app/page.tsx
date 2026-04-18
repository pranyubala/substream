import Link from "next/link";
import { ArrowRight, Globe, Zap, Briefcase, ChevronRight, Bot, X, Check, HelpCircle } from "lucide-react";
import Navbar from "@/components/ui/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
      
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-40 pb-32 sm:pt-48 sm:pb-40 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-0 right-20 w-[400px] h-[400px] bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-8">
            Human Invoicing & <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-500">
              AI Settlement Protocol.
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-zinc-400 mb-10 leading-relaxed">
            Bill international clients in fiat. Equip AI agents to charge for tasks. Receive instant USDC directly on Solana with zero SWIFT delays.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/dashboard" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              Launch Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="https://github.com/pranyubala/substream" 
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-zinc-800 text-white rounded-full font-bold text-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
            >
              View GitHub <ChevronRight className="w-5 h-5 text-zinc-500" />
            </a>
          </div>
        </div>
      </div>

      {/* Powered By Logos */}
      <div className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-center text-sm font-medium text-zinc-500 mb-6 uppercase tracking-widest">Powered by Web3 Infrastructure</p>
          <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-xl font-bold tracking-tighter flex items-center gap-2"><div className="w-6 h-6 bg-current rounded-full"></div>Solana</span>
            <span className="text-xl font-bold tracking-tighter">Dodo Payments</span>
            <span className="text-xl font-bold tracking-tighter flex items-center gap-2"><Briefcase className="w-6 h-6" /> Superteam Earn</span>
          </div>
        </div>
      </div>

      {/* --- ID="solution" --- */}
      <div id="solution" className="max-w-7xl mx-auto px-6 py-32 scroll-mt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Disconnect in Global Payments</h2>
          <p className="text-zinc-400">Legacy banking wasn't built for global freelancers, and it certainly wasn't built for AI.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-500/5 border border-red-500/10 rounded-3xl p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center">
                <X className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-red-100">The Legacy Problem</h3>
            </div>
            <ul className="space-y-6 text-zinc-400">
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold mt-0.5">01.</span>
                <p>Freelancers lose 5-7% of their income to cross-border wire fees and bad FX rates.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold mt-0.5">02.</span>
                <p>International SWIFT transfers take 3 to 5 business days to clear.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold mt-0.5">03.</span>
                <p>Autonomous AI models have no bank accounts and no native way to charge users for completed tasks.</p>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full"></div>
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
                <Check className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-100">The SubStream Solution</h3>
            </div>
            <ul className="space-y-6 text-zinc-300 relative z-10">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold mt-0.5">01.</span>
                <p>Clients pay with standard Fiat credit cards. You receive 100% of your earnings as USDC on Solana.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold mt-0.5">02.</span>
                <p>Settlement happens in less than 400 milliseconds, fully verified on-chain.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold mt-0.5">03.</span>
                <p><span className="text-white font-bold">x402 Protocol:</span> A dedicated machine-to-machine API allowing AI agents to generate instant payment gates for their outputs.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- ID="features" --- */}
      <div id="features" className="max-w-7xl mx-auto px-6 pb-32 scroll-mt-24">
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900 transition-colors">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20">
              <Globe className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Frictionless Fiat</h3>
            <p className="text-zinc-400 leading-relaxed">Clients pay with their standard credit cards in USD. They don't need to know what crypto or Solana is.</p>
          </div>

          <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl"></div>
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 relative z-10 border border-purple-500/20">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 relative z-10">Instant Settlement</h3>
            <p className="text-zinc-400 leading-relaxed relative z-10">Money arrives in your wallet as USDC the exact moment the client's credit card is successfully charged.</p>
          </div>

          <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900 transition-colors">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/20">
              <Bot className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">x402 AI Agents</h3>
            <p className="text-zinc-400 leading-relaxed">Give your AI agents a bank account. Our API allows machines to autonomously request and verify fiat payments from human users.</p>
          </div>
        </div>
      </div>

      {/* --- ID="faq" --- */}
      <div id="faq" className="border-t border-white/5 bg-zinc-950 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-6 py-32">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <HelpCircle className="w-8 h-8 text-zinc-500" />
            <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-2xl"></div>
              <h3 className="text-lg font-bold text-white mb-2 relative z-10">Crypto already exists. Why do I need SubStream?</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10">Because your clients don't want to learn how to use crypto. If you ask a traditional corporate client to "send USDC to my wallet," you introduce massive friction—they have to register on an exchange, pass KYC, wait for fiat clearing, and figure out gas fees. SubStream abstracts all of that away. Your client sees a standard Web2 checkout page and pays with a credit card. You receive USDC instantly. We handle the complex fiat-to-crypto bridging in the background so you never lose a deal.</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-2">Do my clients need to own crypto to pay my invoice?</h3>
              <p className="text-zinc-400 leading-relaxed">Absolutely not. SubStream uses Dodo Payments on the frontend. Your client sees a standard checkout page and pays with Apple Pay, Google Pay, or a standard credit card. We handle the conversion to USDC in the background.</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-2">How does the autonomous AI billing (x402) actually work?</h3>
              <p className="text-zinc-400 leading-relaxed">Let's say you build an AI that writes custom code. When the AI finishes the code, instead of giving it away for free, the AI hits the SubStream API. We return a payment link. The AI sends that link to the user. Once the user pays, our webhook triggers, and the AI releases the code. The funds settle directly to the developer.</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-2">Why build this on Solana?</h3>
              <p className="text-zinc-400 leading-relaxed">To replace the SWIFT banking system, we need a network capable of sub-second finality and near-zero transaction fees. Solana is the only blockchain capable of acting as a true, high-speed execution layer for global financial settlements.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
            <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
              <span className="font-bold text-black text-xs">S</span>
            </div>
            <span className="font-semibold text-sm tracking-wide">SubStream &copy; 2026</span>
          </div>
          <p className="text-sm text-zinc-500 font-medium">Fiat infrastructure by Dodo Payments</p>
        </div>
      </footer>

    </div>
  );
}