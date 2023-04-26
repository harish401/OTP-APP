import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Image, Animated, AsyncStorage,Easing } from 'react-native';
import NeumorphicText from './components/Text';

const Welcome = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading...');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [shadowAnim] = useState(new Animated.Value(0));
  
  useEffect(() => {
    
    const startAnimation = () => {
      // Start the loading animation
      Animated.loop(
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        })
      ).start();
      
      Animated.loop(
        Animated.timing(shadowAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        })
      ).start();
      checkUserType()
    };
    const checkUserType = async () => {
      // Check if the user is already logged in
      const userType = await AsyncStorage.getItem('userType');
      if (userType === 'customer') {
        // Navigate to the customer home screen
        navigation.replace('CustomerTabs');
      } else if (userType === 'partner') {
        // Navigate to the partner home screen
        navigation.replace('HomeTabs');
      } else {
        // Navigate to the login screen
        setTimeout(() => {
          navigation.replace('LoginStack');
        }, 3000);
       
      }
    };


    const loadData = () => {
      try {
        // Load any data you need here
        setLoadingText('Speech4All');
        
      } catch (error) {
        console.error(error);
      }
      
      setIsLoading(false);
    };
    
    startAnimation();
    loadData();
  }, []);
  
  const renderLoader = () => {
    // Choose a random loader
    const loaders = [
      <ActivityIndicator color="#ffffff" size="large" />,
      <ActivityIndicator color="#ffffff" size="small" />,
      <Image source={require('./assets/loader.gif')} style={{ width: 50, height: 50 }} />,
      <Image source={require('./assets/loader2.gif')} style={{ width: 50, height: 50 }} />,
    ];
    const loader = loaders[Math.floor(Math.random() * loaders.length)];
    return loader;
  };
  
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.loaderContainer, {
        opacity: fadeAnim,
        transform: [
          {
            scale: shadowAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          },
        ],
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }]}>
        {renderLoader()}
      </Animated.View>
      <NeumorphicText style={styles.loadingText}>{loadingText}</NeumorphicText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  loaderContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 100,
    padding: 20,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#555555',
  },
});

export default Welcome;



