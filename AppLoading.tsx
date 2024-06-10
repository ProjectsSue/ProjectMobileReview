import React from 'react';
import { Text, StyleSheet, View , Image} from 'react-native';

const MainButton = (props) => {
  const incomingStyle = Array.isArray(props.style) ? props.style : [props.style];
  return ( 
    <View style={[styles.mainButton, ...incomingStyle]}>
      <Image source={{uri: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/portrait-of-a-chinstrap-penguin-by-alan-m-hunt-alan-m-hunt.jpg'}}/>
    </View>
  )
};

const styles = StyleSheet.create({
  mainButton: {
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },  
});

export default MainButton;