import React from 'react';
import { View, StyleSheet } from 'react-native';
import RowSeedPhraseMenu from './RowSeedPhraseMenu';
import { StyledInput, StyledText, StyledView } from '../Styled';

const PhraseList = ({ phrases, chain }) =>
  <>
    <StyledText className='text-xl mb-3 text-purple-950 text-center font-semibold'>
      {chain}
    </StyledText>
    <StyledView className='flex flex-row flex-wrap items-center justify-center gap-2'>
      {
        phrases.map(phrase => <StyledInput key={phrase} value={phrase} className='bg-purple-200 border-2 border-purple-950 rounded-xl p-2' />)
      }
    </StyledView>
  </>


const SeedPhraseMenu = ({ wallet: { sol, evm } }) => {
  return (
    <StyledView >
      <StyledView>
        {/* <StyledText>
          Solana
        </StyledText>
        <StyledView className='flex flex-row flex-wrap items-center justify-center gap-2'>
          {
            wallet.sol.map(phrase => <StyledInput value={phrase} className='bg-purple-200 border-2 border-purple-950 rounded-xl p-2' />)
          }
        </StyledView> */}
        <PhraseList chain={"Solana"} phrases={sol} />
        <PhraseList chain={"EVM"} phrases={evm} />
        {/* <PhraseList /> */}
      </StyledView>

    </StyledView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  }
});

export default SeedPhraseMenu;