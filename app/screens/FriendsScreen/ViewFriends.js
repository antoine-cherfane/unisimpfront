import React, { useEffect, useState } from 'react'
import { Text, View, FlatList, Modal } from 'react-native'
import { useSelector } from 'react-redux'
import AppLoading from '../../components/AppLoading';
import AppText from '../../components/AppText';
import Icon from '../../components/Icon';
import { ListItem, ListItemDeleteAction, ListItemSeperator } from '../../components/lists';
import { FILE_IP } from '../../constants/FILE_IP';
import { deleteRequest, getRequest, postRequest } from '../../functions/MakeApiCall';
import styles from './styles';
import colors from '../../config/colors';
import { Alert } from 'react-native';
import Screen from '../../components/Screen';
import { Avatar } from 'react-native-elements';
import { Calendar } from 'react-native-big-calendar';
import _ from "lodash";
import AppButton from '../../components/AppButton';
import { dateToFullHour, fullHourWithDateToDate, getDayNum, getFirstDayOfWeek } from '../../functions/DateFunctions';

export default function ViewFriends({ searchText }) {

    const token = useSelector(state => state.user.token);
    const userObj = useSelector(state => state.user.obj);

    const [allRelations, setAllRelations] = useState([]);
    const [filteredRelations, setFilteredRelations] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [firstRefresh, setFirstRefresh] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [userView, setUserView] = useState({});
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getRelations();
    }, [])

    useEffect(() => {
        setFilteredRelations(getFilteredRelations());
    }, [allRelations, allUsers, searchText])

    useEffect(() => {
		setEvents(getEvents());
	}, [userView])

    function getRelations() {
        setRefreshing(true);
        getRequest('relation/get-all-relations', token).then((response) => {
            let allData = response.data;
            setAllRelations(allData.relations);
            setAllUsers(allData.users);
            setRefreshing(false);
            if(firstRefresh) setFirstRefresh(false);
        }).catch((e) => {
            let msg = _.get(e.response, "data.message", "An internal error has occured")
            setRefreshing(false);
            if(firstRefresh) setFirstRefresh(false);
		});
    }

    function getFilteredRelations() {
        let newFilteredRelations = [];
        if(!searchText) {
            newFilteredRelations = [ ...allRelations ];
        } else {
            allRelations.forEach((relation) => {
                let otherUserID = relation.idUserFrom === userObj.idUser? relation.idUserTo : relation.idUserFrom;
                let user = allUsers.find((user) => user.idUser === otherUserID);
                if(user && user.username.toLowerCase().includes(searchText.toLowerCase())) {
                    newFilteredRelations.push(relation);
                }
            })
        }
        return newFilteredRelations.sort((r1, r2) => r2.paramRelationType.idParameter - r1.paramRelationType.idParameter);
    }

    function deleteRelation(relation)
	{
        setRefreshing(true);
		let relationID = relation.idRelation;
		deleteRequest('relation/delete-relation/' + relationID, token).then((response) => {
			setAllRelations(allRelations.filter((relation) => relation.idRelation !== relationID));
		}).catch((e) => {
            let msg = _.get(e.response, "data.message", "An internal error has occured")
            setRefreshing(false);
		})
    }
    
    function getSubTitle(relation) {
        let subTitle = "";
        if(relation?.paramRelationType?.idParameter === 1 && relation?.idUserTo === userObj.idUser) {
            subTitle = "Friend Request Received";
        }
        
        if(!subTitle) {
            subTitle = relation?.paramRelationType?.value;
        }

        return subTitle;
    }

    function getOnPress(relation) {
        let otherUserID = relation.idUserFrom === userObj.idUser? relation.idUserTo : relation.idUserFrom;
        let user = allUsers.find((user) => user.idUser === otherUserID);
        if(relation?.paramRelationType?.idParameter === 2) {
            return () => {
                setModalVisible(true);
                setUserView(user);
            }
        } else if(relation?.paramRelationType?.idParameter === 1) {
            let alertText = "";
            let onPress = undefined;
            if(relation?.idUserTo === userObj.idUser) {
                alertText = "Are you sure you want to add " + user?.username + " as a friend?";
                onPress = () => acceptFriendRequest(relation)
            } else {
                alertText = "Are you sure you want to cancel your friend request sent to " + user?.username + "?";
                onPress = () => deleteRelation(relation)
            }
            return () => Alert.alert("Friend Request", alertText, [
                {
                    text: "Cancel"
                },
                {
                    text: "Confirm", onPress: onPress
                }
            ])
        }
    }

    function acceptFriendRequest(relation) {
        let body = {
            ...relation,
            paramRelationType: {
                idParameter: 2
            }
        }
        setRefreshing(true);
        postRequest('relation/save-relation', body, token).then((response) => {
            getRelations();
        }).catch((e) => {
            setRefreshing(false);
		});
    }

	function getEvents() {
		let newEvents = [];
		let allCalendarElement = _.get(userView, "objCalendar.setCalendarElement", []);

		let isSunday = new Date().getDay() === 0;
		let weekNum = isSunday? 1 : 0; 
		let relatedMonday = getFirstDayOfWeek(weekNum);

		allCalendarElement.forEach((calendarElement) => {
			let day = new Date();
			day.setDate(relatedMonday.getDate() + calendarElement.dayNum - 1);

			newEvents.push({
				idCalendarElement: calendarElement.idCalendarElement,
				title: calendarElement.title,
				start: fullHourWithDateToDate(calendarElement.fromTime, day),
				end: fullHourWithDateToDate(calendarElement.toTime, day)
			})
		})
		return newEvents;
	}

    return (
        <View>
            {firstRefresh && refreshing?
                <View style={styles.centerText}>
                    <AppLoading loading={refreshing} />
                </View>
                    :
                <FlatList
                    data={filteredRelations}
                    keyExtractor={relation => relation.idRelation.toString()}
                    renderItem={({ item }) => {
                        let otherUserID = item.idUserFrom === userObj.idUser? item.idUserTo : item.idUserFrom;
                        let user = allUsers.find((user) => user.idUser === otherUserID);
                        let subTitle = getSubTitle(item);
                        if(user?.picturePath) {
                            return (
                                <>
                                    <ListItem
                                        title={user?.username}
                                        subTitle={subTitle}
                                        image={FILE_IP + user?.picturePath}
                                        renderRightActions={ () => 
                                            <ListItemDeleteAction onPress={() => deleteRelation(item)} />
                                        }
                                        onPress={getOnPress(item)}
                                    />
                                    <ListItemSeperator />
                                </>
                            )
                        } else {
                            return (
                                <>
                                    <ListItem
                                        title={user?.username}
                                        subTitle={subTitle}
                                        IconComponent={
                                            <Icon
                                                name="account"
                                                backgroundColor={colors.primary}
                                            />
                                        }
                                        renderRightActions={ () => 
                                            <ListItemDeleteAction onPress={() => deleteRelation(item)} />
                                        }
                                        onPress={getOnPress(item)}
                                    />
                                    <ListItemSeperator />
                                </>
                            )
                        }
                    }}
                    refreshing={refreshing}
                    onRefresh={() => {
                        getRelations();
                    }}
                    contentContainerStyle={filteredRelations.length === 0 && styles.centerText}
                    ListEmptyComponent={
                        <AppText>
                            You don't have any friends !
                        </AppText>
                    }
                />
            }
            <Modal
                visible={modalVisible}
                animationType="slide"
            >
                <Screen style={styles.formContainer}>
                    <View style={styles.avatarContainer}>
                        {userView.picturePath?
                            <Avatar
                                size="large"
                                rounded
                                source={{
                                    uri: FILE_IP + userView.picturePath 
                                }}
                                activeOpacity={0.7}
                            />
                            :
                            <Avatar
                                size="large"
                                icon={{ name: 'person' }}
                                overlayContainerStyle={{backgroundColor: colors.primary}}
                                rounded
                                activeOpacity={0.7}
                            />
                        }
                    </View>
                    <View style={styles.midText}>
                        <AppText>
                            {userView.username}
                        </AppText>
                    </View>
                    {!userView.isPrivate && (
                        <Calendar
                            events={events}
                            height={600}
                            hideNowIndicator
                            weekStartsOn={1}
                            swipeEnabled={false}
                        />
                    )}
                    <View style={styles.midButton}>
                        <AppButton
                            title="Back"
                            color="secondary"
                            style={{width: '90%'}}
                            onPress={() => {
                                setUserView({});
                                setModalVisible(false)
                            }}
                        />
                    </View>
                </Screen>
            </Modal>
        </View>
    )
}
