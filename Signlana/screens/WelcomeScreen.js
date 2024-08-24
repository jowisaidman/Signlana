import React, { useEffect } from 'react';
import WalletIcon from "../assets/wallet-icon.png"
import ImportWalletIcon from "../assets/import-wallet-icon.png"

import {StyledView, StyledText, StyledTouchableOpacity, StyledImage} from "../components/Styled"
import { getValueFor } from '../utils/SecureStorage';
import { getSolanaWalletAddress } from '../utils/WalletService';

const WelcomeScreen = ({ navigation }) => {
    useEffect(() => {
        (async () => {
            let seedPhraseEth = await getValueFor("seedPhraseEthereum");
            let seedPhraseSolana = await getValueFor("seedPhraseSolana");
            if (seedPhraseEth && seedPhraseSolana) {
                console.log("Solana Wallet; ", await getSolanaWalletAddress())
                navigation.navigate("SelectService");
            }
        })()
    }, []); 
    
    return (
        <StyledView className="flex-1 justify-center items-center bg-purple-300">
            <StyledText className="text-6xl text-purple-950 font-bold">Welcome!</StyledText>
            <StyledText className="text-md text-purple-950 mb-6">Signala is a fast and secure cold-wallet like system!</StyledText>
            <StyledView className="flex flex-wrap flex-row justify-between gap-4">        
            <StyledTouchableOpacity
                    className="bg-[#c59eee] border-2 border-purple-950 flex items-center pt-3 gap-2 h-40 w-40 rounded-xl"
                    onPress={() => navigation.navigate('WalletSetup', { seedSource: 'create' })}
                >
                    <StyledText className="text-black text-xl font-semibold">Create Wallet</StyledText>
                    <StyledImage source={WalletIcon} className='w-20 h-20'/>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity
                    className="bg-[#c59eee] border-2 border-purple-950 flex items-center pt-3 gap-2 h-40 w-40 rounded-xl"
                    onPress={() => navigation.navigate('WalletSetup', { seedSource: 'import' })}
                >
                    <StyledText className="text-black text-xl font-semibold">Import Wallet</StyledText>
                    <StyledImage source={ImportWalletIcon} className='w-20 h-20'/>
                </StyledTouchableOpacity>
            </StyledView>

            <StyledText className="text-xl absolute bottom-3 text-purple-950 font-semibold underline">How it works? FAQ</StyledText>
        </StyledView>
    );
};

export default WelcomeScreen;