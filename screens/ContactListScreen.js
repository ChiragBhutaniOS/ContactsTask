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


const ContactListScreen = props => {

  const Contacts  = useSelector(state => state.contacts.contacts);

  // Sorting list in ascending order
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

  // Handle add contact button 
  onAddContactPressed = () =>{

    props.navigation.navigate({
      routeName: 'UpdateContact',
      params: {
        indexSelected: -1,
        isEditing : false
      }
      });
  }

  // Render list item for flat list
  const renderContactListItem = itemData =>{
    return(
      <ContactListItem 
        name = {itemData.item.name}
        imageUri = {itemData.item.imageUri}
        onSelect = {() => {
          props.navigation.navigate({
            routeName: 'UpdateContact',
            params: {
              indexSelected: itemData.index,
              isEditing : true
            }
          });
        }
        }
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
};

ContactListScreen.navigationOptions = navData => {
  return{
    headerTitle: 'Contact List',
    headerLeft : (  
      <TouchableOpacity onPress = {() => {
        navData.navigation.toggleDrawer();
      }}>
      <Image source = {require('../images/icon_sidebar.png')}/>
      </TouchableOpacity>          
    )
  }
};

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    TouchableOpacityStyle:{
  
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
    },
   
    FloatingButtonStyle: {
   
      resizeMode: 'contain',
      width: 50,
      height: 50,
      backgroundColor : 'white',
    }
 
  });
  

export default ContactListScreen;