
import React, {useEffect, useState} from 'react';
import {StyledView, StyledText, StyledTouchableOpacity} from "../components/Styled"
import { CameraView } from 'expo-camera'
import { styled } from 'nativewind/dist'
import { sendSolanaTransactionToBlockchain, sendEvmTransactionToBlockchain } from '../utils/WalletService';
import WalletPop from '../components/WalletPop';

const StyledCamera = styled(CameraView)

const ScanQRScreen = ({ navigation, route }) => {
    const [scannedData, setScannedData] = useState('')

    useEffect(() => {
        setTimeout(async () => {
            console.log("PARAAAMS: ", route.params)
            if (scannedData) {
                if (route.params.sendTransaction) {
                    if (route.params.chain === "solana")
                        await sendSolanaTransactionToBlockchain(scannedData);
                    else
                        await sendEvmTransactionToBlockchain(scannedData, route.params.chain);
                    navigation.navigate(route.params.nextScreenName)
                } else {
                    navigation.navigate(route.params.nextScreenName, {"data": scannedData})
                }
            }
        }, 250)
    }, [scannedData]); 

    const verifyWallet = (data) => {
        setScannedData(data)
        console.log("Data: ", data)
    }

    return (
        <StyledView className="flex-1 justify-center items-center bg-purple-300">
            {/*<StyledTouchableOpacity onPress={() => { navigation.goBack() }} className="absolute top-12 left-5">
                <StyledText className="text-lg bg-purple-200 font-semibold rounded-full px-4 py-2">
                    Go Back
                </StyledText>
            </StyledTouchableOpacity>*/}
            <WalletPop navigation={navigation} hideQr></WalletPop>
            <StyledText className="text-6xl text-purple-950 font-bold">{route.params.screenTitle}</StyledText>
            <StyledCamera onBarcodeScanned={({ data }) => { verifyWallet(data) }} barcodeScannerSettings={{ barcodeTypes: ["qr"] }} className='w-72 h-72' />
        </StyledView>
    );
};

export default ScanQRScreen;