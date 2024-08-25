
import React from 'react';
import {StyledView, StyledText, StyledTouchableOpacity} from "../components/Styled"
import QRCode from 'react-native-qrcode-svg';
import WalletPop from '../components/WalletPop';

const ShowQRScreen = ({ navigation, route }) => {

    return (
        <StyledView className="flex-1 justify-center items-center bg-purple-300">
            {/* <StyledTouchableOpacity onPress={() => { navigation.goBack() }} className="absolute top-12 left-5">
                <StyledText className="text-lg bg-purple-200 font-semibold rounded-full px-4 py-2">
                    Go Back
                </StyledText>
            </StyledTouchableOpacity> */}
            <StyledText className="text-4xl text-purple-950 font-bold mb-5">{route.params.screenTitle}</StyledText>
            <QRCode value={route.params.message} size={300} /> 
            <StyledTouchableOpacity className="bg-purple-350 p-3 rounded-full mt-4"
                    onPress={() => navigation.navigate(route.params.nextScreenName, route.params.nextScreenParams)}
                >
                    <StyledText className="text-black text-xl font-semibold">Continue</StyledText>
            </StyledTouchableOpacity>
        </StyledView>
    );
};

export default ShowQRScreen;