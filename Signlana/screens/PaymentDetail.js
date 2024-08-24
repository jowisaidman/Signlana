import React from 'react'
import { StyledView, StyledInput, StyledText, StyledImage, StyledTouchableOpacity } from '../components/Styled'

import { SafeAreaView } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

import GoplusIcon from "../assets/goplus.png"
import CreateUnsignedTransactionButton from '../components/CreateUnsignedTransactionButton';
import SignTransactionButton from '../components/SignTransactionButton';


export default function PaymentDetail({ navigation }) {
    return (
        <StyledView className="flex-1 justify-center items-center bg-purple-300">
                    <StyledText className="text-4xl font-semibold mb-4 text-center">Payment Details</StyledText>

            <SafeAreaView>
                {/* <StyledInput type="number" className="w-20 h-10 bg-white"></StyledInput> */}
                <StyledView className=" p-4 rounded-xl w-72 max-w-sm">
                <StyledView className="mb-4">
                        <RNPickerSelect value="usdc" onValueChange={() => {}} items={[
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
                        />
                    </StyledView>

                    

                    <StyledTouchableOpacity
                        className="bg-purple-350 p-3 rounded-full mt-4"
                        onPress={() => navigation.navigate('NextScreen')}
                    >
                        <StyledText className="text-purple-950 text-2xl text-center font-semibold">Next</StyledText>
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity
                        className="border-2 bg-purple-950 border-purple-900 flex items-center gap-1 py-2 rounded-full mt-4"
                        onPress={() => navigation.navigate('VerifyWalletGoplus')}
                    >
                        <StyledText className="text-purple-200 text-left text-md font-light">Verify wallet with</StyledText>
                        <StyledImage className="w-[70%] h-9 " tintColor='#e9d5ff' source={GoplusIcon}></StyledImage>
                    </StyledTouchableOpacity>
                    <CreateUnsignedTransactionButton senderPubkey="FH7amfL9RXfe4CmPjLQGLYWNxPvjMjRQ4AcdVDxtK4U8" receiverPubkey="JDbbKjTrHesbsQySLfPSRQZj6fgjeuVoDhZhFe5tMT4a"/>
                    <SignTransactionButton base64Transaction="AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAED1CRaPAeUIperwFfXTnq/xMhRjdOOR70jpmhS11dssvH/0MKwQPzslwH6Rf/FNm7s/Q8LsHJZbKzwLpPsv6zUhwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwIorgC3VANx1UO4KH+kEJobHVAbClAPa8fetQ2j76XgBAgIAAQwCAAAAQEIPAAAAAAA=" senderPrivateKey="YOUR_KEY"/>
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
