import React from 'react';
import { View, StyleSheet } from 'react-native';
import RowSeedPhraseMenu from './RowSeedPhraseMenu';

const SeedPhraseMenu = ({wallet}) => {

  return (
    <View style={styles.container}>
      <RowSeedPhraseMenu
        firstInput={{textPlaceholder: "Word 1", textValue: wallet? wallet.mnemonic[0]: null }}
        secondInput={{textPlaceholder: "Word 2", textValue: wallet? wallet.mnemonic[1] : null }}
        thirdInput={{textPlaceholder: "Word 3", textValue: wallet? wallet.mnemonic[2] : null }}
      />
      <RowSeedPhraseMenu
        firstInput={{textPlaceholder: "Word 4", textValue: wallet? wallet.mnemonic[3] : null }}
        secondInput={{textPlaceholder: "Word 5", textValue: wallet? wallet.mnemonic[4] : null }}
        thirdInput={{textPlaceholder: "Word 6", textValue: wallet? wallet.mnemonic[5] : null }}
      />
      <RowSeedPhraseMenu
        firstInput={{textPlaceholder: "Word 7", textValue: wallet? wallet.mnemonic[6] : null }}
        secondInput={{textPlaceholder: "Word 8", textValue: wallet? wallet.mnemonic[7] : null }}
        thirdInput={{textPlaceholder: "Word 9", textValue: wallet? wallet.mnemonic[8] : null }}
      />
      <RowSeedPhraseMenu
        firstInput={{textPlaceholder: "Word 10", textValue: wallet? wallet.mnemonic[9] : null }}
        secondInput={{textPlaceholder: "Word 11", textValue: wallet? wallet.mnemonic[10] : null }}
        thirdInput={{textPlaceholder: "Word 12", textValue: wallet? wallet.mnemonic[11] : null }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  }
});

export default SeedPhraseMenu;