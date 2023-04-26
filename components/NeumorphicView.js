import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export default function NeumorphicView({ children }) {
  
  return (
    <View style={styles.outerShadow}>
    <View style={styles.innerShadow}>
      <LinearGradient
        colors={['#EDEFF4', '#D8D9E5']}
        style={styles.background}
      >
        {children}
      </LinearGradient>
    </View>
  </View>
  )
}



const styles = StyleSheet.create({
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
      },
})