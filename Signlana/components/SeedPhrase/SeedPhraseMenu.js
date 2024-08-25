import React from 'react';
import { View, StyleSheet } from 'react-native';
import RowSeedPhraseMenu from './RowSeedPhraseMenu';
import { StyledInput, StyledText, StyledView } from '../Styled';

const SeedPhraseMenu = ({wallet}) => {
  return (
    <StyledView className='flex flex-row gap-2 justify-center mb-4 mx-auto flex-wrap'>
        {
        wallet.map(phrase => <StyledInput key={phrase} value={phrase} className='bg-purple-200 w-1/4 border-2 border-purple-950 rounded-xl p-2' />)
      }
    </StyledView>
  );
};


export default SeedPhraseMenu;