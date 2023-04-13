const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('My Counter', () => {


    let counter
    beforeEach(async () => {
        const Counter = await ethers.getContractFactory('Counter')
        counter = await Counter.deploy('My Contract', 1)
    })

    describe('Deployment', () => {
        it('sets the initial count', async () =>{
            expect(await counter.count()).equal(1)
        })

        it('sets the initial name', async () => {
            expect(await counter.name()).equal('My Contract')
        })
    })


    



})