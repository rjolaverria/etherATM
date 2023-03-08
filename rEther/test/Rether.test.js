const REther = artifacts.require('REther');
const BN = web3.utils.BN;

const base = new BN('10').pow(new BN('18'));

contract('REther', (accounts) => {
    it('Has correct name and symbol', async () => {
        const rEther = await REther.deployed();
        const name = await rEther.name();
        const symbol = await rEther.symbol();

        assert.equal(name, 'rEther');
        assert.equal(symbol, 'RETH');
    });

    it('Set message sender with admin and minter role', async () => {
        const rEther = await REther.deployed();
        const adminRole = await rEther.DEFAULT_ADMIN_ROLE();
        const minterRole = await rEther.MINTER_ROLE();

        const hasAdminRole = await rEther.hasRole(adminRole, accounts[0]);
        const hasMinterRole = await rEther.hasRole(minterRole, accounts[0]);
        assert(hasAdminRole);
        assert(hasMinterRole);
    });

    it('Preminted 1 million tokens', async () => {
        const rEther = await REther.deployed();

        const actual = await rEther.totalSupply().then((bn) => bn.div(base));
        const expected = new BN('1000000');
        assert.equal(actual.toString(), expected.toString());
    });

    it('Can transfer tokens successfully', async () => {
        const rEther = await REther.deployed();
        const totalSupply = await rEther.totalSupply();

        const to = accounts[1];
        const amount = new BN('10').mul(base);
        await rEther.transfer(to, amount);

        const account1bal = await rEther.balanceOf(accounts[0]);
        const account2bal = await rEther.balanceOf(to);

        assert.equal(
            account1bal.toString(),
            totalSupply.sub(amount).toString()
        );
        assert.equal(account2bal.toString(), amount.toString());
    });
});
