import { useWeb3Context } from '@/context/Web3Context';
import { AbiItem } from 'web3-utils';
import REther from '../../../rEther/build/contracts/REther.json';

const useREther = () => {
    const { web3 } = useWeb3Context();
    const eth = web3?.eth;

    if (eth) {
        const abi = REther.abi as AbiItem[];
        const address = REther.networks[5].address;
        return new eth.Contract(abi, address);
    }
};

export default useREther;
