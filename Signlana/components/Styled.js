import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { styled } from 'nativewind';
import RNPickerSelect from 'react-native-picker-select';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledInput = styled(TextInput);
const StyledPicker = styled(RNPickerSelect);

export {
    StyledImage,
    StyledText,
    StyledTouchableOpacity,
    StyledView,
    StyledInput,
    StyledPicker
}