const jestOpenAPI = require('jest');
const axios = require('axios');
const path = require('path');
const errors = require('../../consts/errors');

describe('Get transaction by block number: Empty request body', () => {
    it ('Should return 404 not found', async () => {
        const x = 5;
        const n = 10;
        
        try {
          const res = await axios.get('http://node1.blackseachain.com:8080/api/node/address/transactions/block');
        } catch(e){
           expect (e.message).toMatch(errors.AXIOS_NOT_FOUND_RESPONSE);
        }
    });
});

describe('Get transaction by block hash: Empty request body', () => {
    it ('Should return 404 not found', async () => {
        const x = 5;
        const n = 10;
        
        try {
          const res = await axios.get('http://node1.blackseachain.com:8080/api/node/address/transactions/hash');
        } catch(e){
           expect (e.message).toMatch(errors.AXIOS_NOT_FOUND_RESPONSE);
        }
    });
});

describe('Get X transactions after Nth: Negative numbers', () => {
    it('Should return status 500 and error', async () => {
        const x = -5;
        const n = -20;
        
        try {
            const res = await axios.get(`http://node1.blackseachain.com:8080/api/node/transactions/${x}/${n}`);
        } catch (e){
            expect(e.message).toMatch(errors.AXIOS_REQFAILED_RESPONSE);
        }
    });
});

describe('Get X transactions after Nth: Bigger count than transaction count', () => {
    it('Should return status 500 and error', async () => {
        const x = -5;
        const n = await axios.get('http://node1.blackseachain.com:8080/api/node/transactions/count/');
        
        try {
            const res = await axios.get(`http://node1.blackseachain.com:8080/api/node/transactions/${x}/${n}`);
        } catch (e){
            expect(e.message).toMatch(errors.AXIOS_REQFAILED_RESPONSE);
        }
    });
});



describe('Get transactions count: test count positivity', () => {
    it('Should return a non-negative value', async () => {
        const res = await axios.get('http://node1.blackseachain.com:8080/api/node/transactions/count/');
        expect(parseInt(res.data[0].count)).toBeGreaterThanOrEqual(0);
    });
});