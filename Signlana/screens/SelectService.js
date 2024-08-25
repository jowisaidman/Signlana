import React, {useState, useEffect} from 'react'
import WalletIcon from "../assets/sign-icon.png"
import ImportWalletIcon from "../assets/pos-icon.png"
import { Camera } from 'expo-camera'

import {StyledView, StyledText, StyledTouchableOpacity, StyledImage} from "../components/Styled"
import WalletPop from "../components/WalletPop"
import { getValueFor } from '../utils/SecureStorage'

const SelectService = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
  
    useEffect(() => {
      (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
      })();
      }, []);

    if (hasPermission === null) {
        return (
            <StyledView className="flex-1 justify-center items-center bg-purple-300">
                <StyledText className="text-black text-xl font-semibold">Requesting for camera permission</StyledText>
            </StyledView>
        )
    }

    if (hasPermission === false) {
        <StyledView className="flex-1 justify-center items-center bg-purple-300">
            <StyledText className="text-black text-xl font-semibold">No access to camera, please give permissions in settings</StyledText>
        </StyledView>
    }


    return (
        <StyledView className="flex-1 justify-center items-center bg-purple-300">
            <StyledText className="text-4xl text-purple-950 font-bold mb-5">Select Service</StyledText>
            <StyledView className="flex flex-wrap flex-row justify-between gap-4">        
            <StyledTouchableOpacity
                    className="bg-[#c59eee] border-2 border-purple-950 flex items-center pt-3 gap-2 w-40 rounded-xl"
                    onPress={() => navigation.navigate('ScanQR', {screenTitle: "Scan tx to Sign", nextScreenName: "SignMessage"})}
                >
                    <StyledText className="text-black text-xl font-semibold">Signala Sign</StyledText>
                    <StyledImage source={WalletIcon} className='w-20 h-20'/>
                    <StyledText className="text-black text font-ligth">Sign contracts </StyledText>
                    <StyledText className="text-black text font-ligth italic font-semibold">Works offline </StyledText>

                </StyledTouchableOpacity>
                <StyledTouchableOpacity
                    className="bg-[#c59eee] border-2 border-purple-950 flex items-center py-3 gap-2 w-40 rounded-xl"
                    onPress={() => navigation.navigate('PaymentDetail')}
                >
                    <StyledText className="text-black text-xl font-semibold">Signala Pos</StyledText>
                    <StyledImage source={ImportWalletIcon} className='w-20 h-20'/>
                    <StyledText className="text-black text font-ligth">Perform transactions</StyledText>
                    <StyledText className="text-black text font-ligth  italic font-semibold">Works online</StyledText>
                </StyledTouchableOpacity>
            </StyledView>
            <WalletPop navigation={navigation} wallet={"0x1D1479C185d32EB90533a08b36B3CFa5F84A0E6B"}/>
        </StyledView>
    );
};

export default SelectService;