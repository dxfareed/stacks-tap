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
        <div className="neo-box p-8 rounded-none max-w-lg mx-auto mt-20 bg-white">
            <h2 className="text-4xl font-extrabold mb-6 text-black uppercase tracking-tight">
                Stacks Faucet
            </h2>
            <p className="text-lg text-black font-medium mb-8 border-b-2 border-dashed border-black pb-4">
                Claim <span className="p-1 bg-[#ffc900] border-2 border-black">0.01 STX</span> every 24 hours.
            </p>

            {txId && (
                <div className="mb-6 p-4 bg-[#ff90e8] border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="font-bold text-black uppercase">Transaction sent!</p>
                    <p className="text-xs mt-2 font-mono break-all bg-white border-2 border-black p-2">
                        {txId}
                    </p>
                </div>
            )}

            <button
                onClick={claimTokens}
                disabled={isClaiming}
                className={`neo-button w-full text-xl py-4 
          ${isClaiming ? 'opacity-50' : 'bg-[#ffc900] hover:bg-[#ffdb4d]'}
        `}
            >
                {isClaiming ? 'Claiming...' : 'GIMME STACKS'}
            </button>
        </div>
    );
};
