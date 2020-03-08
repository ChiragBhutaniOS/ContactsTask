import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableNativeFeedback
  
} from 'react-native';

const ContactListItem = props => {

  const getUserImage = () => {
    if(props.imageUri.length > 0)
    {
      return {uri : props.imageUri};
      // return require(contactImageUri);
    }
    else{
      return require('../images/icon_user.png');
    }
  }


  let TouchableCmp = TouchableOpacity;
  const img = props.imageUri;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.listItem}>
      <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
        <View style={styles.container}>
            <View style = {styles.image} >
                <Image source = {getUserImage()} style ={{width: 40, height: 40, backgroundColor: 'white'}}/>
            </View>
          <Text style={styles.title}>
            {props.name}
          </Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden'
  },
  container: {
    flex: 1,
    flexDirection:'row',
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth : 1,
    borderBottomColor : 'lightgray'
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    paddingLeft : 10
  },
  image:{
     paddingLeft : 40,
     paddingRight : 10
      }
});

export default ContactListItem;
