import React from 'react';
import { signTransaction, sendTransactionToBlockchain } from '../utils/WalletService';
import { StyledText, StyledTouchableOpacity } from './Styled'

const SignTransactionButton = ({base64Transaction, senderPrivateKey, navigation}) => {

    async function createTransaction (base64Transaction, senderPrivateKey) {
        try { 
            const signedTransaction = signTransaction(base64Transaction, senderPrivateKey);
            console.log("Signed transaction:", signedTransaction);
            // TODO: Navigate to QR screen
            
            // TODO: just for testing
            const signature = await sendTransactionToBlockchain(signedTransaction);
            console.log("Signature:", signature);
        } catch (error) {
            console.error('Error during transaction creation:', error);
        }
    }

    return (
        <StyledTouchableOpacity
            className="bg-purple-350 p-3 rounded-full mt-4"
            onPress={async () => {
                await createTransaction(base64Transaction, senderPrivateKey);
            }}
        >
            <StyledText className="text-purple-950 text-2xl text-center font-semibold">Sign transaction</StyledText>
        </StyledTouchableOpacity>
    );
};

export default SignTransactionButton;