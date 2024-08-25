import React, {useEffect, useState} from 'react'
import {StyledView, StyledText, StyledImage, StyledTouchableOpacity} from "./Styled"

import QRCode from "../assets/qr-code.png"
import { getValueFor } from '../utils/SecureStorage'

import * as SecureStore from 'expo-secure-store';

import EVMIcon from "../assets/ethereum.png"
import SOLIcon from "../assets/solana.png"
import { getWalletAlias } from '../utils/WalletService';

import { useStore } from '@nanostores/react'
import { $currentWallet, setCurrentWallet } from '../utils/CurrentWalletStore';


export default function WalletPop({navigation, hideQr = false}) {
    //Selection is open
    const [select, setSelect] = useState(false)

    const [wallets, setWallets] = useState({})

    const currentWallet = useStore($currentWallet)

    useEffect(() => {
        (async() => {
            const [ethereumWallet, solanaWallet] = await Promise.all([getValueFor("ethereumWallet") ,getValueFor("solanaWallet")])
            if(currentWallet.wallet ==""){
                setCurrentWallet(solanaWallet, "solana")
            }
            setWallets({
                sol: solanaWallet,
                eth: ethereumWallet
            })
        })()
    }, [])

    const changeWallet = (wallet, chain) => {
        setCurrentWallet(wallet,chain)
        setSelect(false)
    }

    if(select) return <StyledView className='absolute transition-all bg-purple-200 rounded-xl top-12 flex items-start p-3 justify-center'>
        <StyledTouchableOpacity onPress={() => {changeWallet(wallets.eth, "ethereum")}} className='flex flex-row items-center gap-1'>
            <StyledImage className='h-8 w-8' source={EVMIcon}/>
            <StyledText className='text-xl px-1 text-purple-950 font-bold'>
                {getWalletAlias(wallets.eth)}
            </StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity onPress={() => {changeWallet(wallets.sol, "solana")}} className='flex pt-2 flex-row items-center gap-1'>
            <StyledImage className='h-8 w-8' source={SOLIcon}/>
            <StyledText className='text-xl px-1 text-purple-950 font-bold'>
            {getWalletAlias(wallets.sol)}

            </StyledText>
        </StyledTouchableOpacity>
    </StyledView>

    return <StyledView className='absolute top-12 flex flex-row items-center gap-2'>
        {/*<StyledTouchableOpacity onPress={() => {
            SecureStore.deleteItemAsync("seedPhrase").then(() => {
                navigation.navigate("Welcome")
            })
            }} className='h-11 w-11 items-center p-4 justify-center rounded-full bg-purple-200'>
            <StyledImage source={QRCode} className='w-7 h-7'/>
        </StyledTouchableOpacity>*/}
        <StyledTouchableOpacity onPress={() => {
            setSelect(true)
        }} className=" flex flex-row rounded-full  py-2 px-2 bg-purple-200">
            <StyledImage source={currentWallet.chain == "solana" ? SOLIcon : EVMIcon} className='h-8 w-8'>
            </StyledImage>
            <StyledText className='text-lg px-1 pt-[2px] text-purple-950 font-semibold'>
                {getWalletAlias(currentWallet.wallet ?? "")}
            </StyledText>
        </StyledTouchableOpacity>
        {!hideQr && <StyledTouchableOpacity onPress={() => {navigation.navigate("YourWallet")}} className='h-11 w-11 items-center p-4 justify-center rounded-full bg-purple-200'>
            <StyledImage source={QRCode} className='w-7 h-7'/>
        </StyledTouchableOpacity>}
    </StyledView>
  
}
