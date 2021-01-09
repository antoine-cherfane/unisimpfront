import React, { useState } from "react";
import {
    ActivityIndicator,
    Button,
    Image,
    StatusBar,
    Text,
    View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import styles from "./styles";
import AppLoading from "../AppLoading";

function ImageUpload({ image, uploadFunction, uploading}) {

    const _takePhoto = async () => {
        const { status: cameraPerm } = await Permissions.askAsync(
			Permissions.CAMERA
        );

        const { status: cameraRollPerm } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );

        // only if user allows permission to camera AND camera roll
        if (cameraPerm === "granted" && cameraRollPerm === "granted") {
            let pickerResult = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });

            uploadFunction(pickerResult);
        }
    };
	
    const _pickImage = async () => {
        const { status: cameraRollPerm } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
		);
			
        // only if user allows permission to camera roll
        if (cameraRollPerm === "granted") {
            let pickerResult = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
                aspect: [4, 3],
            });
			
            uploadFunction(pickerResult);
        }
    };
	
	return (
		<View style={styles.container}>
			{image && (
				<View style={styles.maybeRenderContainer}>
					<View style={styles.maybeRenderImageContainer}>
						<Image
							source={{ uri: image }}
							style={styles.maybeRenderImage}
						/>
					</View>
				</View>
			)}
			
				<View style={styles.maybeRenderUploading}>
				{uploading && (
						<AppLoading loading={uploading}/>
				)}
				</View>
			
			<View style={styles.buttonContainer}>
				<Button
					onPress={_pickImage}
					title="Pick an image from camera roll"
				/>

				<Button onPress={_takePhoto} title="Take a photo" />
			</View>

		</View>
	);
}

export default ImageUpload;