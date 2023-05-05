import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground,AsyncStorage,Animated } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';

import { Video } from "expo-av";
import { useMemo } from "react";
import NeumorphicButton from './components/NeumorphicButton';
import NeumorphicText from './components/Text';

import { Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
const image = { uri: "https://img.freepik.com/free-photo/woman-doing-speech-therapy-with-little-blonde-boy_23-2149110225.jpg?size=626&ext=jpg&ga=GA1.1.1566504191.1680894721&semt=ais" };
const { height } = Dimensions.get("window");
const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const opacity = useMemo(() => new Animated.Value(0), []);
  const handleLogin = async () => {
    // Check if the username and password are correct
    if (username === 'speech4all' && password === 'admin') {
      // Store the user type and username in AsyncStorage
      await AsyncStorage.setItem('userType', 'customer');
      await AsyncStorage.setItem('username', username);
      // Navigate to the customer home screen
      navigation.navigate('CustomerTabs');
    } 
    else if (username === 'partner@example.com' && password === 'password') {
      // Store the user type and username in AsyncStorage
      await AsyncStorage.setItem('userType', 'partner');
      await AsyncStorage.setItem('username', username);
      // Navigate to the partner home screen
      navigation.navigate('HomeTabs');
    }
    
    else {
      Alert.alert('Error', 'No username found');
    }
  };
  const videos = [
    "https://player.vimeo.com/external/539023718.sd.mp4?s=67dad3c54996009b58928366ef38e79ca98e31f1&profile_id=165&oauth2_token_id=57447761",
   "https://player.vimeo.com/external/539019727.hd.mp4?s=7ec061964aca428a78339a37c10d20a8724739d8&profile_id=174&oauth2_token_id=57447761",
"https://player.vimeo.com/external/478469811.hd.mp4?s=b36f4138ddd3a97c0a2b61ff155befcbfc331d1b&profile_id=174&oauth2_token_id=57447761"
  ];
  const [currentVideo, setCurrentVideo] = useState(videos[Math.floor(Math.random() * videos.length)]);
  return (
   
      <View style={styles.container}>
             <View style={styles.background}>
        <Animated.View
          style={[styles.backgroundViewWrapper, { opacity: opacity }]}
        >
          <Video
            isLooping
            isMuted
            positionMillis={500}
            onLoad={() => {
              // https://facebook.github.io/react-native/docs/animated#timing
              Animated.timing(opacity, {
                toValue: 1,
                useNativeDriver: true,
              }).start();
            }}
            resizeMode="cover"
            shouldPlay
            source={{ uri: currentVideo }}
            style={{ flex: 1 }}
            onPlaybackStatusUpdate={status => {
              if (status.didJustFinish) {
                setCurrentVideo(videos[Math.floor(Math.random() * videos.length)]);
              }
            }}
          />
        </Animated.View>
      </View>
      <View style={styles.overlay}>
  <NeumorphicText h3 style={styles.title}>
    SpeechForAll Admin
  </NeumorphicText>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ padding: 20 }}>
      <TextInput
        style={{ borderRadius: 20, padding: 5,width:350 }}
        mode="outlined"
        placeholder="Email"
        left={<TextInput.Icon icon="email" />}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCompleteType="email"
      />
    </View>
    <View style={{ padding: 20 }}>
      <TextInput
        style={{ borderRadius: 20, padding: 5,width:350 }}
        placeholder="Password"
        mode="outlined"
        left={<TextInput.Icon icon="lock" />}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCompleteType="password"
      />
    </View>
    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
      <NeumorphicButton title="Login" onPress={handleLogin} buttonStyle={styles.button} />
    </View>
  </View>
</View>

      </View>

   
     

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    alignItems: "center",
    backgroundColor: "transparent",
  
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
 
  
  },

  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize:25,
    color: "white",
    marginTop: 90,
 
  },
  button: {
    marginTop: 20,
    backgroundColor: '#07b6ff',
  },

});

export default Login;



