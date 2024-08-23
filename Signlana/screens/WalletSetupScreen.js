import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SeedPhraseMenu from '../components/SeedPhrase/SeedPhraseMenu';
import Loading from '../components/Loader';
import { createNewSeedPhrase } from '../utils/WalletService';
import basicStyles from '../utils/BasicStyles';
import ContinueSetupWalletButton from '../components/ContinueSetupWalletButton';


const WalletSetupScreen = ({ route, navigation }) => {
    const [wallet, setWallet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(async () => {
            if (route.params.seedSource === 'create') {
                let walletDetails = await createNewSeedPhrase();
                walletDetails = walletDetails.split(" ");
                setWallet(walletDetails)
            }
            setIsLoading(false);
        }, 250)
    }, []); 

    if (isLoading) {
        return <Loading text="Creating seed phrase"/>
    } else {
        return (
            <View style={basicStyles.container}>
                <Text style={basicStyles.title}>Wallet Setup</Text>
                {route.params.seedSource === 'import' ? 
                    <Text style={styles.importText}>Insert the each word in the corresponding placeholder</Text> 
                    : 
                    <Text style={styles.importText}>This is your secret phrase, write it down in a secure place!</Text>}
                <SeedPhraseMenu wallet={wallet} />
                <ContinueSetupWalletButton seedPhrase={wallet ? wallet.join(' ') : wallet} navigation={navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  importText: {
    fontSize: 16,
    color: '#FDFEFF',
    marginBottom: '5%',
    textAlign: 'center',
  },
});

export default WalletSetupScreen;