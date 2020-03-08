
import ContactListScreen from '../screens/ContactListScreen';
import AddContactScreen from '../screens/AddContactScreen';
import UpdateContactScreen from '../screens/UpdateContactScreen';
import FavContactListScreen from '../screens/FavContactListScreen';
import Colors from '../constants/Colors'
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';

const defaultStackNavOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitle: ''
  };

const ContactsNavigator = createStackNavigator(
    {
    ContactList : ContactListScreen,
    AddContact : AddContactScreen,
    UpdateContact : UpdateContactScreen
},
{
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const FavContactsNavigator = createStackNavigator(
    {
    favContacts : FavContactListScreen
},
{
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const MainNavigator = createDrawerNavigator(
    {
      contactList: {
        screen: ContactsNavigator,
        navigationOptions: {
          drawerLabel: 'Contacts'
        }
      },
      FavoriteList: FavContactsNavigator
    },
    {
      contentOptions: {
        activeTintColor: Colors.accentColor      }
    }
  );

export default createAppContainer(MainNavigator);