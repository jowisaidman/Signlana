import React, { useState } from 'react'
import { StyledView, StyledImage, StyledText, StyledTouchableOpacity } from '../components/Styled'
import { Linking } from 'react-native';

import CopyIcon from "../assets/copy-icon.png"

import QRCode from "react-native-qrcode-svg"

import * as Clipboard from 'expo-clipboard';
import { Share } from 'react-native'; // For sharing functionality

import { useStore } from '@nanostores/react';
import { $currentWallet } from '../utils/CurrentWalletStore';

import SOLIcon from "../assets/solana.png"
import ETHIcon from "../assets/ethereum.png"
import ArbitrumIcon from "../assets/arbitrum.png"
import PolygonIcon from "../assets/polygon.png"
import AvaxIcon from "../assets/avax-icon.png"

import WalletPop from '../components/WalletPop';

//1309

const network = {
    "ethereum": {
        "Ethereum": {
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
        },
        "Avalanche": {
            "chainId": 43114,
            "rpcUrl": "https://api.avax.network/ext/bc/C/rpc",
            "blockExplorer": "https://snowtrace.io/",
            "nativeCurrency": {
                "name": "AVAX",
                "symbol": "AVAX",
                "decimals": 18
            },
            "USDC address": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"
        }
    },
    "solana": {
        "Solana": {
            "name": "Solana",
            "chainId": 101,
            "rpcUrl": "https://api.mainnet-beta.solana.com",
            "blockExplorer": "https://explorer.solana.com/",
            "nativeCurrency": {
                "name": "SOL",
                "symbol": "SOL",
                "decimals": 9
            }
        }
    }

}

const IconList = {
    "Solana": SOLIcon,
    "Ethereum": ETHIcon,
    "Arbitrum": ArbitrumIcon,
    "Polygon": PolygonIcon,
    "Avalanche": AvaxIcon
}

export default function YourWallet({ navigation }) {
    const { wallet, chain } = useStore($currentWallet);
    const [scan, setScan] = useState()

    const copyToClipboard = async (content) => {
        await Clipboard.setStringAsync(content);
        // ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
    };

    const openExplorer = (link) => {
        Linking.openURL(link);
    }

    const shareWallet = async () => {
        try {
            await Share.share({ message: wallet });
        } catch (error) {
            console.log('Error sharing wallet address:', error);
        }
    };

    const scanUrl = scan ? network[chain][scan].blockExplorer + "address/" + wallet : '';

    console.log(scanUrl)

    const renderContent = () => {
        if (scan) {
            return (
                <>
                    <StyledText className='text-4xl text-center text-purple-950 mb-1 font-semibold'>Scan at {scan} network</StyledText>
                    <StyledText className='text-xs italic text-center text-purple-950 mb-5'>WARNING: this is not your wallet, you are sharing network scan URL.</StyledText>
                    <QRCode logo={IconList[scan]} size={250} value={scanUrl}></QRCode>
                    <StyledView className='flex pt-5 flex-row items-center gap-1 mb-5'>
                        <StyledTouchableOpacity onPress={() => { openExplorer(scanUrl) }}>
                            <StyledText className="bg-purple-350 underline text-center text-xs mb- px-3 py-2 text-purple-950 font-semibold rounded-full">
                                {scanUrl}
                            </StyledText>
                        </StyledTouchableOpacity>
                        {/* <StyledImage tintColor="#3b0764" source={CopyIcon} className="w-5 h-5 bg-purple-350" /> */}

                        <StyledTouchableOpacity onPress={() => { copyToClipboard(scanUrl) }} className="bg-purple-350 p-1 rounded-full">
                            <StyledImage tintColor="#3b0764" source={CopyIcon} className="w-5 h-5" />
                        </StyledTouchableOpacity>
                    </StyledView>

                    <StyledTouchableOpacity onPress={() => { setScan() }} className="bg-purple-350 border border-purple-950 p-1 rounded-full">
                        <StyledText className='text-3xl font-semibold px-4 py-2 text-purple-950'>Exit</StyledText>
                    </StyledTouchableOpacity>
                </>
            );
        }

        return (
            <>
                <StyledText className="text-6xl text-purple-950 mb-4 font-semibold">Share</StyledText>
                <StyledView className="flex items-center justify-center ">
                    <QRCode size={250} value={wallet} />
                    <StyledText className="bg-purple-350 my-5 items-center text-purple-950 justify-center px-3 py-2 font-semibold rounded-full">
                        Network: {chain === "solana" ? "Solana" : "EVM"}
                    </StyledText>
                    <StyledView className='flex flex-row items-center gap-1 mb-5'>
                        <StyledText className="bg-purple-350 text-xs mb- px-3 py-2 text-purple-950 font-semibold rounded-full">
                            {wallet}
                        </StyledText>
                        {/* <StyledImage tintColor="#3b0764" source={CopyIcon} className="w-5 h-5 bg-purple-350" /> */}

                        <StyledTouchableOpacity onPress={() => copyToClipboard(wallet)} className="bg-purple-350 p-1 rounded-full">
                            <StyledImage tintColor="#3b0764" source={CopyIcon} className="w-5 h-5" />
                        </StyledTouchableOpacity>
                    </StyledView>
                    <StyledText className='text-center italic text-xl mb-1 text-purple-950'>Scan with</StyledText>
                    <StyledView className="flex flex-row flex-wrap gap-3">

                        {Object.keys(network[chain]).map((chainName) =>
                            <StyledTouchableOpacity key={chainName} onPress={() => setScan(chainName)} className="bg-purple-350 p-4 rounded-full">
                                <StyledImage source={IconList[chainName]} className="w-8 h-8" />
                            </StyledTouchableOpacity>
                        )}
                    </StyledView>
                </StyledView>

                {/* <StyledTouchableOpacity
                    className="bg-purple-350 p-3 rounded-full mt-4"
                    onPress={() => navigation.navigate('ScanQR', {screenTitle: "Scan tx to Sign", nextScreenName: "SignMessage"})}
                >
                    <StyledText className="text-purple-950 text-2xl text-center font-semibold">Scan tx to Sign</StyledText>
                </StyledTouchableOpacity> */}
            </>
        );
    }

    return (
        <StyledView className='bg-purple-300 w-full h-full flex items-center justify-center'>
            <WalletPop navigation={navigation} hideQr />
            {renderContent()}
            {/* <StyledTouchableOpacity onPress={() => { navigation.goBack() }} className="absolute top-12 left-5">
                <StyledText className="text-lg bg-purple-200 font-semibold rounded-full px-4 py-2">
                    Go Back
                </StyledText>
            </StyledTouchableOpacity> */}
        </StyledView>
    );
}
