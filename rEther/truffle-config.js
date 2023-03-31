const fs = require('fs');
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
    networks: {
        loc_development_development: {
            network_id: '*',
            port: 8545,
            host: '127.0.0.1',
        },
        goerli: {
            provider: () =>
                new HDWalletProvider({
                    mnemonic: {
                        phrase: fs.readFileSync('.mnemonic').toString().trim(),
                    },
                    providerOrUrl:
                        'https://goerli.infura.io/v3/' +
                        fs.readFileSync('.infura').toString().trim(),
                }),
            network_id: '5',
        },
    },
    mocha: {},
    compilers: {
        solc: {
            version: '0.8.18',
        },
    },
    plugins: ['truffle-plugin-verify'],
    api_keys: {
        etherscan: fs.readFileSync('.etherscan').toString().trim(),
    },
};
