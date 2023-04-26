import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const NeumorphicViewPicker = ({ children }) => {
  return (
    <View style={styles.outerShadowpicker}>
      <View style={styles.innerShadowpicker}>
        <View style={styles.neomorphpicker}>
          <LinearGradient colors={['#EDEFF4', '#D8D9E5']} style={styles.backgroundpicker}>
            {children}
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerShadowpicker: {
    shadowColor: '#b2b2b2',
    shadowOffset: {
      width: -5,
      height: -5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
   
  },
  innerShadowpicker: {
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  neomorphpicker: {
    borderRadius: 10,
    shadowOpacity: 0.9,
    elevation: 0.5,
    shadowRadius: 10,
    backgroundColor: '#E0E5EC',
    width: width * 0.99,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundpicker: {
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NeumorphicViewPicker;
