const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ether = tokens

describe('realestate', () => {
    let realestate, escrow
    let deployer, seller
    let nftID = 1
    let purchasePrice = ether(100)
    let escrowAmount = ether(20)

    beforeEach(async() => {
        //Set up accounts
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        seller = deployer
        buyer = accounts[1]
        inspector = accounts[2]
        lender = accounts[3]


        //Load contracts
        const RealEstate = await ethers.getContractFactory('RealEstate')
        const Escrow = await ethers.getContractFactory('Escrow')
        //Deploy contracts
        realestate = await RealEstate.deploy()
        escrow = await Escrow.deploy(
            realestate.address,
            nftID,
            purchasePrice,
            escrowAmount,
            seller.address,
            buyer.address,
            inspector.address,
            lender.address

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
        let balance, transaction
        it('executes a successul transaction', async () => {

            //Expects seller to be NFT owner before the sale
            expect(await realestate.ownerOf(nftID)).to.equal(seller.address)

            //Buyer deposits earnest
            transaction = await escrow.connect(buyer).depositEarnest({ value: ether(20) })

            //check escrow balance
            balance = await escrow.getBalance()
            console.log('escrow balance', ethers.utils.formatEther(balance))

            //finalize sale
            transaction = await escrow.connect(buyer).finaliseSale()
            await transaction.wait()
            console.log("Buyer finalises sale")

            //Expects buyer to be NFT owner after the sale
            expect(await realestate.ownerOf(nftID)).to.equal(buyer.address)
        })
    })
})

