import React from 'react'
import { StyledView, StyledText, StyledImage, StyledTouchableOpacity } from '../components/Styled'

import SOLIcon from "../assets/solana.png"
import ETHIcon from "../assets/ethereum.png"
import AvaxIcon from "../assets/avax-icon.png"
import USDCICon from "../assets/usdc-icon.png"
import PolICon from "../assets/polygon.png"

import CheckIcon from "../assets/checkmark-icon.png"

import { useStore } from '@nanostores/react'
import { $transactionData, $currentWallet } from '../utils/CurrentWalletStore'

import appConfig from '../app.json';
import { Linking } from 'react-native';

const CurrencyIcon = {
    "solana": SOLIcon,
    "eth": ETHIcon,
    "ethereum": ETHIcon,
    "avax": AvaxIcon,
    "usdc": USDCICon,
    "pol": PolICon
}

const blockExplorers = {
    "1": "https://eth.blockscout.com/",
    "11155111": "https://eth-sepolia.blockscout.com/",
    "137": "https://polygonscan.com/",
    "80002": "https://amoy.polygonscan.com/",
    "42161": "https://arbiscan.io/",
    "421614": "https://sepolia.arbiscan.io/",
    "43114": "https://snowtrace.io/",
    "43113": "https://testnet.snowtrace.io/",
    "solana": "https://explorer.solana.com/"
  }

export default function PaymentCompleted({ navigation, props }) {
    const { amount, currency, from, transactionId, chainId } = useStore($transactionData);
    const { chain } = useStore($currentWallet);

    console.log("chain", chain, amount, currency, from, transactionId, chainId);
    //const blockExplorerBaseUrl = Object.keys(networks[chain]).find(key => networks[chain][key].chainId === chainId)["blockExplorer"];
    const scanUrl = blockExplorers[chainId] + "tx/" + transactionId + "?cluster=devnet";

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
                <StyledText className='text-3xl font-semibold text-purple-950'>{amount}</StyledText>
            </StyledView>
            <StyledText className='text-md font-light mt-1'>From: {from}</StyledText>
            <StyledView className='absolute bottom-8 flex flex-row gap-2'>
                <StyledTouchableOpacity onPress={() => { navigation.replace("SelectService") }} className="bg-purple-200 border-2  border-purple-950 p-1 rounded-full">
                    <StyledText className='text-2xl font-semibold px-4 py-2 text-purple-950'>Back Home</StyledText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity onPress={() => { Linking.openURL(scanUrl) }} className=" bg-purple-900 border-2 border-purple-950 p-1 rounded-full">
                    <StyledText className='text-xl font-semibold px-4 py-3 text-purple-200'>View Transaction</StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </StyledView>
    )
}
