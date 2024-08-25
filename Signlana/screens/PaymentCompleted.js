import React from 'react'
import { StyledView, StyledText, StyledImage, StyledTouchableOpacity } from '../components/Styled'

import SOLIcon from "../assets/solana.png"
import ETHIcon from "../assets/ethereum.png"
import AvaxIcon from "../assets/avax-icon.png"
import USDCICon from "../assets/usdc-icon.png"

import CheckIcon from "../assets/checkmark-icon.png"

import { useStore } from '@nanostores/react'
import { $transactionData, $currentWallet } from '../utils/CurrentWalletStore'

import appConfig from '../app.json';
import { Linking } from 'react-native';

const CurrencyIcon = {
    "sol": SOLIcon,
    "eth": ETHIcon,
    "avax": AvaxIcon,
    "usdc": USDCICon,
}

const networks = {
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
      "Ethereum Sepolia": {
        "chainId": 11155111,
        "rpcUrl": "https://ethereum-sepolia-rpc.publicnode.com",
        "blockExplorer": "https://eth-sepolia.blockscout.com/",
        "nativeCurrency": {
          "name": "ETH",
          "symbol": "ETH",
          "decimals": 18
        },
        "USDC address": "0x4c28C8D330E6Cc4fed9DdcCb79b662a4942C931F"
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
      "Polygon Amoy": {
        "chainId": 111111,
        "rpcUrl": "https://polygon-amoy-rpc.publicnode.com",
        "blockExplorer": "https://amoy.polygonscan.com/",
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
      },
      "Arbitrum Sepolia": {
        "chainId": 421611,
        "rpcUrl": "https://arbitrum-sepolia-rpc.publicnode.com",
        "blockExplorer": "https://sepolia-explorer.arbitrum.io/",
        "nativeCurrency": {
          "name": "ETH",
          "symbol": "ETH",
          "decimals": 18
        },
        "USDC address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
      },
      "Avax C-Chain": {
        "chainId": 43114,
        "rpcUrl": "https://api.avax.network/ext/bc/C/rpc",
        "blockExplorer": "https://snowtrace.io/",
        "nativeCurrency": {
          "name": "AVAX",
          "symbol": "AVAX",
          "decimals": 6
        },
        "USDC address": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"
      },
      "Avalanche Fuji C-Chain": {
        "chainId": 43113,
        "rpcUrl": "https://api.avax-test.network/ext/bc/C/rpc",
        "blockExplorer": "https://testnet.snowtrace.io/",
        "nativeCurrency": {
          "name": "AVAX",
          "symbol": "AVAX",
          "decimals": 6
        },
        "USDC address": "0x5425890298aed601595a70AB815c96711a31Bc65"
      }
    },
    "solana": {
      "Solana" : {
        "name": "Solana",
        "chainId": 101,
        "rpcUrl": "https://api.devnet.solana.com",
        "blockExplorer": "https://explorer.solana.com",
        "nativeCurrency": {
          "name": "SOL",
          "symbol": "SOL",
          "decimals": 9
        }
      }
    }

}

export default function PaymentCompleted({ navigation, props }) {
    const { amount, currency, from, transactionId, chainId } = useStore($transactionData);
    const { chain } = useStore($currentWallet);

    console.log("chain", chain, amount, currency, from, transactionId, chainId);
    const blockExplorerBaseUrl = Object.keys(networks[chain]).find(key => networks[chain][key].chainId === chainId)["blockExplorer"];
    const scanUrl = blockExplorerBaseUrl + "tx/" + transactionId;

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
