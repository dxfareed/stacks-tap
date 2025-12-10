"use client";

import React, { useState, useEffect } from "react";
import { WalletConnect } from "../components/WalletConnect";
import { Faucet } from "../components/Faucet";
import { userSession, getUserData } from "../lib/stacks";

export default function Home() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    try {
      if (userSession.isUserSignedIn()) {
        setUserData(userSession.loadUserData());
      }
    } catch (e) {
      console.error("Session error in page:", e);
      // userSession.signUserOut() is handled in WalletConnect or effectively happens here by not setting data
      setUserData(null);
    }
  }, []);

  const handleConnect = () => {
    setUserData(userSession.loadUserData());
  };

  const handleDisconnect = () => {
    setUserData(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]">
      <header className="w-full bg-white border-b-4 border-black sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Logo Container */}
            <div className="w-12 h-12 bg-[#ff90e8] border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-black">
              Stacks Tap
            </h1>
          </div>
          <WalletConnect onConnect={handleConnect} onDisconnect={handleDisconnect} />
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl px-4 py-20 flex flex-col items-center">
        {!userData ? (
          <div className="text-center neo-box p-12 max-w-2xl bg-[#a3ffae]">
            <h2 className="text-5xl font-black text-black mb-6 uppercase leading-none">
              Get Your <br /> Tokens Here
            </h2>
            <p className="text-xl text-black font-bold mb-8">
              Connect your wallet to start claiming. No strings attached (mostly).
            </p>
            <div className="inline-block p-2 bg-white border-2 border-black -rotate-2">
              <span className="text-sm font-mono">100% Organic STX</span>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <Faucet />
          </div>
        )}
      </main>

      <footer className="w-full bg-black text-white py-8 text-center font-bold uppercase tracking-widest text-xs border-t-4 border-black">
        &copy; {new Date().getFullYear()} Stacks Tap by dxfareed. Build Bold.
      </footer>
    </div>
  );
}
