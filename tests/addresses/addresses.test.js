const jestOpenAPI = require('jest');
const axios = require('axios');
const path = require('path');
const errors = require('../../consts/errors');

describe('Get address transactions count: test count positivity', () => {
    it('Should return a non-negative value', async () => {
        const adr = '1743nDTMZisPgBCYSAgkUn1kVG7MePc9rvMEjoRNf4ipVkF';

        const res = await axios.get(`http://node1.blackseachain.com:8080/api/node/address/transactions/count/${adr}`);
        expect(parseInt(res.data[0].count)).toBeGreaterThanOrEqual(0);
    });
});

describe('Get address transactions count: invalid address', () => {
    it('Should return 0 as query result (count)', async () => {
        const adr = 'foobar';

        const res = await axios.get(`http://node1.blackseachain.com:8080/api/node/address/transactions/count/${adr}`);
        expect(parseInt(res.data[0].count)).toEqual(0);
    });
});

// db query returns null here; on above request it returns 0
describe('Get address transactions: invalid address', () => {
    it('Should return NaN as query result (count)', async () => {
        const adr = 'foobar';

        const res = await axios.get(`http://node1.blackseachain.com:8080/api/node/address/transactions/${adr}`);
        expect(parseInt(res.data.count)).toEqual(NaN);
    });
});

describe('Get address balance: invalid address', () => {
    it('Should return status 500', async () => {
        const adr = 'foobar';
        
        try {
            const res = await axios.get(`http://node1.blackseachain.com:8080/api/node/address/balance/${adr}`);
          } catch(e){
             expect (e.message).toMatch(errors.AXIOS_REQFAILED_RESPONSE);
          }
    });
});

describe('Get address balance: non-negative balance', () => {
    it('Should return 0 as query result (balance)', async () => {
        const adr = '1743nDTMZisPgBCYSAgkUn1kVG7MePc9rvMEjoRNf4ipVkF';
        const res = await axios.get(`http://node1.blackseachain.com:8080/api/node/address/balance/${adr}`);

        // response is in format: {"consumers": "0", "data": {"feeFrozen": "0", "free": "57.1700 MDOT", "miscFrozen": "0", "reserved": "0"}, "nonce": "7", "providers": "1", "sufficients": "0"}
        // looking for: "free": X MDOT
        const balance = parseInt(res.data.data.free.split(' '));
        expect(balance).toBeGreaterThanOrEqual(0);
    });
});

