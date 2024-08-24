import React, { useState } from 'react'
import { StyledView, StyledImage, StyledText, StyledTouchableOpacity, StyledSwitch } from '../components/Styled'
import { Linking } from 'react-native';

import ShareIcon from "../assets/share-icon.png"
import CopyIcon from "../assets/copy-icon.png"
import EthereumIcon from "../assets/ethereum-icon.png"

import QRCode from "react-native-qrcode-svg"

import * as Clipboard from 'expo-clipboard';
import { Share } from 'react-native'; // For sharing functionality
import { ToastAndroid } from 'react-native'; // For Android Toast messages

import Constants from 'expo-constants';
import { useStore } from '@nanostores/react';
import { $currentWallet } from '../utils/CurrentWalletStore';

const network = {
    "ethereum": {
      "Ethereum" : {
        "chainId": 1,
        "rpcUrl": "https://ethereum-rpc.publicnode.com",
        "blockExplorer": "https://eth.blockscout.com/",
        "nativeCurrency": {
          "name": "ETH",
          "symbol": "ETH",
          "decimals": 18
        },
        "USDC address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
      },
      "Polygon": {
        "chainId": 137,
        "rpcUrl": "https://polygon-rpc.publicnode.com",
        "blockExplorer": "https://polygonscan.com/",
        "nativeCurrency": {
          "name": "MATIC",
          "symbol": "MATIC",
          "decimals": 18
        },
        "USDC address": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174"
      },
      "Arbitrum": {
        "chainId": 42161,
        "rpcUrl": "https://arbitrum-rpc.publicnode.com",
        "blockExplorer": "https://arbiscan.io/",
        "nativeCurrency": {
          "name": "ETH",
          "symbol": "ETH",
          "decimals": 18
        },
        "USDC address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
      }
    },
    "solana": {
      "Solana" : {
        "name": "Solana",
        "chainId": 101,
        "rpcUrl": "https://api.mainnet-beta.solana.com",
        "blockExplorer": "https://explorer.solana.com",
        "nativeCurrency": {
          "name": "SOL",
          "symbol": "SOL",
          "decimals": 9
        }
      }
    }

  }

export default function YourWallet({ navigation }) {
    const {wallet, chain} = useStore($currentWallet);

    console.log(Object.values(network[chain]))

    // const [switchValue, setSwitchValue] = useState(false)

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(wallet);
        ToastAndroid.show('Wallet address copied to clipboard!', ToastAndroid.SHORT);
    };

    const openExplorer = (link) => {
        Linking.openURL(link);
    }

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

            {/* <StyledView className='flex flex-row items-center justify-center'>
                <StyledText className='text-xl font-bold text-purple-950'>SOL</StyledText>
                <StyledSwitch value={switchValue} onValueChange={setSwitchValue} />
                <StyledText className='text-xl font-bold text-purple-950'>EVM</StyledText>
            </StyledView> */}

            <StyledView className="flex items-center justify-center ">
                <QRCode size={250} value={wallet} />
                <StyledText className="bg-purple-350 my-5 items-center justify-center px-3 py-2 font-semibold rounded-full">
                    Network: {chain == "solana" ? "Solana" : "EVM"}
                </StyledText>
                <StyledText className="bg-purple-350 my-5 px-3 py-2 font-semibold rounded-full">
                    {wallet}
                </StyledText>
                <StyledView className="flex flex-row flex-wrap gap-3">
                    <StyledTouchableOpacity onPress={shareWallet} className="bg-purple-350 p-4 rounded-full">
                        <StyledImage source={ShareIcon} className="w-8 h-8" />
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity onPress={copyToClipboard} className="bg-purple-350 p-4 rounded-full">
                        <StyledImage source={CopyIcon} className="w-8 h-8" />
                    </StyledTouchableOpacity>
                    {/* <StyledTouchableOpacity onPress={() => openExplorer(`https://etherscan.io/address/${wallet}`)} className="bg-purple-350 p-4 rounded-full">
                        <StyledImage source={EthereumIcon} className="w-8 h-8" />
                    </StyledTouchableOpacity> */}
                    {Object.entries(network[chain]).map(([chain, data])=> 
                        <StyledTouchableOpacity onPress={openExplorer} className="bg-purple-350 p-4 rounded-full">
                        <StyledText  className="w-8 h-8" >
                            {chain}
                        </StyledText>
                    </StyledTouchableOpacity>
                    )}
                </StyledView>
            </StyledView>

            <StyledTouchableOpacity
                        className="bg-purple-350 p-3 rounded-full mt-4"
                        onPress={async () => navigation.navigate('ScanQR', {screenTitle: "Scan tx to Sign", nextScreenName: "SignMessage"})}
                    >
                        <StyledText className="text-purple-950 text-2xl text-center font-semibold">Scan tx to Sign</StyledText>
            </StyledTouchableOpacity>

            <StyledTouchableOpacity onPress={() => { navigation.goBack() }} className="absolute top-12 left-5">
                <StyledText className="text-lg bg-purple-200 font-semibold rounded-full px-4 py-2">
                    Go Back
                </StyledText>
            </StyledTouchableOpacity>
        </StyledView>
    );
}
