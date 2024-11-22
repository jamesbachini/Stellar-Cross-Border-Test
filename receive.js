const StellarSdk = require('stellar-sdk');

const receiverPubKey = 'GCG4VZZ6ZTYACRSTIHKXYEZENRAUFTKNGLE4XPQVCAZ7O5XM6W6PSVQI';
const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

const handlePayment = (payment) => {
    const receivedTimestamp = Date.now();
    console.log(`Payment Received:`);
    console.log(`  From: ${payment.from}`);
    console.log(`  To: ${payment.to}`);
    console.log(`  Amount: ${payment.amount} ${payment.asset_type === 'native' ? 'XLM' : payment.asset_code}`);
    console.log(`  Explorer: https://stellar.expert/explorer/testnet/tx/${payment.transaction_hash}`);
    console.log(`  Timestamp: ${receivedTimestamp}`);
    console.log('-----------------------------------');
};

console.log(`
┏┓   ┓┓      ┏┓       ┓  ┏┳┓    
┗┓╋┏┓┃┃┏┓┏┓  ┗┓┏┓┏┓┏┓┏┫   ┃ ┏┓┏╋
┗┛┗┗ ┗┗┗┻┛   ┗┛┣┛┗ ┗ ┗┻   ┻ ┗ ┛┗
               ┛                
`);

const es = server.payments()
    .forAccount(receiverPubKey)
    .cursor('now')
    .stream({
        onmessage: handlePayment,
        onerror: (error) => {
            console.error('Error in payment stream:', error);
        }
    });

console.log(`Listening for incoming payments...`);
