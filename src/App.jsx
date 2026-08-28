import React from 'react';

export default function App() {
  return (
    <main className="min-h-screen w-full bg-black text-slate-100 flex flex-col justify-center items-start px-8 sm:px-16 md:px-28 lg:px-36 relative overflow-hidden select-none">
      
      {/* Centered Left-Aligned Hero Section */}
      <div className="max-w-3xl space-y-3 sm:space-y-4">
        
        {/* Element 1: Main Heading (Slightly left of center, warm & personal) */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-tight sm:leading-snug heading-glow animate-fade-in">
          Hello Meri Pyari Sister Ji{' '}
          <span className="inline-block text-rose-500 heart-glow transition-transform hover:scale-110">
            ❤️
          </span>
        </h1>

        {/* Element 2: Small Handwritten Warning Note */}
        <p className="font-handwritten text-lg sm:text-xl md:text-2xl text-slate-400 font-normal tracking-wide leading-relaxed animate-fade-in-delayed">
          Warning: Your bro has prepared something interesting for you{' '}
          <span className="inline-block">👀</span>
        </p>

      </div>

      {/* Element 3: Subtle DDO Company Signature Branding (Bottom-Right Corner) */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 animate-fade-in-brand">
        <span className="text-[11px] sm:text-xs font-mono font-medium tracking-widest text-slate-500 uppercase opacity-65 hover:opacity-100 transition-opacity">
          DDO Company
        </span>
      </div>

    </main>
  );
}
