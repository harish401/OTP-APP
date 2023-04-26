import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const NeomorphismLoading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.outerShadow}>
        <View style={styles.innerShadow}>
          <LinearGradient
            colors={['#EDEFF4', '#D8D9E5']}
            style={styles.background}
          >
            <ActivityIndicator size="large" color="#6C7A89" />
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 50,
    padding: 20,
  },
});

export default NeomorphismLoading;
