import React, { useState } from 'react'
import { StyledView, StyledInput, StyledText, StyledImage, StyledTouchableOpacity } from '../components/Styled'

import { SafeAreaView } from 'react-native';

import GoplusIcon from "../assets/goplus.png"

import SelectDropdown from 'react-native-select-dropdown'

import Dropdown from 'react-native-input-select';

import SOLIcon from "../assets/solana.png"
import ETHIcon from "../assets/ethereum.png"
import ArbitrumIcon from "../assets/arbitrum.png"
import USDCIcon from "../assets/usdc-icon.png"
import PolygonIcon from "../assets/polygon.png"
import AvaxIcon from "../assets/avax-icon.png"

import SelectPlus from "../components/SelectPlus"

export default function PaymentDetail({ navigation }) {
    const [currency, setCurrency] = useState('eth');
    const [amount, setAmount] = useState(0.001)
    const [chain, setChain] = useState(11155111)

    console.log({ chain, amount, currency })
    return (
        <StyledView className="flex-1 justify-center items-center bg-purple-300">
            <StyledText className="text-4xl font-semibold mb-4 text-center">Payment Details</StyledText>
            <SafeAreaView>
                <StyledView className="p-4 rounded-xl w-72 max-w-sm">
                    <StyledView>
                        <StyledText className="text-purple-950 text-lg font-semibold mr-2 mb-1">
                            Chain
                        </StyledText>
                        <SelectPlus data={[
                            { label: 'SOLANA', value: 'solana', icon: SOLIcon },
                            { label: 'ETHEREUM', value: 'ethereum', icon: ETHIcon },
                            { label: 'ARBITRUM', value: 'arbitrum', icon: ArbitrumIcon },
                            { label: 'POLYGON', value: 'Polygon', icon: PolygonIcon },
                            { label: 'ETHEREUM SEPOLIA', value: 'EthereumSepolia', icon: ETHIcon },
                            { label: 'AVAX C-CHAIN', value: 'Avax C-Chain', icon: AvaxIcon },
                            { label: 'AVAX C-CHAIN TESTNET', value: 'Avalanche Fuji C-Chain', icon: AvaxIcon },
                        ]} setValue={setChain}></SelectPlus>
                    </StyledView>
                    <StyledView className="mb-4">
                        <StyledText className="text-purple-950 text-lg font-semibold mr-2 mb-1">
                            Currency
                        </StyledText>
                        <SelectPlus data={[
                            { label: 'SOL', value: 'solana', icon: SOLIcon },
                            { label: 'ETH', value: 'ethereum', icon: ETHIcon },
                            { label: 'USDC', value: 'usdc', icon: USDCIcon },
                            { label: 'AVAX', value: 'avax', icon: AvaxIcon},
                        ]} setValue={setCurrency}></SelectPlus>
                    </StyledView>
                    <StyledView className="mb-4">
                        <StyledInput
                            key="amount"
                            keyboardType="numeric"
                            placeholder="0.00"
                            value={amount}
                            className="w-full text-center text-4xl bg-gray-100 rounded-md p-2"
                            onChangeText={(text) => setAmount(text)}
                        />
                    </StyledView>
                    <StyledTouchableOpacity
                        className="border-2 bg-purple-950 border-purple-900 flex items-center gap-1 py-2 rounded-full mt-4"
                        onPress={() => navigation.navigate('VerifyWalletGoplus', { chain, amount, currency })}
                    >
                        <StyledText className="text-purple-200 text-left text-md font-light">Verify wallet with</StyledText>
                        <StyledImage className="w-[70%] h-9" tintColor='#e9d5ff' source={GoplusIcon} />
                    </StyledTouchableOpacity>
                </StyledView>
            </SafeAreaView>
            <StyledTouchableOpacity onPress={() => navigation.goBack()} className="absolute top-12 left-5">
                <StyledText className="text-lg bg-purple-200 font-semibold rounded-full px-4 py-2">
                    Go Back
                </StyledText>
            </StyledTouchableOpacity>
        </StyledView>
    );
}