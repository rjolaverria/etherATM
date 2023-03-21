import { useContext, createContext, FC, ReactNode, useState } from 'react';
import Web3 from 'web3';
import Eth from 'web3-eth';
import { Bzz } from 'web3-bzz';
import { Shh } from 'web3-shh';
import { Utils } from 'web3-utils';
import { provider } from 'web3-core';

declare global {
    interface Window {
        ethereum?: provider & { request: (obj: {}) => string[] };
    }
}

export interface Web3Context {
    account?: string;
    connect?: () => void;
    bzz?: Bzz;
    eth?: Eth;
    shh?: Shh;
    utils?: Utils;
    web3?: Web3;
}

export const Web3Context = createContext<Web3Context>({});
export const useWeb3Context = () => useContext(Web3Context);

const Web3ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [web3, setWeb3] = useState<Web3>();
    const [account, setAccount] = useState<string>();

    const connect = async () => {
        if (window.ethereum) {
            const account: string[] = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            setWeb3(new Web3(window.ethereum));
            setAccount(account[0]);
        }
    };

    return (
        <Web3Context.Provider
            value={{
                account,
                bzz: web3?.bzz,
                connect,
                eth: web3?.eth,
                shh: web3?.shh,
                utils: web3?.utils,
                web3,
            }}
        >
            {children}
        </Web3Context.Provider>
    );
};

export default Web3ContextProvider;
