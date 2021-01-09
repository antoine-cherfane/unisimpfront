import React, { useEffect } from 'react';
import { NativeRouter, Switch, Route } from 'react-router-native';
import { useSelector } from 'react-redux';
import Constants from 'expo-constants';
import * as Permissions from "expo-permissions";
import * as Notifications from 'expo-notifications';
import { dateToFullHour, fullHourWithDateToDate, getDayNum, getFirstDayOfWeek } from './app/functions/DateFunctions';
import _ from "lodash";

import routes from './app/routes';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
});

async function schedulePushNotification(title, notifyBefore, trigger) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "UniSimp Reminder",
            body: "Votre cours de " + title + " va commencer dans " + notifyBefore + " minutes !"
        },
        trigger: trigger,
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

export default function AppMain() {

    const userObj = useSelector(state => state.user.obj);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => console.log(token));
    }, []);
    
    useEffect(() => {
        clearNotifications();
        addNotifications();
    }, [userObj]);

    async function clearNotifications() {
        await Notifications.cancelAllScheduledNotificationsAsync();
    }

    async function addNotifications() {
        let notifyBefore = userObj.notifyBefore;
		let allCalendarElement = _.get(userObj, "objCalendar.setCalendarElement", []);

        let today = new Date();
		let isSunday = today.getDay() === 0;
		let weekNum = isSunday? 1 : 0; 
		let relatedMonday = getFirstDayOfWeek(weekNum);

		for(let i = 0; i < allCalendarElement.length; i++) {
            let calendarElement = allCalendarElement[i];
			let day = new Date();
            day.setDate(relatedMonday.getDate() + calendarElement.dayNum - 1);

            let startDate = fullHourWithDateToDate(calendarElement.fromTime, day);
            
            let trigger = new Date(startDate.getTime());
            trigger.setMinutes(trigger.getMinutes() - notifyBefore);
            if(trigger < today) {
                trigger.setDate(trigger.getDate() + 7);
            }

            await schedulePushNotification(calendarElement.title, notifyBefore, trigger);
        }
    }

    return (
        <NativeRouter>
            <Switch>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        exact
                        path={route.path}
                        component={props => (
                            <route.component {...props} />
                        )}
                    />
                ))}
            </Switch>
        </NativeRouter>
    )
}
