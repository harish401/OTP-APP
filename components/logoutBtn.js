import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import NeumorphicText from './Text';

const LogoutButton = ({ onPress }) => {
 



 

 
  return (
    <TouchableOpacity style={{    backgroundColor: 'orange' ,
    borderRadius: 10,
    marginRight: 20,
    elevation: -10,
    width:85 ,}}  onPress={() => 

  onPress()
}
>
      <View style={{
 backgroundColor: 'red',
 borderRadius: 10,
 elevation: 25,
 width: 70,
 marginRight: 10,
      }}>
        <NeumorphicText style={{
 color: '#07b6ff',
 padding: 7,
        }}>Logout</NeumorphicText>
      </View>
    </TouchableOpacity>
  );
};

export default LogoutButton;
