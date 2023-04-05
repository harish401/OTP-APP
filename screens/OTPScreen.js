import React, { useState } from 'react';
import { View, TextInput,  ToastAndroid} from 'react-native';
import { Text, Input, Button} from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';
export default function OTPScreen({ navigation, route }) {
  const { value } = route.params;
  const [otp, setOTP] = useState('');

  const handleNext = () => {
    if (otp === '9999') {
      navigation.replace('Table', { value });
    } else if(otp == '') {
      ToastAndroid.show('please write otp', ToastAndroid.SHORT);
    }
    else  {
        ToastAndroid.show('Invalid OTP', ToastAndroid.SHORT);
      }
  };

  return (
    <View style={{ flex: 1,  backgroundColor: '#fff' }}>
        
    <Text h4 style={{ marginLeft:40, fontWeight:'900',fontSize:30, color: '#000' }}>Enter OTP</Text>
    <View style={{ padding: 20, }}>
      <Input
      //   label="Enter Mobile/Email"
      value={otp}
      onChangeText={setOTP}
      placeholder="Enter OTP "
      keyboardType="number-pad"
      onSubmitEditing={handleNext}
      maxLength={4}
        containerStyle={{ marginBottom: 20 }}
        inputStyle={{ padding:10, borderRadius: 10, borderWidth: 1, borderColor: '#ccc',}}
        inputContainerStyle={{ borderBottomWidth: 0,width:"100%" }}
        labelStyle={{ color: '#000', fontWeight: 'bold' }}
       
      />

  
      
    </View>
  </View>
  );
}
