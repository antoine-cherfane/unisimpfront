import { StyleSheet } from 'react-native';

import colors from '../../config/colors';

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    container: {
        padding: 10,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignContent: 'center'
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20
    },
    loginError: {
        color: 'red',
        textAlign: 'center'
    }
});

export default styles;