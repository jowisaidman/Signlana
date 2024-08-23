import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';


export function createNewSeedPhrase() {
    // TODO: bring this from a random source (ie audio or photo)
    const seed = Uint8Array.from([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
        17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32
      ]);
      
      // Generate a keypair from the seed
      const wallet = Keypair.fromSeed(seed);

    // Get the public key
    console.log('Public Key:', wallet.publicKey.toString());

    // Get the private key in bs58
    const secretKeyBase58 = bs58.encode(wallet.secretKey);
    console.log('Secret Key (Base58):', secretKeyBase58);
    return wallet
}

