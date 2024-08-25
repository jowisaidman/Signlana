import React from 'react'
import { StyledView, StyledText, StyledImage, StyledTouchableOpacity } from '../components/Styled'
import SelectDropdown from 'react-native-select-dropdown'

const SelectPlus = ({ data, setValue }) => {
  return (
    <SelectDropdown
      data={data}
      onSelect={(selectedItem) => {
        setValue(selectedItem.value);
      }}
      defaultValue={data[0].value}
      renderButton={(selectedItem, isOpened) => (
        <StyledTouchableOpacity className='bg-purple-200 w-full flex flex-row items-center justify-center'>
          <StyledView className='px-3 pt-2 pb-3 rounded-md text-xl bg-purple-200 text-purple-950 flex flex-row items-center gap-1'>
            {selectedItem?.icon && <StyledImage className='w-8 h-8' source={selectedItem.icon} />}
            <StyledText className='text-lg font-semibold text-purple-950'>{selectedItem?.label || "Select..."}</StyledText>
          </StyledView>
        </StyledTouchableOpacity>
      )}
      renderItem={(item, index, isSelected) => (
        <StyledTouchableOpacity className=' w-full flex flex-row items-center justify-center'>
          <StyledView className={`px-6 py-4 rounded-xl text-xl text-purple-950 flex flex-row items-center gap-1 ${isSelected && "bg-purple-200"}`}>
            {item?.icon && <StyledImage className='w-8 h-8' source={item.icon} />}
            <StyledText className='text-lg font-semibold text-purple-950'>{item?.label || "Select..."}</StyledText>
          </StyledView>
        </StyledTouchableOpacity>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default SelectPlus;