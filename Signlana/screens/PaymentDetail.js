import React, { useState } from 'react'
import { StyledView, StyledInput, StyledText, StyledImage, StyledTouchableOpacity } from '../components/Styled'

import { SafeAreaView } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

import GoplusIcon from "../assets/goplus.png"



export default function PaymentDetail({ navigation }) {
    const [currency, setCurrency] = useState('usdc');
    const [amount, setAmount] = useState(0)
    const [chain, setChain] = useState('solana')

    return (
        <StyledView className="flex-1 justify-center items-center bg-purple-300">
                    <StyledText className="text-4xl font-semibold mb-4 text-center">Payment Details</StyledText>

            <SafeAreaView>
                {/* <StyledInput type="number" className="w-20 h-10 bg-white"></StyledInput> */}
                <StyledView className=" p-4 rounded-xl w-72 max-w-sm">
                <StyledView className="mb-4 flex-row">
                        <StyledText className="text-black text font-ligth mr-2">
                            Chain:
                        </StyledText>
                        <RNPickerSelect value="solana" onValueChange={(c) => setChain(c)} items={[
                            { label: 'SOLANA', value: 'solana' },
                            { label: 'ETHEREUM', value: 'ethereum' },
                            { label: 'ARBITRUM', value: 'arbitrum' },
                        ]} style={{backgroundColor: "red"}} />
                    </StyledView>
                <StyledView className="mb-4 flex-row">
                        <StyledText className="text-black text font-ligth mr-2">
                            Currency:
                        </StyledText>
                        <RNPickerSelect value="usdc" onValueChange={(c) => setCurrency(c)} items={[
                            { label: 'USDC', value: 'usdc' },
                            { label: 'SOL', value: 'sol' },
                            { label: 'ETH', value: 'eth' },
                        ]} style={{backgroundColor: "red"}} />
                    </StyledView>
                    <StyledView className="mb-4">
                        <StyledInput
                            type="number"
                            placeholder="0.00"
                            className="w-full text-center text-4xl bg-gray-100 rounded-md p-2"
                            onChange={(e) => setAmount(e.nativeEvent.text)}
                        />
                    </StyledView>

                    <StyledTouchableOpacity
                        className="border-2 bg-purple-950 border-purple-900 flex items-center gap-1 py-2 rounded-full mt-4"
                        onPress={() => navigation.navigate('VerifyWalletGoplus', {chain: chain, amount: amount, currency: currency})}
                    >
                        <StyledText className="text-purple-200 text-left text-md font-light">Verify wallet with</StyledText>
                        <StyledImage className="w-[70%] h-9 " tintColor='#e9d5ff' source={GoplusIcon}></StyledImage>
                    </StyledTouchableOpacity>
                </StyledView>
            </SafeAreaView>

            <StyledTouchableOpacity onPress={() => { navigation.goBack() }} className="absolute top-12 left-5">
                <StyledText className="text-lg bg-purple-200 font-semibold rounded-full px-4 py-2">
                    Go Back
                </StyledText>
            </StyledTouchableOpacity>
        </StyledView>
    )
}
