// Import the crypto-js library for SHA256 hashing
const SHA256 = require("crypto-js/sha256");

// Block class: represents an event in the supply chain
class Block {
    constructor(index, timestamp, productData, previousHash = '') {
        this.index = index; // Position in the chain
        this.timestamp = timestamp; // When the event occurred
        this.productData = productData; // Details of the supply chain event
        this.previousHash = previousHash; // Hash of the previous block
        this.nonce = 0; // Counter for the proof-of-work algorithm
        this.hash = this.calculateHash(); // Hash for the current block
    }

    // Calculate the hash using block properties
    calculateHash() {
        return SHA256(
            this.index +
            this.previousHash +
            this.timestamp +
            JSON.stringify(this.productData) +
            this.nonce
        ).toString();
    }

    // Mine the block: adjust the nonce until the hash meets the difficulty criteria
    mineBlock(difficulty) {
        const target = Array(difficulty + 1).join("0"); // e.g., difficulty 3 => "000"
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(`Block ${this.index} mined: ${this.hash}`);
    }
}

// SupplyChain class: manages the chain of supply chain events
class SupplyChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3; // Adjust the mining difficulty as needed
    }

    // Create the first block in the chain
    createGenesisBlock() {
        return new Block(0, new Date().toISOString(), {
            event: "Genesis Block",
            details: "Supply Chain Initiated"
        }, "0");
    }

    // Get the latest block in the chain
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Add a new supply chain event to the blockchain
    addSupplyChainEvent(productData) {
        const newIndex = this.chain.length;
        const newBlock = new Block(newIndex, new Date().toISOString(), productData, this.getLatestBlock().hash);
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    // Verify the integrity of the blockchain
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

// --- Testing the Supply Chain Tracking System ---

// Instantiate the supply chain blockchain
let supplyChain = new SupplyChain();

// Simulate adding supply chain events

// 1. Manufacturing stage
supplyChain.addSupplyChainEvent({
    event: "Manufactured",
    location: "Factory A",
    details: "Product manufactured and packaged."
});

// 2. Shipping stage
supplyChain.addSupplyChainEvent({
    event: "Shipped",
    location: "Factory A to Distributor",
    details: "Product shipped to distributor."
});

// 3. Receiving stage
supplyChain.addSupplyChainEvent({
    event: "Received",
    location: "Distributor Warehouse",
    details: "Product received and stored."
});

// 4. Delivery stage
supplyChain.addSupplyChainEvent({
    event: "Delivered",
    location: "Retailer",
    details: "Product delivered to retailer."
});

// Output the entire supply chain blockchain
console.log(JSON.stringify(supplyChain, null, 4));

module.exports = { SupplyChain, Block };
