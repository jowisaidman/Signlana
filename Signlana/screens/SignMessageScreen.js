import React, { useState } from 'react';
import {StyledView, StyledText, StyledTouchableOpacity} from "../components/Styled"
import { getEVMWalletAddress, getSolanaWallet, signEvmTransaction, signSolanaTransaction } from '../utils/WalletService';
import bs58 from 'bs58';
import { useStore } from '@nanostores/react';
import { $currentWallet } from '../utils/CurrentWalletStore';
import Loading from '../components/Loader';

const SignMessageScreen = ({ route, navigation }) => {
    const { chain } = useStore($currentWallet);
    const [isLoading, setIsLoading] = useState(false);

    async function signTransactionData(data) {
        setIsLoading(true);
        console.log("PARAMS in signer: ", route);
        if (chain === 'solana') {
            const wallet = await getSolanaWallet();
            const secretKeyBase58 = bs58.encode(wallet.secretKey);
            const signedMessage = signSolanaTransaction(data, secretKeyBase58);
            setIsLoading(false);
            navigation.navigate('ShowQR', { "message": signedMessage, screenTitle: "Solana Signed Tx", nextScreenName: "SelectService", nextScreenParams: {}});
        } else {
            const wallet = await getEVMWalletAddress();
            console.log("Wallet in signer: ", wallet);
            console.log("Data in signer: ", data);
            const signedMessage = await signEvmTransaction(data, wallet.mnemonic.phrase)
            console.log("Signed message: ", signedMessage);
            setIsLoading(false);
            navigation.navigate('ShowQR', { "message": signedMessage, screenTitle: "EVM Signed Tx", nextScreenName: "SelectService", nextScreenParams: {}});
        }
    }

    if (isLoading) return <Loading text="Signing message"/>
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
                        <StyledText className="text-purple-950 text-2xl text-center font-semibold">Sign message</StyledText>
            </StyledTouchableOpacity>
        </StyledView>
    );
};

export default SignMessageScreen;