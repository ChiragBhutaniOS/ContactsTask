import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';


import ContactsNavigator from './navigation/ContactsNavigator'
import contactsReducer from './store/reducers/Contacts';

const rootReducer = combineReducers({
  contacts: contactsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


export default function App() {

  return(
    <Provider store={store}>
    <ContactsNavigator/>
  </Provider>

  )
}




const styles = StyleSheet.create({
  
});
