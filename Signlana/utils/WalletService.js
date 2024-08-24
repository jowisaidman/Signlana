import bs58 from 'bs58';
import CryptoJS from 'crypto-js';
import * as bip39 from 'bip39';
import { getRandomDataFromImage } from './ImageService';
import { Buffer } from 'buffer';
import { getValueFor } from './SecureStorage';
import * as ethers from 'ethers';
import {
    Connection,
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL,
    Keypair,
} from '@solana/web3.js'
import 'react-native-get-random-values';
  
  const BASE_URL_DEVNET = 'https://api.devnet.solana.com'; // TODO: bring from environment

global.Buffer = global.Buffer || Buffer;

function bytesToHex(bytes) {
    return Array.from(bytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function createNewSolSeedPhrase(randomData) {

    if (!randomData) {
        return false;
    }

    const wordArray = CryptoJS.enc.Base64.parse(randomData);
    const hash = CryptoJS.SHA256(wordArray);
    const entropy = hash.toString(CryptoJS.enc.Hex).slice(0, 32);
    const mnemonic = bip39.entropyToMnemonic(entropy);
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const seedBuffer = Buffer.from(seed).subarray(0, 32);
    const wallet = Keypair.fromSeed(seedBuffer);

    console.log('Public Key:', wallet.publicKey.toString());
    
    //const secretKeyBase58 = bs58.encode(wallet.secretKey);
    return mnemonic
}

export async function createNewEvmSeedPhrase(randomData) {

    if (!randomData) {
        return false;
    }

    // Tomar los primeros 10 caracteres de randomData
    const firstTenChars = randomData.slice(0, 16);

    // Convertir los primeros 10 caracteres a un Uint8Array
    function toUint8Array(str) {
        return new TextEncoder().encode(str);
    }

    const byteData = toUint8Array(firstTenChars);

    // Pasar la cadena hexadecimal a entropyToPhrase
    const mnemonic = ethers.Mnemonic.entropyToPhrase(byteData);

    console.log("EVM wallet: ", ethers.Wallet.fromPhrase(mnemonic));

    return mnemonic
}

export async function getSolanaWalletAddress() {
    const walletMnemonic = await getValueFor("seedPhraseSolana");
    const seed = bip39.mnemonicToSeedSync(walletMnemonic);
    const seedBuffer = Buffer.from(seed).subarray(0, 32);
    const wallet = Keypair.fromSeed(seedBuffer);

    return wallet.publicKey.toString();
}

export async function getSolanaWallet() {
    const walletMnemonic = await getValueFor("seedPhraseSolana");
    const seed = bip39.mnemonicToSeedSync(walletMnemonic);
    const seedBuffer = Buffer.from(seed).subarray(0, 32);
    return Keypair.fromSeed(seedBuffer);
}
  
export function getWalletAlias(address) {
    const firstPart = address.substring(0, 5);
    const lastPart = address.substring(address.length - 5);
    return `${firstPart}.....${lastPart}`;
}


export async function createUnsignedSolanaTransaction(senderPubkey, reiciverPubkey, amountToTransferInSol) {
    const connection = new Connection(BASE_URL_DEVNET, 'confirmed');

    const senderPublicKey = new PublicKey(senderPubkey);
    const recipientPublicKey = new PublicKey(reiciverPubkey);

    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

    const transaction = new Transaction();

    transaction.add(
        SystemProgram.transfer({
            fromPubkey: senderPublicKey,
            toPubkey: recipientPublicKey,
            lamports: amountToTransferInSol * LAMPORTS_PER_SOL,
        })
    );

    transaction.recentBlockhash = blockhash;
    transaction.lastValidBlockHeight = lastValidBlockHeight;
    transaction.feePayer = senderPublicKey;

    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
    });

    const base64Transaction = serializedTransaction.toString('base64');

    console.log('Base64 Unsigned Transaction:', base64Transaction);

    return base64Transaction;
}

export function signSolanaTransaction(base64Transaction, senderPrivateKey) {
    console.log("TX TO SIGN:", base64Transaction);
    const transactionBuffer = Buffer.from(base64Transaction, 'base64');
    const transaction = Transaction.from(transactionBuffer);

    const secretKeyUint8Array = bs58.decode(senderPrivateKey);
  
    const senderKeypair = Keypair.fromSecretKey(new Uint8Array(secretKeyUint8Array));
  
    transaction.sign(senderKeypair);
  
    const signedTransactionBase64 = transaction.serialize().toString('base64');
    console.log('Signed Transaction (Base64):', signedTransactionBase64);
  
    return signedTransactionBase64;
}

export async function sendSolanaTransactionToBlockchain(signedTransactionBase64) {
  const signedTransactionBuffer = Buffer.from(signedTransactionBase64, 'base64');

  const signedTransaction = Transaction.from(signedTransactionBuffer);

  const connection = new Connection(BASE_URL_DEVNET, 'confirmed');

  const signature = await connection.sendRawTransaction(signedTransaction.serialize());

  console.log('Transaction Signature:', signature);

  return signature;
}

/// EVM functions

export async function signMessage(message, mnemonic) {
    const formattedMessage = JSON.parse(message);
    console.log(formattedMessage)
  
    const gasLimitHex = '0x' + formattedMessage.gasLimit.toString(16);
    const transaction = {
      type: formattedMessage.type,
      chainId: formattedMessage.chainId,
      nonce: formattedMessage.nonce,
      maxPriorityFeePerGas: ethers.parseUnits(formattedMessage.maxPriorityFeePerGas, 'wei').toString(),
      maxFeePerGas: ethers.parseUnits(formattedMessage.maxFeePerGas, 'wei').toString(),
      gasLimit: gasLimitHex,
      to: formattedMessage.to,
      value: ethers.parseUnits(formattedMessage.value, 'ether').toString(), 
      data: formattedMessage.data,
      accessList: formattedMessage.accessList
    }
  
    console.log("Transaction: ", transaction);
  
    const wallet = new ethers.Wallet.fromPhrase(mnemonic);
  
    return await wallet.signTransaction(transaction);
  }