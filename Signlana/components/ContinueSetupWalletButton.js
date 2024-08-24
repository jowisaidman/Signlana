import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { save } from '../utils/SecureStorage';
import { StyledText } from './Styled';

const ContinueSetupWalletButton = ({wallet, navigation}) => {
  
    const handleContinue = async () => {
        await save("seedEVMPhrase", wallet.evm.join(" "));
        await save("seedSolanaPhrase", wallet.sol.join(" "));
        navigation.navigate('SelectService');
    }

    return (
        <TouchableOpacity className="px-4 py-2 bg-purple-350 border-2 border-purple-950 rounded-full" onPress={() => handleContinue()}>
            <StyledText className='text-2xl text-purple-950 font-semibold'>Continue</StyledText>
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