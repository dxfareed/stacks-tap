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
        if (userSession.isUserSignedIn()) {
            setIsSignedIn(true);
            onConnect();
        } else if (userSession.isSignInPending()) {
            userSession.handlePendingSignIn().then(() => {
                setIsSignedIn(true);
                onConnect();
            });
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
                    className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded hover:bg-red-50"
                >
                    Disconnect
                </button>
            ) : (
                <button
                    onClick={authenticate}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700"
                >
                    Connect Wallet
                </button>
            )}
        </div>
    );
};
