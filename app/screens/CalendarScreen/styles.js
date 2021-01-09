import { StyleSheet } from 'react-native';

import colors from '../../config/colors';

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.background
    },
    formContainer: {
        padding: 10,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignContent: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    containerItem: {
        paddingBottom: 20,
        paddingHorizontal: 20
    },
    saveError: {
        color: 'red',
        textAlign: 'center'
    }
});

export default styles;