import React from 'react';
import {ActivityIndicator} from 'react-native';
import { StyledText, StyledView } from './Styled';

export default function Loading({text}) {
    return (
        <StyledView className='bg-purple-350 w-full h-full flex items-center justify-center'>
            <ActivityIndicator size="large" />
            <StyledText className='text-3xl text-purple-950 text-center'>{text}</StyledText>
        </StyledView>
    );
}