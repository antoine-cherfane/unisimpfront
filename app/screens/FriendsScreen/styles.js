import { StyleSheet } from 'react-native';

import colors from '../../config/colors';

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.background
    },
    formContainer: {
        padding: 10,
        backgroundColor: colors.white,
        alignContent: 'center'
    },
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20
    },
    box: {
        backgroundColor: colors.footer,
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: colors.footer,
        width: '100%',
        height: 75,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'space-between',
    },
    mainContainer: {
        paddingHorizontal: 50,
        backgroundColor: colors.footer
    },
    seperator: {
        backgroundColor: colors.medium,
        width: 1,
        height: 75
    },
    centerText: {
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    midText: {
        alignItems: 'center',
        marginBottom: 10
    },
    midButton: {
        alignItems: 'center'
    }
});

export default styles;