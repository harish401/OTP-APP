import React, { useState } from 'react';
import { View ,ToastAndroid} from 'react-native';
import { Text, Input, Button,Alert } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [value, setValue] = useState('');

  const handleSubmit = async () => {
 
    try {
      const existingData = await AsyncStorage.getItem('data');
      const data = existingData ? `${existingData},${value}` : value;
      await AsyncStorage.setItem('data', data);
    } catch (error) {
      console.error(error);
    }
    if (value.length === 0) {
      
        ToastAndroid.show('Please enter a mobile number/email', ToastAndroid.SHORT);
    } else if (value.length < 10) {
      
      if (Platform.OS === 'ios') {
        Alert.alert('Invalid input', 'Mobile number/email must be at least 10 characters long');
      } else {
    ToastAndroid.show('Mobile number/email must be at least 10 characters long', ToastAndroid.SHORT);
      }
    } else {
      setValue('')
      navigation.navigate('OTP', { value });
    }

  };


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        
      <Text h4 style={{  fontWeight:'900',fontSize:30, color: '#000' }}>Get Started</Text>
      <View style={{ padding: 20, }}>
        <Input
        //   label="Enter Mobile/Email"
          placeholder="Enter Mobile/Email"
          value={value}
          onChangeText={(text) => setValue(text)}
          containerStyle={{ marginBottom: 20 }}
          inputStyle={{ padding:10, borderRadius: 10, borderWidth: 1, borderColor: '#ccc',}}
          inputContainerStyle={{ borderBottomWidth: 0,width:"100%" }}
          labelStyle={{ color: '#000', fontWeight: 'bold' }}
         
        />
         <View style={{ padding: 10,paddingTop:0 }}>

        <Button
          title="Continue"
          onPress={handleSubmit}
          buttonStyle={{ backgroundColor: '#00aced',width:"100%", borderRadius: 10, padding: 15,  flexDirection: 'row', alignItems: 'center' }}
           icon={<FontAwesome name="arrow-right" size={18} color="#fff" style={{ marginRight: 10 }} />}
        />
        </View>
        <Text style={{ textAlign: 'center', marginVertical: 20 }}>or continue with</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button
            title="WhatsApp"
            titleStyle={{color:"#00E676"}}
            icon={<FontAwesome name="whatsapp" size={18} color="#00E676" style={{ marginRight: 10 }} />}
            buttonStyle={{ borderColor:'#00E676',borderWidth:0.5, backgroundColor: 'white', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, marginRight: 10 }}
          />
          <Button
            title="Google"
            icon={<FontAwesome name="google" size={18} color="orange" style={{ marginRight: 10 }} />}
            buttonStyle={{ backgroundColor: '#f44336', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, marginLeft: 10 ,width:150 }}
          />
         
        </View>
        <Text style={{ textAlign: 'center', marginVertical: 20 }}>By continuing you agree {'  '}
          <Text style={{ color:"#07b6ff" }}>
            Our terms & policies
            </Text></Text>
      </View>
    </View>
  );
}
