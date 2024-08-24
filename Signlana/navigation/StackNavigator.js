import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import WalletSetupScreen from '../screens/WalletSetupScreen';
import SelectService from '../screens/SelectService';
import EvmWalletSetupScreen from '../screens/EvmWalletSetupScreen';
import YourWallet from '../screens/YourWallet';
import PaymentDetail from '../screens/PaymentDetail';
import VerifyWalletGoplus from '../screens/VerifyWalletGoplus';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="WalletSetup" component={WalletSetupScreen}/>
        <Stack.Screen name="SelectService" component={SelectService} />
        <Stack.Screen name="YourWallet" component={YourWallet} />
        <Stack.Screen name="PaymentDetail" component={PaymentDetail} />
        <Stack.Screen name="VerifyWalletGoplus" component={VerifyWalletGoplus} />

        <Stack.Screen name="SolWalletSetup" component={WalletSetupScreen}/>
        <Stack.Screen name="EvmWalletSetup" component={EvmWalletSetupScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
    container: {
      background: '#9945FF',
      color: '#9945FF'
    },
  });
  
  export default StackNavigator;