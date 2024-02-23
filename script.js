import { Connection, PublicKey } from '@solana/web3.js';

// Connect to the Solana devnet cluster
const connection = new Connection('https://api.devnet.solana.com');

// Pyth Network price account for SOL/USD on devnet
const pythPriceAccount = new PublicKey('H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG');

function fetchPrice() {
    connection.getAccountInfo(pythPriceAccount)
        .then(accountInfo => {
            if (accountInfo) {
                // Parse the price data from the accountInfo.data
                // The data format can be found in the Pyth documentation
                const priceData = parsePythPriceData(accountInfo.data);
                document.getElementById('price').innerText = `Price: $${priceData.price}`;
            } else {
                throw new Error('Failed to fetch Pyth price account data');
            }
        })
        .catch(error => {
            console.error('Error fetching price:', error);
            document.getElementById('price').innerText = 'Error fetching price';
        });
}

// Call the fetchPrice function when the page loads
window.onload = fetchPrice;

