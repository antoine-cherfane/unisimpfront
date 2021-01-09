import { StyleSheet } from 'react-native';

import colors from '../../config/colors';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    buttonsContainer: {
        padding: 20,
        width: '100%'
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        position: 'absolute',
        alignItems: 'center',
        top: 100
    },
    tagline: {
        fontSize: 25,
        fontWeight: '600',
        paddingVertical: 20,
        color: colors.white
    }
});

export default styles;