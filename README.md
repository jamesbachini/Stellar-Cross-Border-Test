# Stellar Transaction Speed Test

This project contains two scripts, `send.js` and `receive.js`, designed to measure transaction speed on the Stellar network. These scripts simulate a real-world cross-border payment scenario by calculating the time it takes for a transaction to be sent and received between two users.

## Overview

1. **`receive.js`**:
   - Monitors a specific wallet account for incoming payments.
   - Records the timestamp when the payment is received.
   - Outputs the received timestamp to be shared with the sender.

2. **`send.js`**:
   - Initiates a Stellar payment to the recipient's account.
   - Records the timestamp when the transaction is sent.
   - Accepts the received timestamp as input from the user to calculate the transaction speed.

---

## Prerequisites

1. **Node.js**:
   Ensure you have Node.js installed on your system. You can download it [here](https://nodejs.org/).

2. **Stellar SDK**:
   The scripts use the `@stellar/stellar-sdk` for interacting with the Stellar network. Install it via npm:
   ```bash
   npm install @stellar/stellar-sdk
   ```

3. **Test Accounts**:
   Both users need Stellar testnet accounts funded using the [Stellar Friendbot](https://developers.stellar.org/docs/tutorials/create-account/#create-a-test-account).

---

## Usage

### Step 1: Run `receive.js`

The recipient runs `receive.js` to monitor their wallet account for incoming payments.

1. Open a terminal and navigate to the script directory.
2. Run the script:
   ```bash
   node receive.js
   ```
3. The script will display any incoming payment details, including the timestamp when the payment is received.

---

### Step 2: Run `send.js`

The sender runs `send.js` to initiate a Stellar payment.

1. Open a terminal and navigate to the script directory.
2. Run the script:
   ```bash
   node send.js
   ```
3. The script records the timestamp when the transaction is sent and asks for the received timestamp from `receive.js`. 
4. Enter the received timestamp when prompted.

---

### Example Output

**Sender (`send.js`)**:
```bash
Sending Timestamp: 1732266259909
Sending...
Received Timestamp: 1732266263449
Success! View the transaction at:
https://stellar.expert/explorer/testnet/tx/75f733e4721dbee6fa349148cc2762ddbeeaf1547de49d81f282af4a1e053475
Local Confirmation Time: 3540ms (3.54 seconds)
Enter the timestamp for the received transaction: 1732266266855
Transaction Time: 6946ms (6.946 seconds)
Distance between Cambridge and San Francisco: 5473 miles
Stellar Cross Border Payments Speed: 2,836,567 mph
That's 115 times faster than a SpaceX Starship!
```

**Recipient (`receive.js`)**:
```bash
Listening for incoming payments...
Payment Received:
  From: GDM2J2WNO6MZFTOFLQZA5EABW76HJXTOLS6ZA7FXKP754HSXKQLGZAIX
  To: GCG4VZZ6ZTYACRSTIHKXYEZENRAUFTKNGLE4XPQVCAZ7O5XM6W6PSVQI
  Amount: 1.0000000 XLM
  Explorer: https://stellar.expert/explorer/testnet/tx/75f733e4721dbee6fa349148cc2762ddbeeaf1547de49d81f282af4a1e053475
  Timestamp: 1732266266855
-----------------------------------
```

---

## Key Features

- **Real-Time Monitoring**: The recipient uses `receive.js` to listen for incoming payments in real-time.
- **Cross-User Testing**: The scripts are designed for two users to simulate a realistic payment scenario.
- **Transaction Speed Calculation**: Calculates the time taken for a payment to be sent and received on the Stellar network.

---

## Notes

- These scripts are configured to use the **Stellar Testnet**. For production use, modify the scripts to use the public network (`https://horizon.stellar.org`) and ensure proper account funding.
- Ensure both users share the correct public key for testing and that the recipient's account exists on the network.

---

Happy testing! 🚀