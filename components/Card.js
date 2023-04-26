import React from 'react';
import { View, StyleSheet } from 'react-native';

const NeumorphicCard = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.innerContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E5EC',
    borderRadius: 20,
    shadowColor: '#B7C4CF',
    shadowOffset: {
      width: -10,
      height: -10,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
  },
  innerContainer: {
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#E0E5EC',
  },
});

export default NeumorphicCard;
