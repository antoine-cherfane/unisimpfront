import { StyleSheet } from 'react-native';

import colors from '../../config/colors';

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
        overflow: 'hidden',
    },
    container: {
        flexDirection: 'row'
    },
    detailsContainer: {
        paddingVertical: 20
    },
    icon: {
        
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'stretch'
    },
    subTitle: {
        color: colors.medium
    },
    title: {
        marginBottom: 7
    }
}); 

export default styles;