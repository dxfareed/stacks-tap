"use client";

import React, { useEffect, useState } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { userSession } from '../lib/stacks';

interface WalletConnectProps {
    onConnect: () => void;
    onDisconnect: () => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect, onDisconnect }) => {
    const [mounted, setMounted] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        setMounted(true);
        try {
            if (userSession.isUserSignedIn()) {
                setIsSignedIn(true);
                onConnect();
            } else if (userSession.isSignInPending()) {
                userSession.handlePendingSignIn().then(() => {
                    setIsSignedIn(true);
                    onConnect();
                });
            }
        } catch (e) {
            console.error("Session error, signing out:", e);
            userSession.signUserOut();
            setIsSignedIn(false);
        }
    }, [onConnect]);

    const authenticate = () => {
        showConnect({
            appDetails: {
                name: 'Stacks Faucet',
                icon: window.location.origin + '/favicon.ico',
            },
            redirectTo: '/',
            onFinish: () => {
                setIsSignedIn(true);
                onConnect();
            },
            userSession,
        });
    };

    const disconnect = () => {
        userSession.signUserOut("/");
        setIsSignedIn(false);
        onDisconnect();
    };

    if (!mounted) return null;

    return (
        <div className="flex items-center gap-4">
            {isSignedIn ? (
                <button
                    onClick={disconnect}
                    className="neo-button bg-red-400 text-black hover:bg-red-500"
                >
                    Disconnect
                </button>
            ) : (
                <button
                    onClick={authenticate}
                    className="neo-button bg-[#23a094] text-black hover:bg-[#1b7a71]"
                >
                    Connect Wallet
                </button>
            )}
        </div>
    );
};
