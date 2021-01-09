import React from "react";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import _ from "lodash";

import routes from './app/routes';

import { store, persistor } from './app/store';
import AppMain from './AppMain';
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppMain />
            </PersistGate>
        </Provider>
    );
}
