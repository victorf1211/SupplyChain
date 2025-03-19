const { expect } = require('chai');
const SHA256 = require("crypto-js/sha256");
const { SupplyChain, Block } = require('./supplyChain');

describe("Supply Chain Tracking System", function() {
    let supplyChain;

    // Run before each test
    beforeEach(() => {
        supplyChain = new SupplyChain();
    });

    it("should start with a Genesis Block", function() {
        expect(supplyChain.chain).to.be.an('array').with.lengthOf(1);
        expect(supplyChain.chain[0].productData.event).to.equal("Genesis Block");
    });

    it("should add new supply chain events", function() {
        const eventData = {
            event: "Manufactured",
            location: "Factory A",
            details: "Product manufactured and packaged."
        };
        supplyChain.addSupplyChainEvent(eventData);
        expect(supplyChain.chain).to.have.lengthOf(2);
        expect(supplyChain.getLatestBlock().productData.event).to.equal("Manufactured");
    });

    it("should validate the blockchain integrity", function() {
        supplyChain.addSupplyChainEvent({
            event: "Manufactured",
            location: "Factory A",
            details: "Product manufactured and packaged."
        });
        supplyChain.addSupplyChainEvent({
            event: "Shipped",
            location: "Factory A to Distributor",
            details: "Product shipped to distributor."
        });
        expect(supplyChain.isChainValid()).to.be.true;
    });

    it("should detect tampering with the blockchain", function() {
        supplyChain.addSupplyChainEvent({
            event: "Manufactured",
            location: "Factory A",
            details: "Product manufactured and packaged."
        });
        // Tamper with the chain: change data in the first block after Genesis
        supplyChain.chain[1].productData.event = "Tampered Event";
        expect(supplyChain.isChainValid()).to.be.false;
    });
});
