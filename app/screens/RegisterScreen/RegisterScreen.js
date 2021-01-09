import React, { useState } from 'react';
import {
	View
} from 'react-native';
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import styles from './styles';
import defaultStyles from '../../config/styles';
import colors from '../../config/colors';
import Screen from "../../components/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../../components/forms";
import AppButton from '../../components/AppButton';
import { postRequest } from '../../functions/MakeApiCall';
import AppText from '../../components/AppText';
import * as ACTIONS from '../../store/actions/actions';
import _ from "lodash";

const validationSchema = Yup.object().shape({
	username: Yup.string().required().label("Username"),
	password: Yup.string().required().label("Password"),
	password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});  

function RegisterScreen({ history }) {

	const dispatch = useDispatch();

	const [registerError, setRegisterError] = useState('');
	const [loading, setLoading] = useState(false);

	function register(values)
    {
		let body = { ...values };
		delete body.password_confirmation;

		setLoading(true);
		setRegisterError('');
		postRequest('auth/register', body).then((response) => {
			let allData = response.data;
            let token = allData.token;
			let user = allData.user;
			
			dispatch(ACTIONS.SAVE_USER('ALL', {
				token: token,
				obj: user
			}));
			history.push("/account");
		})
		.catch((e) => {
			console.log(e);
			let msg = _.get(e.response, "data.message", "An internal error has occured")
			setRegisterError(msg);
			setLoading(false);
		});
    }

	return (
		<Screen style={styles.container}>
            <Form
                initialValues={{
					username: "",
                    password: "",
                    password_confirmation: "",
                }}
                onSubmit={(values) => register(values)}
                validationSchema={validationSchema}
            >
                <FormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="account"
                    name="username"
                    placeholder="Username"
                />
				<FormField
					autoCapitalize="none"
					autoCorrect={false}
					icon="lock"
					name="password"
					placeholder="Password"
					secureTextEntry
					textContentType="password"
				/>
				<FormField
					autoCapitalize="none"
					autoCorrect={false}
					icon="lock"
					name="password_confirmation"
					placeholder="Password Confirmation"
					secureTextEntry
					textContentType="password"
				/>
				<View
                    style={styles.buttonContainer}
                >
                    <AppButton
                        title="Back"
                        color="secondary"
                        style={{width: '45%'}}
                        onPress={() => history.push('/')}
                    />
					<SubmitButton
						title="Register"
						style={{width: '45%'}}
						loading={loading}
					/>
                </View>
				<AppText
					style={styles.registerError}
				>
					{registerError}
				</AppText>
            </Form>
        </Screen>
	);
}

export default RegisterScreen;