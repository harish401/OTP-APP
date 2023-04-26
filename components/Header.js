import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const { width } = Dimensions.get('window');
const NeumorphicHeader = ({ title, right }) => {
  return (
    <View style={styles.header}>
      <LinearGradient colors={['#EDEFF4', '#D8D9E5']} style={styles.background}>
        <Text style={styles.title}>{title}</Text>
        {right && <View style={styles.right}>{right}</View>}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: width,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    marginTop:40
  },
  outerShadow: {
    shadowColor: '#b2b2b2',
    shadowOffset: {
      width: -5,
      height: -5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  innerShadow: {
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  background: {
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    flex: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default NeumorphicHeader;
