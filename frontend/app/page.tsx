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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Stacks Faucet</h1>
          <WalletConnect onConnect={handleConnect} onDisconnect={handleDisconnect} />
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl px-4 py-10 flex flex-col items-center justify-center">
        {!userData ? (
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Welcome to the Stacks Faucet
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Connect your wallet to claim testnet STX tokens.
            </p>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <Faucet />
          </div>
        )}
      </main>

      <footer className="w-full bg-gray-50 border-t py-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Stacks Faucet. Built with Stacks.js and Next.js.
      </footer>
    </div>
  );
}
