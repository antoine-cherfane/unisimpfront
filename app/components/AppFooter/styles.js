import { StyleSheet } from 'react-native';

import colors from '../../config/colors';

const styles = StyleSheet.create({
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
    }
});

export default styles;