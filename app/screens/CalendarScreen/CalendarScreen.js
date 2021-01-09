import React, { useEffect, useMemo, useState } from 'react';
import {
	Alert,
	View,
	Modal
} from 'react-native';

import styles from './styles';
import defaultStyles from '../../config/styles';
import colors from '../../config/colors';
import { useDispatch, useSelector } from 'react-redux';
import Screen from '../../components/Screen';
import AppFooter from '../../components/AppFooter';
import { Calendar } from 'react-native-big-calendar'
import * as Yup from "yup";
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppTextInput from '../../components/AppTextInput';
import { dateToFullHour, fullHourWithDateToDate, getDayNum, getFirstDayOfWeek } from '../../functions/DateFunctions';
import _ from "lodash";
import { postRequest } from '../../functions/MakeApiCall';
import * as ACTIONS from "../../store/actions/actions";

function CalendarScreen({ history }) {

	const dispatch = useDispatch();

	const userObj = useSelector(state => state.user.obj);
	const token = useSelector(state => state.user.token);

	const [events, setEvents] = useState(getEvents());
	const [tempEvent, setTempEvent] = useState({});
	const [modalVisible, setModalVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loadingDelete, setLoadingDelete] = useState(false);
	const [saveError, setSaveError] = useState("");

	useEffect(() => {
		setEvents(getEvents());
	}, [userObj])

	function getEvents() {
		let newEvents = [];
		let allCalendarElement = _.get(userObj, "objCalendar.setCalendarElement", []);

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

	function deleteEvent() {
		let newAllCalendarElement = [];
		let allCalendarElement = _.get(userObj, "objCalendar.setCalendarElement", []);
		allCalendarElement.forEach((calendarElement) => {
			if(calendarElement.idCalendarElement !== tempEvent.idCalendarElement) {
				newAllCalendarElement.push({ ...calendarElement })
			}
		})

		let body = {
			...userObj,
			objCalendar: {
				...userObj.objCalendar,
				setCalendarElement: [ ...newAllCalendarElement ]
			}
		};
		setLoadingDelete(true);
		postRequest('user/save-user', body, token).then((response) => {
			let allParts = response.data;
			let token = allParts.token;
			let user = allParts.user;
			dispatch(ACTIONS.SAVE_USER('ALL', {
				token: token,
				obj: user
			}))
			setSaveError('');
			setModalVisible(false)
			setLoadingDelete(false);
			setTempEvent({});
		}).catch((err) => {
			let msg = _.get(err.response, "data.message", "An internal error has occured");
			setSaveError(msg);
			setLoadingDelete(false);
		})
	}

	function save() {
		let newAllCalendarElement = [];
		let allCalendarElement = _.get(userObj, "objCalendar.setCalendarElement", []);
		if(tempEvent.idCalendarElement) {
			allCalendarElement.forEach((calendarElement) => {
				if(calendarElement.idCalendarElement === tempEvent.idCalendarElement) {
					newAllCalendarElement.push({ ...tempEvent });
				} else {
					newAllCalendarElement.push({ ...calendarElement })
				}
			})
		} else {
			newAllCalendarElement = [ ...allCalendarElement ];
			newAllCalendarElement.push({ ...tempEvent });
		}
		let body = {
			...userObj,
			objCalendar: {
				...userObj.objCalendar,
				setCalendarElement: [ ...newAllCalendarElement ]
			}
		};
		setLoading(true);
		postRequest('user/save-user', body, token).then((response) => {
			let allParts = response.data;
			let token = allParts.token;
			let user = allParts.user;
			dispatch(ACTIONS.SAVE_USER('ALL', {
				token: token,
				obj: user
			}))
			setSaveError('');
			setLoading(false);
			setTempEvent({});
			setModalVisible(false)
		}).catch((err) => {
			let msg = _.get(err.response, "data.message", "An internal error has occured");
			setSaveError(msg);
			setLoading(false);
		})
	}

	return (
		<>
			<Screen>
				<Calendar
					events={events}
					height={600}
					hideNowIndicator
					weekStartsOn={1}
					onPressCell={(date) => {
						let fullHour = dateToFullHour(date);
						setTempEvent({
							...tempEvent,
							date: date,
							fromTime: fullHour,
							toTime: fullHour,
							dayNum: getDayNum(date)
						});
						setModalVisible(true);
					}}
					onPressEvent={(event) => {
						setTempEvent({
							...event,
							date: new Date(event.start),
							fromTime: dateToFullHour(new Date(event.start)),
							toTime: dateToFullHour(new Date(event.end)),
							dayNum: getDayNum(new Date(event.start))
						});
						setModalVisible(true);
					}}
					swipeEnabled={false}
				/>
				<Modal
                    visible={modalVisible}
                    animationType="slide"
                >
                    <Screen style={styles.formContainer}>
						<View style={styles.containerItem}>
							<AppText>
								From
							</AppText>
							<DateTimePicker
								testID="dateTimePickerFrom"
								value={fullHourWithDateToDate(tempEvent.fromTime, tempEvent.date)}
								mode="time"
								is24Hour={true}
								display="inline"
								onChange={(ev, date) => {
									setTempEvent({
										...tempEvent,
										fromTime: dateToFullHour(date)
									})
								}}
							/>
						</View>
						<View style={styles.containerItem}>
							<AppText>
								To
							</AppText>
							<DateTimePicker
								testID="dateTimePickerTo"
								value={fullHourWithDateToDate(tempEvent.toTime, tempEvent.date)}
								mode="time"
								is24Hour={true}
								display="inline"
								onChange={(ev, date) => {
									setTempEvent({
										...tempEvent,
										toTime: dateToFullHour(date)
									})
								}}
							/>
						</View>
						<View style={styles.containerItem}>
							<AppTextInput
								placeholder="Title"
								value={tempEvent.title}
								onChangeText={(text) => {
									setTempEvent({
										...tempEvent,
										title: text
									})
								}}
							/>
						</View>
						<View style={styles.buttonContainer}>
							<AppButton
								title="Back"
								color="secondary"
								style={{width: '45%'}}
								onPress={() => {
									setSaveError('');
									setModalVisible(false);
								}}
							/>
							<AppButton
								title="Save"
								style={{width: '45%'}}
								onPress={() => save()}
								loading={loading}
							/>	
						</View>
						<AppText style={styles.saveError}>
							{saveError}
						</AppText>
						<View style={styles.buttonContainer}>
							<AppButton
								title="Delete Event"
								color="danger"
								style={{width: '90%'}}
								onPress={() => 
									Alert.alert("Delete event", "Are you sure you want to delete this event?", [
										{
											text: "Cancel"
										},
										{
											text: "Confirm", onPress: () => deleteEvent()
										}
									])
								}
								loading={loadingDelete}
							/>
						</View>
                    </Screen>
                </Modal>
            </Screen>
			<AppFooter
				history={history}
				screen="calendar"
			/>
		</>
	);
}

export default CalendarScreen;