import React, { useState, useDebugValue } from "react";
import { View } from "react-native";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import styles from "./styles";
import defaultStyles from "../../config/styles";
import colors from "../../config/colors";
import Screen from "../../components/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../../components/forms";
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import { postRequest } from "../../functions/MakeApiCall";
import * as ACTIONS from '../../store/actions/actions';
import _ from "lodash";


const validationSchema = Yup.object().shape({
    username: Yup.string().required().label("Username"),
    password: Yup.string().required().label("Password"),
});

function LoginScreen({ history }) {

    const dispatch = useDispatch();

    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);

    function login(values)
    {
        setLoginError('');
        setLoading(true);
		postRequest('auth/login', values).then((response) => {
            let allData = response.data;
            let token = allData.token;
            let user = allData.user;
            dispatch(ACTIONS.SAVE_USER('ALL', {
                token: token,
                obj: user
            }));
            history.push('/account');
		})
		.catch((e) => {
            let msg = _.get(e.response, "data.message", "An internal error has occured")
			setLoginError(msg);
            setLoading(false);
		});
    }

    return (
        <Screen style={styles.container}>
            <Form
                initialValues={{
                    username: "",
                    password: "",
                }}
                onSubmit={(values) => login(values)}
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
                        title="Login"
                        loading={loading}
                        style={{width: '45%'}}
                    />
                </View>
                <AppText style={styles.loginError}>
					{loginError}
				</AppText>
            </Form>
        </Screen>
    );
}

export default LoginScreen;
