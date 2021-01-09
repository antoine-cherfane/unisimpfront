import React from 'react';
import {
	View
} from 'react-native';

import styles from './styles';
import defaultStyles from '../../../config/styles';
import colors from '../../../config/colors';
import AppText from '../../AppText';

function ErrorMessage({ error, visible }) {

	if(!visible || !error) return null;

	return (
		<AppText
			style={styles.error}
		>
			{error}
		</AppText>
	);
}

export default ErrorMessage;