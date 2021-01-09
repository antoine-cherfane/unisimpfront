import React, { createRef } from 'react';
import { Text,
    View,
    Image,
    TextInput,
    TouchableWithoutFeedback
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from './styles';
import defaultStyles from '../../config/styles';

function AppTextInput({ icon, width = '100%', ...otherProps }) {
    
    const inputRef = createRef();

    return (
        <TouchableWithoutFeedback onPress={() => {
            const textInput = inputRef.current;
            textInput.focus();
        }}> 
            <View style={[styles.container, { width }]}>
                {icon && (
                    <MaterialCommunityIcons
                        name={icon}
                        size={20}
                        color={defaultStyles.colors.medium}
                        style={styles.icon}
                    />
                )}
                    <TextInput
                        ref={inputRef}
                        placeholderTextColor={defaultStyles.colors.medium}
                        style={[defaultStyles.text, { width: '85%'}]}
                        {...otherProps}
                    />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default AppTextInput;