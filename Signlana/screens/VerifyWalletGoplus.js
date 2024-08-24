import React, { useState } from 'react'
import { StyledView, StyledText, StyledTouchableOpacity, StyledInput, StyledPicker } from '../components/Styled'
import { CameraView } from 'expo-camera'
import { styled } from 'nativewind/dist'
import { SafeAreaView } from 'react-native';
import { getSolanaWalletAddress, createUnsignedSolanaTransaction, getEVMWalletAddress, getNonce, getMaxFeePerGas, getMaxPriorityFeePerGas } from '../utils/WalletService';
import { network } from './YourWallet';

const Labels = {
    "blacklist_doubt": "Blacklist",
    "blackmail_activities": "Blackmail",
    "cybercrime": "Cybercrime",
    "darkweb_transactions": "Dark Transactions",
    "data_source": "Data Source",
    "fake_kyc": "Fake KYC",
    "fake_standard_interface": "Fake Standard",
    "fake_token": "Fake Token",
    "financial_crime": "Financial Crime",
    "gas_abuse": "Gas Abuse",
    "honeypot_related_address": "Honeypot",
    "malicious_mining_activities": "Malicious Mining",
    "mixer": "Mixer",
    "money_laundering": "Money Laundering",
    "number_of_malicious_contracts_created": "Malicious Contracts",
    "phishing_activities": "Phishing",
    "reinit": "Reinit",
    "sanctioned": "Sanctioned",
    "stealing_attack": "Stealing"
}

async function GoplusVerifyWallet(wallet) {
    const response = await fetch("https://api.gopluslabs.io/api/v1/address_security/" + wallet)
    const data = await response.json()
    return data
}

const StyledCamera = styled(CameraView)

export default function VerifyWalletGoplus({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(false)

    const [verificationData, setVerificationData] = useState()
    const [wallet, setWallet] = useState("")

    console.log({ verificationData })
    console.log(route.params)

    async function buildUnsignedEvmTx(chain, amount, currency) {
        const receiverWallet = await getEVMWalletAddress(); 
        console.log("Currency: ", currency); // For now only ETH
        const chainId = network["ethereum"][chain]["chainId"];
        console.log("EVM address:", receiverWallet)
        let tx = {
            to: receiverWallet["address"],
            value: amount,
            chainId,
            nonce: await getNonce(wallet, chainId),
            gasLimit: 200000, 
            maxPriorityFeePerGas: await getMaxPriorityFeePerGas(chainId),
            maxFeePerGas: await getMaxFeePerGas(chainId),
            accessList: [],
            data: "0x" //TODO: check for usdc
        }

        console.log("Tx to sign: ", tx);

        navigation.navigate('ShowQR', { "message": JSON.stringify(tx), screenTitle: "Evm Tx to Sign", nextScreenName: "ScanQR", nextScreenParams: {screenTitle: "Scan Signed Tx", nextScreenName: "SelectService", sendTransaction: true, chain: chain} })
    }

    async function buildSolanaTx(amount, currency) {
        console.log("Currency: ", currency); // For now only SOL
        const receiverWallet = await getSolanaWalletAddress();
        const message = await createUnsignedSolanaTransaction(wallet, receiverWallet, amount);
        navigation.navigate('ShowQR', { "message": message, screenTitle: "Solana Tx to Sign", nextScreenName: "ScanQR", nextScreenParams: {screenTitle: "Scan Signed Tx", nextScreenName: "SelectService", sendTransaction: true, chain: "solana"} })
    }

    async function buildUnsignedTx(chain, amount, currency) {
        if (chain === 'solana') {
            await buildSolanaTx(amount, currency);
        } else {
            await buildUnsignedEvmTx(chain, amount, currency);
        }
    }

    const verifyWallet = (wallet) => {
        setIsLoading(true)
        setWallet(wallet);
        GoplusVerifyWallet(wallet).then((data) => {
            if (!data.result) return
            setVerificationData(data.result)
            setIsLoading(false)
        })

        // GoPlus.addressSecurity(wallet,selectedChain, 30).then(data=> {
        //     if (data.code !== ErrorCode.SUCCESS) {
        //         console.log({data})
        //       }
        // setIsLoading(false)
        // setVerificationData(data)
        // })
    }

    if (isLoading) return <StyledText>Esta cargando makinolaaaa</StyledText>
    return (
        <StyledView className="flex-1 justify-center items-center bg-purple-300">
            {verificationData ? <>
                <StyledText className="text-3xl text-purple-950">Verification Result</StyledText>
                <StyledView className="flex flex-row flex-wrap items-center justify-center">
                    {Object.entries(verificationData).map(([label, value]) => (
                        <StyledView key={label} className="w-1/4 p-2">
                            <StyledView className="bg-purple-350 rounded-lg p-1 items-center justify-center aspect-square">
                                <StyledText className="text-xs whitespace-nowrap font-bold text-center mb-1 capitalize">{Labels[label]}</StyledText>
                                <StyledText className="text-lg font-light text-center">{value == "0" ? "Clean" : "Danger"}</StyledText>
                            </StyledView>
                        </StyledView>
                    ))}
                </StyledView>
                <StyledTouchableOpacity className='mt-3' onPress={async () => await buildUnsignedTx(route.params.chain, route.params.amount, route.params.currency)}>
                    <StyledText className='bg-purple-350 border rounded-full text-purple-950 border-purple-950 px-4 py-2 text-xl font-semibold'>Create payment</StyledText>
                </StyledTouchableOpacity>
            </> : <>
                <StyledText className="text-5xl text-purple-950">Verify Wallet</StyledText>
                <StyledText className="text-md w-[90%] text-center my-2 text-purple-950"><StyledText className="font-semibold italic">GoPlus™</StyledText> provides fast wallet verification, if some wallet was used with fraud ends, it will be recognized.</StyledText>
                {/* <StyledPicker items={networkArray} onValueChange={setSelectedChain} value={selectedChain}></StyledPicker> */}
                <StyledCamera onBarcodeScanned={({ data }) => { verifyWallet(data) }} barcodeScannerSettings={{ barcodeTypes: ["qr"] }} className='w-72 h-72' />

                <SafeAreaView>
                    <StyledInput placeholder="Or paste it here..." className="bg-purple-200 p-2 w-72 mt-4 rounded-full"></StyledInput>
                </SafeAreaView>

                
            </>}
            <StyledTouchableOpacity onPress={() => { navigation.goBack() }} className="absolute top-12 left-5">
                    <StyledText className="text-lg bg-purple-200 font-semibold rounded-full px-4 py-2">
                        Go Back
                    </StyledText>
                </StyledTouchableOpacity>
        </StyledView>
    )
}

//<StyledTouchableOpacity
//className="bg-purple-350 p-3 rounded-full mt-4"
//onPress={async () => await buildUnsignedTx()} //TODO: volar este boton, que en el point el usuario escanee la wallet del otro si o si para saber aramar de tx solana
//>
//<StyledText className="text-purple-950 text-2xl text-center font-semibold">Next</StyledText>
//</StyledTouchableOpacity>
