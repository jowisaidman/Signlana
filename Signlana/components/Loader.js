import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import basicStyles from '../utils/BasicStyles';
import { StyledText, StyledView } from './Styled';

export default function Loading({text}) {
    return (
        <StyledView className='bg-purple-350 w-full h-full flex items-center justify-center'>
            <ActivityIndicator size="large" />
            <StyledText className='text-3xl text-purple-950'>{text}</StyledText>
        </StyledView>
    );
}