
import ContactListScreen from '../screens/ContactListScreen';
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
          drawerLabel: 'Contact list screen'
        }
      },
      Favorite: {
        screen: FavContactsNavigator,
        navigationOptions: {
          drawerLabel: 'Favorite list'
        }
      }
    },
    {
      contentOptions: {
        activeTintColor: Colors.accentColor      }
    }
  );

export default createAppContainer(MainNavigator);