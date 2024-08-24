import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SeedPhraseMenu from '../components/SeedPhrase/SeedPhraseMenu';
import Loading from '../components/Loader';
import { createNewEvmSeedPhrase, createNewSolSeedPhrase } from '../utils/WalletService';
import basicStyles from '../utils/BasicStyles';
import ContinueSetupWalletButton from '../components/ContinueSetupWalletButton';
import {StyledText, StyledView} from '../components/Styled';

import { getRandomDataFromImage } from '../utils/ImageService';




const WalletSetupScreen = ({ route, navigation }) => {
    const [wallet, setWallet] = useState({
        sol: null,
        eth: null
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(async () => {
            if (route.params.seedSource === 'create') {
                const randomData = await getRandomDataFromImage();
                let [evmWalletDetails, solWalletDetails] = await Promise.all([createNewEvmSeedPhrase(randomData), createNewSolSeedPhrase(randomData)]);
                console.log({ evmWalletDetails, solWalletDetails })
                solWalletDetails = solWalletDetails.split(" ");
                evmWalletDetails = evmWalletDetails.split(" ");
                setWallet({
                    evm: evmWalletDetails,
                    sol: solWalletDetails
                })
            }
            setIsLoading(false);
        }, 250)
    }, []);

    if (isLoading) {
        return <Loading text="Creating seed phrase" />
    } else {
        return (
            <StyledView className="w-full h-full bg-purple-350 flex items-center justify-center">
                <StyledText className="text-4xl text-center font-semibold text-purple-950">Wallet Setup</StyledText>
                <StyledText className="text-xl mb-3 text-center italic font-light text-purple-950">
                    {route.params.seedSource === 'import'
                        ? "Insert each word in the corresponding placeholder"
                        : "This is your secret phrase, write it down in a secure place!"}
                </StyledText>
                <SeedPhraseMenu wallet={wallet} />
                <ContinueSetupWalletButton wallet={wallet} navigation={navigation}/>
            </StyledView>
        );
    }
}


export default WalletSetupScreen;