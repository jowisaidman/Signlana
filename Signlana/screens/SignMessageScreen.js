import React from 'react';
import {StyledView, StyledText, StyledTouchableOpacity} from "../components/Styled"
import { getSolanaWallet, signSolanaTransaction } from '../utils/WalletService';
import bs58 from 'bs58';

const SignMessageScreen = ({ route, navigation }) => {

    async function signTransactionData (data) {
        const wallet = await getSolanaWallet(); // TODO: depend on current chain
        const secretKeyBase58 = bs58.encode(wallet.secretKey);
        const signedMessage = signSolanaTransaction(data, secretKeyBase58);
        navigation.navigate('ShowQR', { "message": signedMessage, screenTitle: "Solana Signed Tx", nextScreenName: "YourWallet", nextScreenParams: {}});
    }

    return (
        <StyledView className="flex-1 justify-center items-center bg-purple-300">
            <StyledTouchableOpacity onPress={() => { navigation.goBack() }} className="absolute top-12 left-5">
                <StyledText className="text-lg bg-purple-200 font-semibold rounded-full px-4 py-2">
                    Go Back
                </StyledText>
            </StyledTouchableOpacity>
            <StyledText className="text-black text font-ligth">Transaction information </StyledText>
            <StyledText className="text-black text font-ligth">{route.params.data}</StyledText>
            <StyledTouchableOpacity
                        className="bg-purple-350 p-3 rounded-full mt-4"
                        onPress={async () => await signTransactionData(route.params.data)}
                    >
                        <StyledText className="text-purple-950 text-2xl text-center font-semibold">Next</StyledText>
            </StyledTouchableOpacity>
        </StyledView>
    );
};

export default SignMessageScreen;