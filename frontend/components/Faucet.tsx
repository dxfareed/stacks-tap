"use client";

import React, { useState } from 'react';
import { openContractCall } from '@stacks/connect';
import { STACKS_MOCKNET } from '@stacks/network';
import { userSession } from '../lib/stacks';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '../lib/constants';

export const Faucet: React.FC = () => {
    const [txId, setTxId] = useState<string>('');
    const [isClaiming, setIsClaiming] = useState(false);

    const claimTokens = async () => {
        setIsClaiming(true);
        const network = STACKS_MOCKNET;

        const options = {
            contractAddress: CONTRACT_ADDRESS,
            contractName: CONTRACT_NAME,
            functionName: 'claim',
            functionArgs: [],
            network,
            appDetails: {
                name: 'Stacks Faucet',
                icon: window.location.origin + '/favicon.ico',
            },
            onFinish: (data: any) => {
                setTxId(data.txId);
                setIsClaiming(false);
            },
            onCancel: () => {
                setIsClaiming(false);
            },
        };

        try {
            await openContractCall(options);
        } catch (e) {
            console.error(e);
            setIsClaiming(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Stacks Faucet</h2>
            <p className="text-gray-600 mb-6">
                Claim 0.01 STX every 24 hours. (Testnet/Devnet)
            </p>

            {txId && (
                <div className="mb-4 p-4 bg-green-50 text-green-700 rounded break-all">
                    <p className="font-semibold">Transaction sent!</p>
                    <p className="text-sm mt-1">{txId}</p>
                </div>
            )}

            <button
                onClick={claimTokens}
                disabled={isClaiming}
                className={`w-full py-3 px-4 rounded font-bold text-white transition-colors ${isClaiming
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
            >
                {isClaiming ? 'Claiming...' : 'Claim 0.01 STX'}
            </button>
        </div>
    );
};
