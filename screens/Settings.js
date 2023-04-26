import React,{useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,AsyncStorage } from 'react-native';
import NeumorphicCard from '../components/Card';
import { BackHandler, Linking } from 'react-native';
const SettingsScreen = ({ navigation }) => {
    const handleLogout = async () => {
        // Remove the user type and username from AsyncStorage
        await AsyncStorage.removeItem('userType');
        await AsyncStorage.removeItem('username');
        // Reset the navigation stack to the Login screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginStack' }],
        });
      };
  
    
      const handleBackPress = () => {
        Linking.canOpenURL('app-settings:')
          .then((supported) => {
            if (supported) {
              return Linking.openSettings();
            } else {
              return BackHandler.exitApp();
            }
          })
          .catch((error) => console.error(error));
        return true;
      };
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <NeumorphicCard>
          <TouchableOpacity onPress={() =>navigation.navigate('Accounts')}>
            <Text style={styles.cardTitle}>Accounts</Text>
          </TouchableOpacity>
        </NeumorphicCard>
      </View>

      <View style={styles.cardContainer}>
        <NeumorphicCard>
          <TouchableOpacity onPress={() => navigation.navigate('Enquiries')}>
            <Text style={styles.cardTitle}>Enquiries</Text>
          </TouchableOpacity>
        </NeumorphicCard>
      </View>

      <View style={styles.cardContainer}>
        <NeumorphicCard>
          <TouchableOpacity onPress={() => navigation.navigate('Doctors')}>
            <Text style={styles.cardTitle}>Doctors</Text>
          </TouchableOpacity>
        </NeumorphicCard>
      </View>

      <View style={styles.cardContainer}>
        <NeumorphicCard>
          <TouchableOpacity onPress={() => {navigation.navigate('Accounts')
        
        }}>
            <Text style={styles.cardTitle}>Account Messages</Text>
          </TouchableOpacity>
        </NeumorphicCard>
      </View>

      <View style={styles.cardContainer}>
        <NeumorphicCard>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.cardTitle}>Logout</Text>
          </TouchableOpacity>
        </NeumorphicCard>
      </View>
      <View style={styles.cardContainer}>
        <NeumorphicCard>
          <TouchableOpacity onPress={handleBackPress}>
            <Text style={styles.cardTitle}>Exit</Text>
          </TouchableOpacity>
        </NeumorphicCard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
 marginLeft:20,
marginTop:40,
    backgroundColor: '#f2f2f2',
  },
  cardContainer: {
    width: '95%',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    color: '#333',
  },
});

export default SettingsScreen;
