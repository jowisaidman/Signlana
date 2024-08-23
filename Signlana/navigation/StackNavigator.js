import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import WalletSetupScreen from '../screens/WalletSetupScreen';
import HomeScreen from '../screens/HomeScreen';
import EvmWalletSetupScreen from '../screens/EvmWalletSetupScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const defaultStyle = { headerStyle: { backgroundColor: '#1D1A3B' }, headerTintColor: '#FDFEFF' }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={defaultStyle} />
        <Stack.Screen name="WalletSetup" component={WalletSetupScreen} options={defaultStyle}/>
        <Stack.Screen name="Home" component={HomeScreen} options={defaultStyle}/>
        <Stack.Screen name="SolWalletSetup" component={WalletSetupScreen} options={defaultStyle}/>
        <Stack.Screen name="EvmWalletSetup" component={EvmWalletSetupScreen} options={defaultStyle}/>
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