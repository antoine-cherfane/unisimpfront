import React, { useState } from 'react';
import { 
    View,
    Modal,
    Settings,
    Alert
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
import AppFooter from '../../components/AppFooter';
import _ from "lodash";
import { Avatar } from 'react-native-elements';
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { FILE_IP } from '../../constants/FILE_IP';

const validationSchema = Yup.object().shape({
    username: Yup.string().required().label("Username")
});

function AccountScreen({ history }) {

    const dispatch = useDispatch();

    const token = useSelector(state => state.user.token);
    const userObj = useSelector(state => state.user.obj);

    const [modalVisible, setModalVisible] = useState(false);
    const [updateError, setUpdateError] = useState('');
    const [loading, setLoading] = useState(false);
    const [picturePath, setPicturePath] = useState('');

    function update(values)
    {
        setUpdateError('');
        if(values.username === userObj.username)
        {
            let message = "You already have that username !";
            setUpdateError(message);
            return;
        }
        let body = {
            ...userObj,
            ...values
        }

        if(picturePath) {
            body.picturePath = picturePath;
        }

        setLoading(true);
        postRequest('user/save-user', body, token).then((response) => {
            let allData = response.data;
            let token = allData.token;
            let user = allData.user;
            dispatch(ACTIONS.SAVE_USER('ALL', {
                token: token,
                obj: user
            }));
            setLoading(false);
            setModalVisible(false);
		})
		.catch((e) => {
            let msg = _.get(e.response, "data.message", "An internal error has occured")
			setUpdateError(msg);
            setLoading(false);
		});
    }

    function logout() {
        dispatch(ACTIONS.SAVE_USER('CLEAR'));
        history.push('/');
    }

    async function pickImage() {
        const { status: cameraRollPerm } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
		);
			
        // only if user allows permission to camera roll
        if (cameraRollPerm === "granted") {
            let pickerResult = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
                aspect: [16, 9],
            });
			
            imageUpload(pickerResult);
        }
    }

    function imageUpload(result)
	{
		if(result.cancelled) return;
		
        setUpdateError('');
        setLoading(true);

		let imageUri = result.uri;
		let uriParts = result.uri.split(".");
		let fileType = uriParts[uriParts.length - 1];
		
		let imageName = userObj.username + "." + fileType;
		let imageType = 'image/' + fileType;
		let imageObj = {
			uri: imageUri,
			name: imageName,
			type: imageType
		};
		let formdata = new FormData();
		formdata.append('file', imageObj)
		postRequest('document/upload', formdata, token).then((response) => {
            let newPicturePath = response.data.path;
            let body = {
                ...userObj,
                picturePath: newPicturePath 
            }
            postRequest('user/save-user', body, token).then((response) => {
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
                setUpdateError(msg);
                setLoading(false);
            });
		})
        .catch((e) => {
            let msg = _.get(e.response, "data.message", "An internal error has occured")
            setUpdateError(msg);
			setLoading(false);
		});
	}

    return (
        <>
            <Screen style={styles.screen}>
                <View style={styles.container}>
                    {userObj.picturePath?
                        <ListItem
                            title={userObj.username}
                            subTitle={"Member since " + userObj.createdAt}
                            image={FILE_IP + userObj.picturePath}
                            onPress={() => setModalVisible(true)}
                        />
                        :
                        <ListItem
                            title={userObj.username}
                            subTitle={"Member since " + userObj.createdAt}
                            IconComponent={
                                <Icon
                                    name="account"
                                    backgroundColor={colors.primary}
                                />
                            }
                            onPress={() => setModalVisible(true)}
                        />
                    }
                </View>
                <View style={styles.container}>
                    <ListItem
                        title="Friends"
                        IconComponent={
                            <Icon
                                name="account-group"
                                backgroundColor={colors.secondary}
                            />
                        }
                        onPress={() => history.push('/friends')}
                    />
                </View>
                <View style={styles.container}>
                    <ListItem
                        title="Log Out"
                        IconComponent={
                            <Icon
                                name="logout"
                                backgroundColor="#ffe66d"
                            />
                        }
                        onPress={() => logout()}
                    />
                </View>
                
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                >
                    <Screen style={styles.formContainer}>
                        <View style={styles.avatarContainer}>
                            {userObj.picturePath?
                                <Avatar
                                    size="large"
                                    rounded
                                    source={{
                                        uri: FILE_IP + userObj.picturePath 
                                    }}
                                    onPress={pickImage}
                                    activeOpacity={0.7}
                                />
                                :
                                <Avatar
                                    size="large"
                                    icon={{ name: 'person' }}
                                    overlayContainerStyle={{backgroundColor: colors.primary}}
                                    rounded
                                    onPress={pickImage}
                                    activeOpacity={0.7}
                                />
                            }
                        </View>
                        <Form
                            initialValues={{
                                username: ''
                            }}
                            onSubmit={(values) => update(values)}
                            validationSchema={validationSchema}
                        >
                            <FormField
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon="account"
                                name="username"
                                placeholder="Username"
                            />
                            <View style={styles.buttonContainer}>
                                <AppButton
                                    title="Back"
                                    color="secondary"
                                    style={{width: '45%'}}
                                    onPress={() => {
                                        setUpdateError('');
                                        setModalVisible(false)
                                    }}
                                />
                                <SubmitButton
                                    title="Update"
                                    loading={loading}
                                    style={{width: '45%'}}
                                />
                            </View>
                            <AppText style={styles.updateError}>
                                {updateError}
                            </AppText>
                        </Form>
                    </Screen>
                </Modal>
            </Screen>
            <AppFooter
                history={history}
                screen="account"
            />
        </>
    );
}

export default AccountScreen;