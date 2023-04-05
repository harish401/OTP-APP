import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TableScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Load data from AsyncStorage on mount
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('data');
        const dataArray = storedData ? storedData.split(',') : [];
      
        if (dataArray.length > 0) {
          const lastReceived = dataArray.pop();
          dataArray.unshift(lastReceived);
        }
        setData(dataArray);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Mobile/Email List:</Text>
      {data.map((item, index) => (
        <View key={index} style={{padding:10,borderWidth:1,marginTop:10}}>
          <Text style={{fontSize:18}}>{item}</Text>
        </View>
      ))}
    </View>
  );
}
