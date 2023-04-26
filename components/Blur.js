import React from 'react';
import { StyleSheet, View, Text, Platform, ImageBackground } from 'react-native';

const Blurs = (props) => {
  const { style, children, blurType, blurAmount } = props;

  // Define the background image style
  const backgroundImageStyle = { flex: 1, resizeMode: "cover" };

  // Define the blur effect style based on the platform
  const blurEffectStyle = Platform.select({
    ios: {
      blurRadius: blurAmount || 10,
      blurType: blurType || "dark",
    },
    android: {
      blurRadius: blurAmount || 5,
      blurType: blurType || "light",
    },
    default: {},
  });

  return (
    <View style={[styles.container, style]}>
      <ImageBackground
        style={[styles.backgroundImage, backgroundImageStyle]}
        source={{ur}}
        blurRadius={blurEffectStyle.blurRadius}
      >
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      android: {
        backgroundColor: 'rgba(255,255,255,0.5)',
      },
      default: {
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
    }),
  },
});

export default Blurs;
