import { StyleSheet } from 'react-native';

import colors from '../../../config/colors';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        backgroundColor: colors.white
    },
    detailsContainer: {
        marginLeft: 10,
        justifyContent: 'center',
        flex: 1
    },
    image: {
        width: 40,
        height: 40,
        resizeMode: "stretch",
        borderRadius: 20
    },
    title: {
        fontWeight: '500'
    },
    subTitle: {
        color: colors.medium
    }
}); 

export default styles;