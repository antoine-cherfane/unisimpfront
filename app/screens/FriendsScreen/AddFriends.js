import React, { useEffect, useState } from 'react'
import { Text, View, FlatList, Alert } from 'react-native'
import { useSelector } from 'react-redux'
import AppLoading from '../../components/AppLoading';
import AppText from '../../components/AppText';
import Icon from '../../components/Icon';
import { ListItem, ListItemSeperator } from '../../components/lists';
import { FILE_IP } from '../../constants/FILE_IP';
import { getRequest, postRequest } from '../../functions/MakeApiCall';
import styles from './styles';
import colors from '../../config/colors';
import _ from "lodash"

export default function AddFriends({ searchText }) {

    const token = useSelector(state => state.user.token);
    const userObj = useSelector(state => state.user.obj);

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [firstRefresh, setFirstRefresh] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {
        setFilteredUsers(getFilteredUsers());
    }, [allUsers, searchText])

    function getUsers() {
        setRefreshing(true);
        getRequest('user/get-all-filtered-users', token).then((response) => {
            setAllUsers(response.data);
            setRefreshing(false);
            if(firstRefresh) setFirstRefresh(false);
        }).catch((e) => {
            let msg = _.get(e.response, "data.message", "An internal error has occured")
            setRefreshing(false);
            if(firstRefresh) setFirstRefresh(false);
		});
    }

    function getFilteredUsers() {
        return allUsers.filter((user) => !searchText || user.username.toLowerCase().includes(searchText.toLowerCase()))
    }

    function sendFriendRequest(user) {
        let body = {
            idUserTo: user.idUser,
            idUserFrom: userObj.idUser,
            paramRelationType: {
                idParameter: 1
            }
        }
        setRefreshing(true);
        postRequest('relation/save-relation', body, token).then((response) => {
            getUsers();
        }).catch((e) => {
            setRefreshing(false);
		});
    }

    return (
        <View>
            {firstRefresh && refreshing?
                <View style={styles.centerText}>
                    <AppLoading loading={refreshing} />
                </View>
                    :
                <FlatList
                    data={filteredUsers}
                    keyExtractor={user => user.idUser.toString()}
                    renderItem={({ item }) => {
                        if(item?.picturePath) {
                            return (
                                <>
                                    <ListItem
                                        title={item?.username}
                                        subTitle={"Member since " + item?.createdAt}
                                        image={FILE_IP + item?.picturePath}
                                        onPress={() => {
                                            Alert.alert("Friend Request", "Are you sure you want to send a friend request to " + item.username + "?", [
                                                {
                                                    text: "Cancel"
                                                },
                                                {
                                                    text: "Confirm", onPress: () => sendFriendRequest(item)
                                                }
                                            ])
                                        }}
                                    />
                                    <ListItemSeperator />
                                </>
                            )
                        } else {
                            return (
                                <>
                                    <ListItem
                                        title={item?.username}
                                        subTitle={"Member since " + item?.createdAt}
                                        IconComponent={
                                            <Icon
                                                name="account"
                                                backgroundColor={colors.primary}
                                            />
                                        }
                                        onPress={() => {
                                            Alert.alert("Friend Request", "Are you sure you want to send a friend request to " + item.username + "?", [
                                                {
                                                    text: "Cancel"
                                                },
                                                {
                                                    text: "Confirm", onPress: () => sendFriendRequest(item)
                                                }
                                            ])
                                        }}
                                    />
                                    <ListItemSeperator />
                                </>
                            )
                        }
                    }}
                    refreshing={refreshing}
                    onRefresh={() => {
                        getUsers();
                    }}
                    contentContainerStyle={filteredUsers.length === 0 && styles.centerText}
                    ListEmptyComponent={
                        <AppText>
                            There are no users !
                        </AppText>
                    }
                />
            }
        </View>
    )
}
