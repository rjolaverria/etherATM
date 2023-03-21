import Web3ContextProvider from '@/context/Web3Context';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Web3ContextProvider>
            <Component {...pageProps} />
        </Web3ContextProvider>
    );
}
