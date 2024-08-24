import React, {useState} from 'react'
import {StyledView, StyledText, StyledImage, StyledTouchableOpacity} from "./Styled"

import QRCode from "../assets/qr-code.png"
import { getValueFor } from '../utils/SecureStorage'

import * as SecureStore from 'expo-secure-store';



export default function WalletPop({wallet, navigation}) {
    //Selection is open
    const [select, setSelect] = useState(false)

    const solanaWallet = getValueFor("")

    return <StyledView className='absolute top-12 flex flex-row items-center gap-2'>
        <StyledTouchableOpacity onPress={() => {
            SecureStore.deleteItemAsync("seedPhrase").then(() => {
                navigation.navigate("Welcome")
            })
            }} className='h-11 w-11 items-center p-4 justify-center rounded-full bg-purple-200'>
            <StyledImage source={QRCode} className='w-7 h-7'/>
        </StyledTouchableOpacity>
        <StyledView className=" flex flex-row rounded-full  py-2 px-2 bg-purple-200">
            <StyledView className='h-7 w-7 rounded-full bg-white'>
            </StyledView>
            <StyledText className='text-lg px-1 text-purple-950 font-semibold'>
                {wallet.slice(0, 17)}...
            </StyledText>
        </StyledView>
        <StyledTouchableOpacity onPress={() => {navigation.navigate("YourWallet")}} className='h-11 w-11 items-center p-4 justify-center rounded-full bg-purple-200'>
            <StyledImage source={QRCode} className='w-7 h-7'/>
        </StyledTouchableOpacity>
    </StyledView>
  
}
