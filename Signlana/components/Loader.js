import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import basicStyles from '../utils/BasicStyles';

export default function Loading({text}) {
    return (
        <View style={basicStyles.container}>
            <ActivityIndicator size="large" />
            <Text style={basicStyles.text}>{text}</Text>
        </View>
    );
}