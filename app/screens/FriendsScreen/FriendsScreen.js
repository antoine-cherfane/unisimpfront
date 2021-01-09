import React, { useState } from 'react';
import {
	View, TouchableOpacity
} from 'react-native';

import styles from './styles';
import defaultStyles from '../../config/styles';
import colors from '../../config/colors';
import Icon from '../../components/Icon';
import Screen from '../../components/Screen';
import ViewFriends from './ViewFriends';
import AddFriends from './AddFriends';
import AppTextInput from '../../components/AppTextInput';

function FriendsScreen({ history }) {
	
	const [viewMode, setViewMode] = useState('view');
	const [searchText, setSearchText] = useState('');

	return (
        <>
            <Screen style={styles.screen}>
				<AppTextInput
					onChangeText={(newValue) => setSearchText(newValue)}
					value={searchText}
					width="100%"
                    icon="account-search"
                    placeholder="Search..."
				/>
				{viewMode === 'view'?
					<ViewFriends searchText={searchText} />
					:
					<AddFriends searchText={searchText} />
				}
			</Screen>
			<View style={styles.mainContainer}>
				<View style={styles.container}>
					<>
						<TouchableOpacity
							onPress={() => history.push('/account')}
							style={styles.box}
						>
							<Icon
								name={"chevron-left"}
								backgroundColor={colors.footer}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => setViewMode(oldViewMode => oldViewMode === 'view'? 'add' : 'view')}
							style={styles.box}
						>
							<Icon
								name={viewMode === 'view'?
									"plus"
									:
									"account-group"
								}
								backgroundColor={colors.footer}
							/>
						</TouchableOpacity>
					</>
				</View>
			</View>
		</>
	);
}

export default FriendsScreen;