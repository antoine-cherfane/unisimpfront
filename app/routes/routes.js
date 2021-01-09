// Screens
import AccountScreen from '../screens/AccountScreen/AccountScreen';
import CalendarScreen from '../screens/CalendarScreen/CalendarScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import FriendsScreen from '../screens/FriendsScreen/FriendsScreen';

export default routes = [
    {
        path: "/",
        component: HomeScreen
    },
    {
        path: "/login",
        component: LoginScreen
    },
    {
        path: "/register",
        component: RegisterScreen
    },
    {
        path: "/account",
        component: AccountScreen
    },
    {
        path: "/settings",
        component: SettingsScreen
    },
    {
        path: "/calendar",
        component: CalendarScreen
    },
    {
        path: "/friends",
        component: FriendsScreen
    }
];
