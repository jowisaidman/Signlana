import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

const RowSeedPhraseMenu = ({firstInput, secondInput, thirdInput}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={firstInput.textPlaceholder}
        value={firstInput.textValue}
        style={styles.input}
        placeholderTextColor="#000"
      />
      <TextInput
        placeholder={secondInput.textPlaceholder}
        value={secondInput.textValue}
        style={styles.input}
        placeholderTextColor="#000"
      />
      <TextInput
        placeholder={thirdInput.textPlaceholder}
        value={thirdInput.textValue}
        style={styles.input}
        placeholderTextColor="#000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 5,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    width: 115,
    backgroundColor: '#00FFA3',
    borderRadius: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    color: '#ffffff'
  },
  container: {
    flexDirection: 'row'
  }
});

export default RowSeedPhraseMenu;