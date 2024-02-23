import { Connection, PublicKey } from '@solana/web3.js';

// Connect to the Solana devnet cluster
const connection = new Connection('https://api.mainnet-beta.solana.com');

// Pyth Network price account for SOL/USD on devnet
const pythPriceAccount = new PublicKey('H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG');

// Define the function to parse the Pyth price data
function parsePythPriceData(data) {
    const dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
    
    // These offsets need to be adjusted based on the Pyth data structure
    const priceOffset = 0; // Placeholder: replace with the actual byte offset
    const exponentOffset = 4; // Placeholder: replace with the actual byte offset
    
    // Read the price and the exponent
    const rawPrice = dataView.getInt32(priceOffset, true); // Placeholder: data type and offset
    const exponent = dataView.getInt32(exponentOffset, true); // Placeholder: data type and offset

    // Calculate the actual price
    const price = rawPrice * Math.pow(10, exponent);

    // Return the price data
    return {
        price: price
    };
}

// Define the function to fetch and display the price
function fetchPrice() {
    connection.getAccountInfo(pythPriceAccount)
        .then(accountInfo => {
            if (accountInfo) {
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

