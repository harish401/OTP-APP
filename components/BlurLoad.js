import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const NeomorphismBlur = ({ children }) => {
  return (
    <BlurView style={styles.container} blurType="light" blurAmount={10}>
      {children}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NeomorphismBlur;
