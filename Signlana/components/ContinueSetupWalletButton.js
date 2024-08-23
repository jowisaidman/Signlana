import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { save } from '../utils/SecureStorage';

const ContinueSetupWalletButton = ({seedPhrase, navigation}) => {
  
    const handleContinue = async () => {
        await save("seedPhrase", seedPhrase);
        navigation.navigate('SelectService');
    }

    return (
        <TouchableOpacity style={styles.touchOpacityButton} onPress={() => handleContinue()}>
            <Text style={styles.text}>Continue</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  touchOpacityButton: {
      marginTop: 25,
      width: '80%',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#00FFA3',
      borderRadius: 10
  },
  text: {
      color: "#FFFFFF",
      fontWeight: 'bold',
      fontSize: 16
  }
});

export default ContinueSetupWalletButton;