import React from 'react';
import { createUnsignedSolanaTransaction } from '../utils/WalletService';
import { StyledText, StyledTouchableOpacity } from './Styled'

const CreateUnsignedTransactionButton = ({senderPubkey, receiverPubkey, navigation}) => {

    function createTransaction (senderPubkey, receiverPubkey) {
        const message = createUnsignedSolanaTransaction(senderPubkey, receiverPubkey);
        console.log("Messageto sign:", message);
        // TODO: Navigate to QR screen
    }

    return (
        <StyledTouchableOpacity
            className="bg-purple-350 p-3 rounded-full mt-4"
            onPress={() => createTransaction(senderPubkey, receiverPubkey)}
        >
            <StyledText className="text-purple-950 text-2xl text-center font-semibold">Create message</StyledText>
        </StyledTouchableOpacity>
    );
};

export default CreateUnsignedTransactionButton;