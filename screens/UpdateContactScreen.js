import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { useSelector, useDispatch } from 'react-redux';
import { updateContact } from '../store/actions/Contacts'
import { deleteContact } from '../store/actions/Contacts'

import Contact from '../models/Contact';

const UpdateContactScreen = props => {

  const [isFavorite, setIsFavorite] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactMobile, setContactMobile] = useState('');
  const [contactLandline, setContactLandline] = useState('');
  const [contactImageUri, setContactImageUri] = useState('');

  const favContacts  = useSelector(state => state.contacts.favContacts);
  const Contacts  = useSelector(state => state.contacts.contacts);
  const currentContactIndex = props.navigation.getParam('indexSelected');
  const currentContact = Contacts[currentContactIndex];

  const getContactById = id => {
    const contact = favContacts.filter((contact) => {
      return id === contact.id;
    });
    return contact;
  }


  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {

    var indexFound = favContacts.map(function(x) {return x.id; }).indexOf(currentContact.id);
    if(indexFound >= 0)
    {
      setIsFavorite(true);
    }
    setContactLandline(currentContact.landLine);
    setContactImageUri(currentContact.imageUri);
    setContactMobile(currentContact.mobile);
    setContactName(currentContact.name);
  
  }, []);

  const toggleFavorite = () => {

    if(isFavorite)
    {
      setIsFavorite(false);
    }
    else{
      setIsFavorite(true);
    }
  }

  const getFavImage = () => {
    if(isFavorite)
    {
      return require('../images/icon_star_enabled.png');
    }
    else{
      return require('../images/icon_star_disabled.png');
    }
  }

  const getUserImage = () => {
    if(contactImageUri.length > 0)
    {
      return {uri : contactImageUri};
    }
    else{
      return require('../images/icon_camera.png');
    }
  }

  const dispatch = useDispatch();

  const nameInputHandler = enteredText =>{
    setContactName(enteredText);
  } 

  const mobileInputHandler = enteredText =>{
    setContactMobile(enteredText);
  } 

  const landlineInputHandler = enteredText =>{
    setContactLandline(enteredText);
  } 

  const onUpdatePressed = () =>{

    if(contactName.length == 0 || contactMobile.length == 0)
    {
      Alert.alert('Name or Mobile cannot be blank');
      return;
    }
    const updatedContact = new Contact(currentContact.id, contactName, contactMobile, contactLandline, contactImageUri);
    dispatch(updateContact(updatedContact));
    props.navigation.goBack();
  }

  const onDeletePressed = () =>{
    dispatch(deleteContact(currentContact.id));
    props.navigation.goBack();
  }

  const onCameraPressed = () =>{
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        waitUntilSaved: true
      },
    };
     
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
     
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setContactImageUri(response.uri);
      }
    })
  }


  return(
    <TouchableWithoutFeedback onPress = {() => {
      Keyboard.dismiss();
    }}>

      <View style = {styles.screen} >

        <View style = {styles.favIcon}>
          <TouchableOpacity activeOpacity={0.5} onPress={toggleFavorite} >
            <Image source={getFavImage()}/>
          </TouchableOpacity>
        </View>

          <TouchableOpacity activeOpacity={0.5} onPress={onCameraPressed} style={styles.cameraIcon} >
          <Image source={getUserImage()} 
          style={styles.CameraButtonStyle} />
          </TouchableOpacity>

          <View style = {styles.contactInputContainer}>
            <Text style = {styles.contactText}>Name</Text>
            <TextInput
              style={styles.textInputName}
              onChangeText={nameInputHandler}
              value={contactName}
            />
          </View>
          <View style = {styles.contactInputContainer}>
            <Text style = {styles.contactText}>Mobile</Text>
            <TextInput
              style={styles.textInputMobile}
              onChangeText={mobileInputHandler}
              value={contactMobile}
              keyboardType = 'number-pad'
            />
          </View>
          <View style = {styles.contactInputContainer}>
            <Text style = {styles.contactText}>Landline</Text>
            <TextInput
              style={styles.textInputLandline}
              onChangeText={landlineInputHandler}
              value={contactLandline}
              keyboardType = 'number-pad'
            />
          </View>

          <View style = {styles.buttonContainer}>
            <Button title = 'Update' onPress = {onUpdatePressed}/>
            <Button title = 'Delete' onPress = {onDeletePressed}/>
          </View>

        </View>
        </TouchableWithoutFeedback>
    )
};

UpdateContactScreen.navigationOptions =  {
  headerTitle: 'Update Contact'
  // headerRight: (  
  //   <TouchableOpacity onPress = {() => {
      
  //   }}>
  //   <Image source = {require('../images/icon_star_disabled.png')}/>
  //   </TouchableOpacity>          
  // )
};

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center'
    },
    favIcon:{
      width : '100%',
      height : 32,
      flexDirection: 'row',
      justifyContent : 'flex-end'
    },
    cameraIcon:{

      marginTop : '20%',
      marginBottom : 40,
      borderRadius : 60,
      borderColor : 'gray',
      borderWidth : 1,
    },
    CameraButtonStyle:{
      width: 120,
      height: 120,
    },
    contactText:{
      width : 80,
      alignSelf : 'center',
      fontSize : 16,
    },
    contactInputContainer:{
      flexDirection : 'row',
      marginTop : 20,
      height : 30,
    },
    textInputName:{
      width : '60%',
      borderWidth : 1,
      borderTopColor : 'gray',
      borderLeftColor : 'gray',
      borderBottomColor : 'lightgray',
      borderRightColor : 'lightgray',
    },
    textInputMobile:{
      width : '60%',
      borderWidth : 1,
      borderTopColor : 'gray',
      borderLeftColor : 'gray',
      borderBottomColor : 'lightgray',
      borderRightColor : 'lightgray',
    },
    textInputLandline:{
      width : '60%',
      borderWidth : 1,
      borderTopColor : 'gray',
      borderLeftColor : 'gray',
      borderBottomColor : 'lightgray',
      borderRightColor : 'lightgray',
    },
    buttonContainer:{
      width : '60%',
      backgroundColor : 'white',
      position : "absolute",
      bottom : 40,
      flexDirection : 'row',
      justifyContent : 'space-between',

    }
  });
  

export default UpdateContactScreen;