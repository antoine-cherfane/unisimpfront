import React from 'react';
import { 
    View,
    TouchableWithoutFeedback
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from './styles';
import AppText from '../../AppText';
import colors from '../../../config/colors';

function ListItemDeleteAction({ onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View
                style={styles.container}
            >
                <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={20}
                    color={colors.white}
                />
            </View>  
        </TouchableWithoutFeedback>      
        
    );
}

export default ListItemDeleteAction;