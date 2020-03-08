import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';

import ContactListItem from '../components/ContactListItem';


const FavContactListScreen = props => {

  const Contacts  = useSelector(state => state.contacts.favContacts);

  const compare = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
  
    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }

  const renderContactListItem = itemData =>{
    return(
      <ContactListItem 
        name = {itemData.item.name}
        imageUri = {itemData.item.imageUri}
      />
    )
  }

    return(
      <View>
        <FlatList
        keyExtractor={(item, index) => item.id.toString()}
        data={Contacts.sort(compare)}
        renderItem={renderContactListItem}
        />
        <TouchableOpacity activeOpacity={0.5} onPress={onAddContactPressed} style={styles.TouchableOpacityStyle} >
  
        <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}} 
        
        style={styles.FloatingButtonStyle} />
    
      </TouchableOpacity>
    </View>

   )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
 
  FavContactListScreen.navigationOptions = navData => {
    return{
      headerTitle: 'Favorites',
      headerLeft : (  
        <TouchableOpacity onPress = {() => {
          navData.navigation.toggleDrawer();
        }}>
        <Image source = {require('../images/icon_sidebar.png')}/>
        </TouchableOpacity>          
      )
    }
  };
  

export default FavContactListScreen;