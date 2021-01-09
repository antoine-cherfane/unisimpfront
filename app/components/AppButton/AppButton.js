import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import colors from '../../config/colors';
import styles from './styles';
import Icon from '../Icon';
import AppLoading from '../AppLoading';

function AppButton({ title, onPress, style, color = "primary", loading = false }) {
    return (
        <TouchableOpacity
            style={[styles.button, style, { backgroundColor: colors[color]}]}
            onPress={onPress}
        >
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {title}
                </Text>
            </View>
            {loading && (
                <AppLoading loading={loading} style={styles.loading}/>
            )}
        </TouchableOpacity>
    );
}

export default AppButton;