import { StyleSheet } from 'react-native';

import colors from '../../config/colors';

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    },
    screen: {
        backgroundColor: colors.background
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20
    },
    formContainer: {
        padding: 10,
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