import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../store/actions/Contacts'
import Contact from '../models/Contact';
import { $CombinedState } from 'redux';


const AddContactScreen = props => {

  const [isFavorite, setIsFavorite] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactMobile, setContactMobile] = useState('');
  const [contactLandline, setContactLandline] = useState('');
  const [contactImageUri, setContactImageUri] = useState('');

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {

    props.navigation.setParams({toggleFav: toggleFavorite, isFav: isFavorite}); 
  
  }, [isFavorite]);


  const toggleFavorite = () => {

    if(isFavorite)
    {
      setIsFavorite(false);
    }
    else{
      setIsFavorite(true);
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

  const onSavePressed = () =>{
    if(contactName.length == 0 || contactMobile.length == 0)
    {
      Alert.alert('Name or Mobile cannot be blank');
      return;
    }
    const newContact = new Contact(new Date().getTime(), contactName, contactMobile, contactLandline, contactImageUri);
    dispatch(addContact(newContact, isFavorite));
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

          <TouchableOpacity activeOpacity={0.5} onPress={onCameraPressed} style={styles.cameraIconOpacity} >
          <Image source={getUserImage()} 
          style={styles.CameraIcon} />
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
            <Button title = 'Save' onPress = {onSavePressed}/>
          </View>

        </View>
        </TouchableWithoutFeedback>
    )
};

AddContactScreen.navigationOptions = navigationData => {

  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFavorite = navigationData.navigation.getParam('isFav');

  return{
    headerTitle: 'Add Contact',  
    headerRight: (  
      <TouchableOpacity onPress = {toggleFavorite}>
      <Image source = {isFavorite ? require('../images/icon_star_enabled.png') : require('../images/icon_star_disabled.png')}/>
      </TouchableOpacity>          
    )
  }
};

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center'
    },
    cameraIconOpacity:{
      marginTop : '20%',
      marginBottom : 40,
      borderRadius : 80/2,
      borderColor : 'gray',
      borderWidth : 1,
    },
    CameraIcon:{
      width: 80,
      height: 80,
      borderRadius : 60,
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
      width : '100%',
      backgroundColor : 'white',
      position : "absolute",
      bottom : 40
    }
  });
  

export default AddContactScreen;