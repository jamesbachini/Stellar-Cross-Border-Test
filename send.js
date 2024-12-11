const StellarSdk = require('stellar-sdk');

const init = async () => {
    const sourceSecretKey = 'SBSVNW4CEP4SGH6OJ5NE4EQW2AGTVP2BWMWQ76IE77KCIQXIWCG2T5KN';
    const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    const sourcePublicKey = sourceKeypair.publicKey();
    const receiverPublicKey = 'GCG4VZZ6ZTYACRSTIHKXYEZENRAUFTKNGLE4XPQVCAZ7O5XM6W6PSVQI';
    const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
    const networkPassphrase = StellarSdk.Networks.TESTNET;
    const account = await server.loadAccount(sourcePublicKey);
    const fee = await server.fetchBaseFee();
    const sentTimestamp = Date.now();
    console.log(`Sending Timestamp: ${sentTimestamp}`);
    const transaction = new StellarSdk.TransactionBuilder(account, {
        fee,
        networkPassphrase
    })
    .addOperation(StellarSdk.Operation.payment({
        destination: receiverPublicKey,
        asset: StellarSdk.Asset.native(),
        amount: '1',
    }))
    .setTimeout(30)
    .build();
    console.log('Sending...')
    transaction.sign(sourceKeypair);
    try {
        const transactionResult = await server.submitTransaction(transaction);
        const receivedTimestamp = Date.now();
        console.log(`Received Timestamp: ${receivedTimestamp}`);
        console.log('Success! View the transaction at: ');
        console.log(`https://stellar.expert/explorer/testnet/tx/${transactionResult._links.transaction.href.split('/').at(-1)}`);
        const localTimeTaken = receivedTimestamp - sentTimestamp;
        console.log(`Local Confirmation Time: ${localTimeTaken}ms (${(localTimeTaken / 1000)} seconds)`);
        process.stdout.write('Enter the timestamp for the received transaction: ');
        process.stdin.once('data', (data) => {
            const externalTimestamp = data.toString().trim();
            process.stdin.end();
            const timeTaken = externalTimestamp - sentTimestamp;
            console.log(`Transaction Time: ${timeTaken}ms (${(timeTaken / 1000)} seconds)`);
            const distanceMiles = 4870;
            console.log(`Distance between Cambridge and Portland: ${distanceMiles} miles`);
            const timeHours = timeTaken / (1000 * 60 * 60);
            const speedMph = distanceMiles / timeHours;
            console.log(`Stellar Cross Border Payments Speed: ${Math.trunc(speedMph).toLocaleString()} mph`);
            const comparedToStarship = speedMph / 24600;
            console.log(`That's ${Math.trunc(comparedToStarship).toLocaleString()} times faster than a SpaceX Starship!`);
        });

    } catch (e) {
        console.log('An error has occurred:');
        console.log(e.response.data);
        if (e.response?.data?.extras?.result_codes) {
            console.log('Result Codes:', e.response.data.extras.result_codes);
        }
    }
};

console.log(`
┏┓   ┓┓      ┏┓       ┓  ┏┳┓    
┗┓╋┏┓┃┃┏┓┏┓  ┗┓┏┓┏┓┏┓┏┫   ┃ ┏┓┏╋
┗┛┗┗ ┗┗┗┻┛   ┗┛┣┛┗ ┗ ┗┻   ┻ ┗ ┛┗
               ┛                
`);

init();
