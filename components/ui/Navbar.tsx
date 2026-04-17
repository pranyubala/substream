"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)] group-hover:bg-blue-500 transition-colors">
            <span className="font-bold text-white text-lg">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">SubStream</span>
        </Link>

        {/* SCROLLING NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/#solution" 
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            The Solution
          </Link>
          <Link 
            href="/#features" 
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link 
            href="/#faq" 
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            FAQ
          </Link>
          <a 
            href="https://github.com/pranyubala/substream" 
            target="_blank" 
            rel="noreferrer"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Developers
          </a>
        </div>

        {/* Call to Action */}
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard" 
            className="bg-white text-black px-5 py-2 rounded-lg text-sm font-bold hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Launch App
          </Link>
        </div>

      </div>
    </nav>
  );
}