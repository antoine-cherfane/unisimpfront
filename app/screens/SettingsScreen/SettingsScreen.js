import React, { useEffect, useState } from 'react';
import { 
    View,
    Modal,
    Settings,
    Alert,
	Switch
} from 'react-native';
import * as Yup from "yup";
import { useSelector, useDispatch } from 'react-redux';

import styles from './styles';
import Screen from '../../components/Screen';
import {
    ListItem,
    ListItemSeperator
} from '../../components/lists';
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../../components/forms";
import colors from '../../config/colors';
import Icon from '../../components/Icon';
import * as ACTIONS from '../../store/actions/actions';
import { deleteRequest, postRequest } from '../../functions/MakeApiCall';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import { Picker } from '@react-native-picker/picker';
import _ from "lodash";
import AppTextInput from '../../components/AppTextInput';
import AppFooter from '../../components/AppFooter';

const validationSchema = Yup.object().shape({
    username: Yup.string().required().label("Username")
});

function SettingsScreen({ history }) {

    const dispatch = useDispatch();

    const token = useSelector(state => state.user.token);
    const userObj = useSelector(state => state.user.obj);

    const [errorMessage, setErrorMessage] = useState('');
	const [loading, setLoading] = useState(false);
	
	const [allValues, setAllValues] = useState({});

	useEffect(() => {
		setAllValues({ ...userObj });
	}, [userObj])

    function update()
    {
        setErrorMessage('');
        setLoading(true);
        postRequest('user/save-user', allValues, token).then((response) => {
            let allData = response.data;
            let token = allData.token;
            let user = allData.user;
            dispatch(ACTIONS.SAVE_USER('ALL', {
                token: token,
                obj: user
            }));
            setLoading(false);
		})
		.catch((e) => {
            let msg = _.get(e.response, "data.message", "An internal error has occured")
			setErrorMessage(msg);
            setLoading(false);
		});
    }

    function deleteAccount() {
        setErrorMessage('');
        deleteRequest('user/delete-user/' + userObj.idUser, token).then(() => {
            dispatch(ACTIONS.SAVE_USER('CLEAR'));
            history.push("/");
        })
        .catch((e) => {
            let msg = _.get(e.response, "data.message", "An internal error has occured")
            setErrorMessage(msg);
        });
    }

    return (
        <>
            <Screen style={styles.screen}>
				<View style={styles.containerItem}>
					<AppText>
						Notify before
					</AppText>
					<AppTextInput
						width="13%"
						value={"" + allValues.notifyBefore}
						onChangeText={(newValue) => {
							setAllValues({
								...allValues,
								notifyBefore: newValue
							})
						}}
					/>
				</View>
				<View style={styles.containerItem}>
					<AppText>
						Private account
					</AppText>
					<Switch
						value={allValues.isPrivate}
						onValueChange={(newValue) => setAllValues({
							...allValues,
							isPrivate: newValue
						})}
					/>
				</View>
				<View style={styles.containerItem}>
					<AppText>
						Send email notifications
					</AppText>
					<Switch
						value={allValues.sendEmailNotifications}
						onValueChange={(newValue) => setAllValues({
							...allValues,
							sendEmailNotifications: newValue
						})}
					/>
				</View>
				<View>
					<AppTextInput
						onChangeText={(newValue) => {
							setAllValues({
								...allValues,
								mail: newValue
							})
						}}
						value={allValues.mail || ''}
						width="100%"
						icon="email"
						placeholder="Mail"
					/>
				</View>
                <View style={styles.container}>
					<View
						style={styles.buttonContainer}
					>
						<AppButton
							title="Back"
							color="secondary"
							style={{width: '45%'}}
							onPress={() => history.push('/account')}
						/>
						<AppButton
							title="Save"
							style={{width: '45%'}}
							onPress={() => update()}
							loading={loading}
						/>
					</View>
					<AppText style={styles.updateError}>
						{errorMessage}
					</AppText>
					<View
						style={styles.buttonContainer}
					>
						<AppButton
							title="Delete Account"
							color="danger"
							style={{width: '90%'}}
							onPress={() => 
								Alert.alert("Delete account", "Are you sure you want to delete your account?", [
									{
										text: "Cancel"
									},
									{
										text: "Confirm", onPress: () => deleteAccount()
									}
								])
							}
						/>
					</View>
                </View>
            </Screen>
            <AppFooter
                history={history}
                screen="settings"
            />
        </>
    );
}

export default SettingsScreen;