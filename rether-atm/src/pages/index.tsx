import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google';
import { useWeb3Context } from '@/context/Web3Context';

export default function Home() {
    const { account, connect } = useWeb3Context();

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
                <h1>{account || 'Not connected'}</h1>
                <button onClick={connect}>Connect wallet</button>
            </main>
        </>
    );
}
