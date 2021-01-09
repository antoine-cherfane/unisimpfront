import React from 'react';
import {
	View,
	ActivityIndicator
} from 'react-native';

import styles from './styles';
import defaultStyles from '../../config/styles';
import colors from '../../config/colors';

function AppLoading({ loading, style }) {
	return (
		<View style={style}>
			
			<ActivityIndicator
				size="small"
				color={colors.medium}
				animating={loading}
			/>
		</View>
	);
}

export default AppLoading;