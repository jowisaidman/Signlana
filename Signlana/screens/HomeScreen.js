import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { getWalletAddress, getWalletAlias } from '../utils/WalletService';
import basicStyles from '../utils/BasicStyles';

const HomeScreen = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        const address = await getWalletAddress();
        const shortenedAddress = getWalletAlias(address);
        setWalletAddress(shortenedAddress);
        setHasPermission(status === 'granted');
    })();
    }, []);

    if (hasPermission === null) {
        return (
            <View style={basicStyles.container}>
                <Text style={styles.permissionText}>Requesting for camera permission</Text>
            </View>
        )
    }
    if (hasPermission === false) {
        <View style={basicStyles.container}>
            <Text style={styles.permissionText}>No access to camera, please give permissions in settings</Text>
        </View>
    }

    return (
        <View style={basicStyles.container}>
            <Text style={basicStyles.title}>Home</Text>
            <Text style={basicStyles.text}>Signed Wallet:   {walletAddress}</Text>
            <TouchableOpacity style={basicStyles.touchOpacityButton} onPress={() => console.log("Show wallet address")}>
                <Text style={styles.touchOpacityText}>Sync wallet with plugin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={basicStyles.touchOpacityButton} onPress={() => console.log("Scan transaction to sign")}>
                <Text style={styles.touchOpacityText}>Scan QR</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    walletText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FDFEFF',
        marginBottom: '5%',
    },
    permissionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FDFEFF',
        marginBottom: '5%',
    },
    touchOpacityText: {
        color: "#FFFFFF",
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default HomeScreen;