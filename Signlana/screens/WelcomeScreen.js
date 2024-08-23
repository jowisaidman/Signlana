import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import basicStyles from '../utils/BasicStyles';
import { getValueFor } from '../utils/SecureStorage';

const WelcomeScreen = ({ navigation }) => {
    useEffect(() => {
        async function checkSeedPhrase() {
            let seedPhrase = await getValueFor("seedPhrase");
            if (seedPhrase) {
                console.log("Seed phrase: ", seedPhrase);
                navigation.navigate("Home");
            }
        }
        checkSeedPhrase();
    }, []); 
    
    return (
        <View style={basicStyles.container}>
            <Text style={basicStyles.title}>Add your wallet</Text>
            <TouchableOpacity style={basicStyles.touchOpacityButton} onPress={() => navigation.navigate('WalletSetup', { seedSource: 'create' })}>
                <Text style={basicStyles.text}>Create Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={basicStyles.touchOpacityButton} onPress={() => navigation.navigate('WalletSetup', { seedSource: 'import' })}>
                <Text style={basicStyles.text}>Import Wallet</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#000000',
      marginBottom: '25%',
    },
    touchOpacityButton: {
        marginBottom: 25,
        width: '80%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#116466',
        borderRadius: 10
    },
    text: {
        color: "#000000",
        fontWeight: 'bold',
        fontSize: 16
    }
});

  
export default WelcomeScreen;