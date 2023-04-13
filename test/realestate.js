const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('realestate', () => {
    let realestate, escrow
    let deployer, seller
    let nftID = 1

    beforeEach(async() => {
        //Set up accounts
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        seller = deployer
        buyer = accounts[1]


        //Load contracts
        const RealEstate = await ethers.getContractFactory('RealEstate')
        const Escrow = await ethers.getContractFactory('Escrow')
        //Deploy contracts
        realestate = await RealEstate.deploy()
        escrow = await Escrow.deploy(
            realestate.address,
            nftID,
            seller.address,
            buyer.address
        )

        //Seller Approves NFT
        transaction = await realestate.connect(seller).approve(escrow.address, nftID)
        await transaction.wait()
    })

    describe('Deployment', async () => {
        it('sends an nft to the seller /  deployer', async () => {
            expect(await realestate.ownerOf(nftID)).to.equal(seller.address)
        })
    })

    describe('Selling real estate', async () => {
        it('executes a successul transaction', async () => {
            expect(await realestate.ownerOf(nftID)).to.equal(seller.address)

            //finalize sale
            transaction = await escrow.connect(buyer).finaliseSale()
            await transaction.wait()
            console.log("Buyer finalises sale")

            expect(await realestate.ownerOf(nftID)).to.equal(buyer.address)
        })
    })
})

