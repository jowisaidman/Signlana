import React from 'react'
import { StyledView, StyledText, StyledImage, StyledTouchableOpacity } from '../components/Styled'

import SOLIcon from "../assets/solana.png"
import ETHIcon from "../assets/ethereum.png"
import ArbitrumIcon from "../assets/arbitrum.png"
import USDCICon from "../assets/usdc-icon.png"

import CheckIcon from "../assets/checkmark-icon.png"

const CurrencyIcon = {
    "sol": SOLIcon,
    "eth": ETHIcon,
    "avax": ArbitrumIcon,
    "usdc": USDCICon,
}

export default function PaymentCompleted({ navigation, props }) {
    const { amount = 0.0001, currency = "sol", from = "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E" } = props || {}
    return (
        <StyledView className='bg-purple-350 w-full h-full flex justify-center items-center'>
            <StyledText className='text-5xl text-center text-purple-950 font-semibold mb-5'>
                Transaction Successful
            </StyledText>
            <StyledImage source={CheckIcon} className="w-36 h-36 mb-5" tintColor="#581c87" />
            <StyledView className='flex flex-row gap-2 items-center justify-center'>
                <StyledView className='bg-purple-200 border border-purple-900 rounded-full'>
                    <StyledImage className="w-10 h-10 m-2" source={CurrencyIcon[currency]}></StyledImage>

                </StyledView>
                <StyledText className='text-3xl font-semibold text-purple-950'>{amount.toFixed(5)}</StyledText>
            </StyledView>
            <StyledText className='text-md font-light mt-1'>From: {from}</StyledText>
            <StyledView className='absolute bottom-8 flex flex-row gap-2'>
                <StyledTouchableOpacity onPress={() => { navigation.replace("SelectService") }} className="bg-purple-200 border-2  border-purple-950 p-1 rounded-full">
                    <StyledText className='text-2xl font-semibold px-4 py-2 text-purple-950'>Back Home</StyledText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity onPress={() => { navigation.replace("SelectService") }} className=" bg-purple-900 border-2 border-purple-950 p-1 rounded-full">
                    <StyledText className='text-xl font-semibold px-4 py-3 text-purple-200'>View Transaction</StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </StyledView>
    )
}
