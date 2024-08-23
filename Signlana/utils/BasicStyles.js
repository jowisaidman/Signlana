import { StyleSheet } from 'react-native';

const basicStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9945FF',
    },
    touchOpacityButton: {
        marginBottom: 25,
        width: '80%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#00FFA3',
        borderRadius: 10
    },
    text: {
        color: "#000000",
        fontWeight: 'bold',
        fontSize: 16
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: '20%',
    },
});

export default basicStyles;