import React, { useState } from 'react'
import { StyledView, StyledInput, StyledText, StyledImage, StyledTouchableOpacity } from '../components/Styled'

import { SafeAreaView } from 'react-native';

import GoplusIcon from "../assets/goplus.png"


import Dropdown from 'react-native-input-select';

export default function PaymentDetail({ navigation }) {
    const [currency, setCurrency] = useState('eth');
    const [amount, setAmount] = useState(0.001)
    const [chain, setChain] = useState(11155111)

    return (
        <StyledView className="flex-1 justify-center items-center bg-purple-300">
            <StyledText className="text-4xl font-semibold mb-4 text-center">Payment Details</StyledText>

            <SafeAreaView>
                {/* <StyledInput type="number" className="w-20 h-10 bg-white"></StyledInput> */}
                <StyledView className=" p-4 rounded-xl w-72 max-w-sm">
                    <StyledView>
                        <StyledText className="text-purple-950 text-lg font-semibold text font-ligth mr-2 mb-1">
                            Chain
                        </StyledText>
                        <Dropdown value='solana' onValueChange={(c) => setChain(c)} options={[
                            { label: 'SOLANA', value: 'solana' },
                            { label: 'ETHEREUM', value: 'Ethereum' },
                            { label: 'ARBITRUM', value: 'Arbitrum' },
                            { label: 'POLYGON', value: 'Polygon' },
                            { label: 'ETHEREUM SEPOLIA', value: 11155111 },
                            { label: 'AVAX C-CHAIN', value: 'Avax C-Chain' },
                            { label: 'AVAX C-CHAIN TESTNET', value: 'Avalanche Fuji C-Chain' },
                        ]} />
                    </StyledView>
                    <StyledView className="mb-4">
                    <StyledText className="text-purple-950 text-lg font-semibold text font-ligth mr-2 mb-1">
                            Currency
                        </StyledText>
                        <Dropdown value='usdc' onValueChange={(c) => setCurrency(c)} options={[
                            { label: 'USDC', value: 'usdc' },
                            { label: 'SOL', value: 'sol' },
                            { label: 'ETH', value: 'eth' },
                            { label: 'AVAX', value: 'avax' },
                        ]} />
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
                        onPress={() => navigation.navigate('VerifyWalletGoplus', { chain: chain, amount: amount, currency: currency })}
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
