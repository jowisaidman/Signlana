import React, { useEffect, useState } from 'react'
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
    const [currency, setCurrency] = useState("");
    const [amount, setAmount] = useState(0)
    const [chain, setChain] = useState("")

    const allCurrencies = [
        { label: 'SOL', value: 'solana', icon: SOLIcon },
        { label: 'ETH', value: 'ethereum', icon: ETHIcon },
        { label: 'USDC', value: 'usdc', icon: USDCIcon },
        { label: 'AVAX', value: 'avax', icon: AvaxIcon},
    ]

    const [currencies, setCurrencies] = useState(allCurrencies)

    useEffect(() => {
        setCurrency("")
        if(chain == "solana"){
            setCurrencies([{ label: 'SOL', value: 'solana', icon: SOLIcon }])
        }else{
            setCurrencies(allCurrencies)
        }
    }, [chain])

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
                            { label: 'ETHEREUM', value: 1, icon: ETHIcon },
                            { label: 'ARBITRUM', value: 42161, icon: ArbitrumIcon },
                            { label: 'POLYGON', value: 137, icon: PolygonIcon },
                            { label: 'ETHEREUM SEPOLIA', value: 11155111, icon: ETHIcon },
                            { label: 'AVAX C-CHAIN', value: 43114, icon: AvaxIcon },
                            { label: 'AVAX C-CHAIN TESTNET', value: 43113, icon: AvaxIcon },
                        ]} setValue={setChain}></SelectPlus>
                    </StyledView>
                    <StyledView className="mb-4">
                        <StyledText className="text-purple-950 text-lg font-semibold mr-2 mb-1">
                            Currency
                        </StyledText>
                        <SelectPlus data={currencies} setValue={setCurrency}></SelectPlus>
                    </StyledView>
                    <StyledView className="mb-4">
                        <StyledInput
                            key="amount"
                            keyboardType="numeric"
                            placeholder="0.00"
                            value={amount}
                            className="w-full text-center text-4xl bg-gray-100 rounded-md p-2"
                            onChangeText={(text) => parseFloat(setAmount(text.replace(",", ".")))}
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