import React from "react";
import { 
    View,
    Image,
    TouchableOpacity
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import styles from "./styles";
import AppText from "../../AppText";
import colors from "../../../config/colors";

function ListItem({
    title,
    subTitle,
    image,
    IconComponent,
    onPress,
    renderRightActions,
}) {
    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableOpacity underlayColor={colors.light} onPress={onPress}>
                <View style={styles.container}>
                    {IconComponent}
                    {image && 
                        <Image 
                            style={styles.image}
                            source={{
                                uri: image
                            }}
                        />
                    }
                    <View style={styles.detailsContainer}>
                        <AppText style={styles.title} numberOfLines={1}>
                            {title}
                        </AppText>
                        {subTitle && (
                            <AppText style={styles.subTitle} numberOfLines={2}>
                                {subTitle}
                            </AppText>
                        )}
                    </View>
                    {onPress && (
                        <MaterialCommunityIcons
                            color={colors.medium}
                            name="chevron-right"
                            size={25}
                        />
                    )}
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
}

export default ListItem;
