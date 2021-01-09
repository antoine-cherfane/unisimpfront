import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import styles from './styles';
import colors from '../../config/colors';
import AppText from '../AppText';
import Icon from '../Icon';

function Card({title, subTitle, image, icon, iconColor, filledIcon, filledIconColor, filled, onIconPress, detailsContainerStyle}) {
    return (
        <View style={styles.card}>
            {image && 
                <Image 
                    style={styles.image}
                    source={{
                        uri: image
                    }}
                />
            }
            <View style={styles.container}>
                {icon && (
                    <TouchableOpacity onPress={onIconPress}>
                        <Icon
                            size={80}
                            name={filled ? filledIcon : icon}
                            iconColor={filled ? filledIconColor : iconColor}
                            backgroundColor={colors.white}
                            style={styles.icon}
                        />
                    </TouchableOpacity>

                )}
                <View style={[styles.detailsContainer, detailsContainerStyle]}>
                    <AppText
                        style={styles.title}
                        numberOfLines={1}
                    >
                        {title}
                    </AppText>
                    <AppText
                        style={styles.subTitle}
                        numberOfLines={2}
                    >
                        {subTitle}
                    </AppText>
                </View>
            </View>


        </View>
    );
}

export default Card;