import Head from 'next/head';
import { useWeb3Context } from '@/context/Web3Context';
import useREther from '@/contracts/useREther';
import { useEffect, useState } from 'react';

export default function Home() {
    const [balance, setBalance] = useState<string>();
    const { account, connect, utils } = useWeb3Context();
    const contract = useREther();

    useEffect(() => {
        const fetchBalance = async () => {
            if (account) {
                const value = await contract?.methods.balanceOf(account).call();
                setBalance(utils.fromWei(value, 'ether'));
            }
        };

        fetchBalance();
    }, [account, contract, utils]);

    return (
        <>
            <Head>
                <title>rEther</title>
                <meta name='description' content='rEther ATM' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>
                <h1>Account: {account || 'Not connected'}</h1>
                <h3>{!!balance && `Balance: ${balance}`}</h3>
                <button onClick={connect}>Connect wallet</button>
            </main>
        </>
    );
}
