# Supply Chain Tracking System

This project demonstrates a blockchain-based supply chain tracking system implemented in JavaScript. Each stage of the supply chain (from manufacturing to delivery) is recorded on an immutable blockchain, ensuring transparency and reducing fraud.

## Prerequisites

- [Node.js]
- npm

## Installation

### Clone the Repository
Clone this repository to your local machine:

```bash
git clone https://github.com/victorf1211/supply-chain-tracker.git
cd supply-chain-tracker
```

### Install Dependencies
Install the required npm packages:

```bash
npm install
```

## Running the Application
The main file (`supplyChain.js`) simulates a supply chain by adding events and displaying the blockchain.

### Run the Application

```bash
node supplyChain.js
```

## Running the Tests
This project uses Mocha and Chai for unit testing.

### Install Test Dependencies
If you haven't installed them yet, run:

```bash
npm install mocha chai --save-dev
```

### Configure the Test Script
Ensure your `package.json` includes the following test script:

```json
"scripts": {
  "test": "mocha"
}
```

### Run the Tests
Execute the tests by running:

```bash
npm test
```

# Install testing libraries
npm install mocha chai --save-dev

# Run the tests
npm test
