//mocha is the testing framework
//chai is the assertion library

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Counter', () => {

    let counter;

    beforeEach(async () => {
        const Counter = await ethers.getContractFactory('Counter')
        counter = await Counter.deploy('My Counter', 1)
    })

    describe('Deployment', () => {

    it('sets the initial count', async () => {
        expect(await counter.count()).to.equal(1)
    })

    it('sets the initial name', async () => {
        expect(await counter.name()).to.equal('My Counter')
    })


})

describe('Counting', () => {
    let transaction
    it('reads from the count public variable', async ()=>{
        expect(await counter.count()).equal(1)
    })

       it('reads from the getCount()', async ()=>{
        expect(await counter.count()).equal(1)
    })

    it('increments the count', async () => {
        transaction = await counter.increment()
        await transaction.wait()
    
        expect(await counter.count()).to.equal(2)

        transaction = await counter.increment()
        await transaction.wait()
    
        expect(await counter.count()).to.equal(3)
    })


    it('decrements the count', async () => {
        transaction = await counter.decrement()
        await transaction.wait()
    
        expect(await counter.count()).to.equal(0)

   
    })

        it('reads from the count public variable', async ()=>{
        expect(await counter.name()).equal('My Counter')
    })

       it('reads from the getName()', async ()=>{
        expect(await counter.getName()).equal('My Counter')
    })

            it('updates the name', async ()=>{
                transaction = await counter.setName('New Name')
                await transaction.wait()
        expect(await counter.name()).to.equal('New Name')
    })

    
    })


})

