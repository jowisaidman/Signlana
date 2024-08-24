import React from 'react'
import { StyledView, StyledImage, StyledText, StyledTouchableOpacity } from '../components/Styled'

import ShareIcon from "../assets/share-icon.png"
import CopyIcon from "../assets/copy-icon.png"

import QRCode from "react-native-qrcode-svg"


import * as Clipboard from 'expo-clipboard';
import {Share} from 'react-native'; // For sharing functionality
import { ToastAndroid } from 'react-native'; // For Android Toast messages

export default function YourWallet({ navigation }) {
    const wallet = "0x1D1479C185d32EB90533a08b36B3CFa5F84A0E6B";

    const copyToClipboard = async() => {
        await Clipboard.setStringAsync(wallet);
        ToastAndroid.show('Wallet address copied to clipboard!', ToastAndroid.SHORT);
    };

    const shareWallet = async () => {
        try {
            await Share.share({
                message: wallet,
            });
        } catch (error) {
            console.log('Error sharing wallet address:', error);
        }
    };

    return (
        <StyledView className='bg-purple-300 w-full h-full flex items-center justify-center'>
            <StyledText className="text-6xl text-purple-950 mb-4 font-semibold">
                Share
            </StyledText>

            <StyledView className="flex items-center justify-center ">
                <QRCode size={250} value={wallet} />
                <StyledText className="bg-purple-350 my-5 px-3 py-2 font-semibold rounded-full">
                    {wallet}
                </StyledText>
                <StyledView className="flex flex-row gap-3">
                    <StyledTouchableOpacity onPress={shareWallet} className="bg-purple-350 p-4 rounded-full">
                        <StyledImage source={ShareIcon} className="w-8 h-8" />
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity onPress={copyToClipboard} className="bg-purple-350 p-4 rounded-full">
                        <StyledImage source={CopyIcon} className="w-8 h-8" />
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledView>

            <StyledTouchableOpacity onPress={() => { navigation.goBack() }} className="absolute top-12 left-5">
                <StyledText className="text-lg bg-purple-200 font-semibold rounded-full px-4 py-2">
                    Go Back
                </StyledText>
            </StyledTouchableOpacity>
        </StyledView>
    );
}
