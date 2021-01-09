import React from 'react';
import {
	View,
	Text,
	ImageBackground
} from 'react-native';

import styles from './styles';
import defaultStyles from '../../config/styles';
import colors from '../../config/colors';
import Screen from '../../components/Screen';
import AppButton from '../../components/AppButton';

function HomeScreen({ history }) {
	return (
		<ImageBackground
			blurRadius={3}
			style={styles.background}
			source={require("../../assets/background.jpg")}
		>
            <View style={styles.logoContainer}>
                <Text style={styles.tagline}>
                    Your uni life simplified
                </Text>
            </View>
            <View style={styles.buttonsContainer}>
                <AppButton
					title="Login"
					onPress={() => history.push('/login')}
				/>
                <AppButton
					title="Register"
					color="secondary"
					onPress={() => history.push('/register')}
				/>
            </View>
		</ImageBackground>
	);
}

export default HomeScreen;