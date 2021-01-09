import React from 'react';
import {
	View, TouchableOpacity
} from 'react-native';

import styles from './styles';
import defaultStyles from '../../config/styles';
import colors from '../../config/colors';
import Icon from '../Icon';

function AppFooter({ history, screen }) {
	return (
		<View style={styles.mainContainer}>
			<View style={styles.container}>
				<>
					<TouchableOpacity
						onPress={() => history.push('/calendar')}
						style={styles.box}
					>
						<Icon
							name={screen === 'calendar'?
								"calendar"
								:
								"calendar-outline"
							}
							backgroundColor={colors.footer}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => history.push('/account')}
						style={styles.box}
					>
						<Icon
							name={screen === 'account'?
								"account"
								:
								"account-outline"
							}
							backgroundColor={colors.footer}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => history.push('/settings')}
						style={styles.box}
					>
						<Icon
							name={screen === 'settings'?
								"settings"
								:
								"settings-outline"
							}
							backgroundColor={colors.footer}
						/>
					</TouchableOpacity>
				</>
			</View>
		</View>
	);
}

export default AppFooter;