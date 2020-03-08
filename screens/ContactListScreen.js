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

  // const getContactById = id => {
  //   const contact = Contacts.filter((contact) => {
  //     return id === contact.id;
  //   });
  //   console.log('Found contact is:', contact);
  // }
  // getContactById(15833158957557777);
  
  onAddContactPressed = () =>{

    props.navigation.navigate({
      routeName: 'AddContact'
      });
  }

  const renderContactListItem = itemData =>{
    return(
      <ContactListItem 
        name = {itemData.item.name}
        imageUri = {itemData.item.imageUri}
        onSelect = {() => {
          props.navigation.navigate({
            routeName: 'UpdateContact',
            params: {
              indexSelected: itemData.index
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