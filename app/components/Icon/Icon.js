import React from 'react';
import { 
    View,
    Image,
    TouchableHighlight
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from './styles';

function Icon({name, size = 40, backgroundColor = "#000", iconColor = "#fff", style}) {
    if(backgroundColor === "primary" || backgroundColor === "secondary")
    {
        backgroundColor = colors[backgroundColor];
    }

    return (
        <View
            style={[{
                width: size,
                height: size,
                borderRadius: size * 0.5,
                backgroundColor: backgroundColor,
                justifyContent: 'center',
                alignItems: 'center'
            }, style]}
        >
            <MaterialCommunityIcons 
                name={name}
                color={iconColor}
                size={size * 0.5}
            />
        </View>
    );
}

export default Icon;