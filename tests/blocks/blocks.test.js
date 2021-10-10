const jestOpenAPI = require('jest');
const axios = require('axios');
const path = require('path');
const errors = require('../../consts/errors');

describe('Get latest block: No duplicate blocks', () => {
    it('Should return a different block', async () => {
        const response = await axios.get('http://node1.blackseachain.com:8080/api/node/blocks/');
        const newResponse = await axios.get('http://node1.blackseachain.com:8080/api/node/blocks/');
    
        expect(response).not.toEqual(newResponse);
    });
});

/*
// problem: hangs/infinite loop
describe('Get X blocks from N-th: Incorrect input', () => {
    it ('Should return status 500 and error message', async () => {
        const badCountArgument = "foo";
        const badBlockArgument = "bar";

        const res = await axios.get(`http://node1.blackseachain.com:8080/api/node/blocks/${badBlockArgument}/${badCountArgument}`);

        expect(res.status).toEqual(500);
        expect(res.data.message).toContain("error");
    });
});*/

// problem: returns: "0x0000000000000000000000000000000000000000000000000000000000000000" hash 
// number; should return status 500 and error message
// RPC-services.js: 32:
describe('Get block by number: Letter input', () => {
    it ('Should return status 500 and error message', async () => {
        const num = 'test';

        const res = await axios.get(`http://node1.blackseachain.com:8080/api/node/blocks/num/${num}`);

        expect(res.status).toEqual(500);
        expect(res.message).toContain("error");
    });
});

// Scenario: empty request body 
describe('Get block by hash: Invalid hash', () => {
    it ('Should return status 404 not found', async () => {
        try {
            const res = await axios.get('http://node1.blackseachain.com:8080/api/node/blocks/hash');
        } catch (e) {
            expect (e.message).toMatch(errors.AXIOS_NOT_FOUND_RESPONSE);
        }
    });
});