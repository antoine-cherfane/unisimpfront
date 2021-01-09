import { StyleSheet } from 'react-native';

import colors from '../../config/colors';

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    screen: {
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignContent: 'center'
    },
    containerItem: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 15,
        marginVertical:  15,
        backgroundColor: colors.white
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    formContainer: {
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignContent: 'center'
    },
    updateError: {
        color: 'red',
        textAlign: 'center'
    }
});

export default styles;