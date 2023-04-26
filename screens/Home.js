import React, { useState } from 'react';
import { FlatList,Image } from 'react-native';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const { width } = Dimensions.get('window');
const Dashboard = () => {
    const [accounts, setAccounts] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [account, setAccount] = useState([]);
    useFocusEffect(
      React.useCallback(() => {
        
        fetch(
          "https://api.speech4all.com/admin/account"
        )
          .then((response) => response.json())
          .then((data) => {
      
            setAccount(data.data);
           
          })
          .catch((error) => {
            console.error("Error fetching enquiries:", error);
           
          });
      }, [])
    );
    useFocusEffect(
      React.useCallback(() => {
        
        fetch(
          "https://api.speech4all.com/admin/doctors"
        )
          .then((response) => response.json())
          .then((data) => {
      
            setDoctors(data.data);
           
          })
          .catch((error) => {
            console.error("Error fetching enquiries:", error);
           
          });
      }, [])
    );
 
    
    useFocusEffect(
        React.useCallback(() => {
         
          fetch(
            "https://api.speech4all.com/admin/enquiry"
          )
            .then((response) => response.json())
            .then((data) => {
              setAccounts(data.data);
              
            })
            .catch((error) => {
              console.error("Error fetching enquiries:", error);
              
            });
        }, [])
      );
  const [data, setData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  });
  const NeumorphicView = ({ children }) => {
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
    );
  };
  return (
    <View style={styles.container}>
   
      <View style={styles.chartContainer}>
        <Image style={{height:400,width:screenWidth}} source={{uri:"https://img.freepik.com/free-vector/steps-infographic_23-2148051115.jpg?w=740&t=st=1680894773~exp=1680895373~hmac=7797265bcebe67f0fbd244cb59aa81a15afdd07bf3010e2e577773fe3752b125"}}/>
      
      </View>
      
      <View style={styles.statsContainer}>
      
        <View style={styles.statsBox}>
          <Text style={styles.statsTitle}>Enquiries</Text>
          <Text style={styles.statsValue}>{accounts.length}</Text>
        </View>
    
        <View style={styles.statsBox}>
          <Text style={styles.statsTitle}>Accounts</Text>
          <Text style={styles.statsValue}>{account.length}</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.statsTitle}>Doctors</Text>
          <Text style={styles.statsValue}>{doctors.length}</Text>
        </View>
      </View>
      
    </View>
  );
};

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7D7D7',
    marginTop:40,
    elevation:20
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
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  chartContainer: {
    backgroundColor: '#EDEDED',
   
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  statsBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    },
    
    statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    },
    neomorph: {
      borderRadius: 20,
      shadowOpacity: 0.8,
      shadowRadius: 10,
      backgroundColor: '#E0E5EC',
      width: width * 0.9,
      height: 80,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    },
});
export default Dashboard
