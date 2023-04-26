import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text , TouchableOpacity,Modal,Alert,TextInput,Image,ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import NeomorphismLoading from '../components/Loader';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Searchbar } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import NeumorphicButton from '../components/NeumorphicButton';
import NeumorphicHeader from '../components/Header';
import LogoutButton from '../components/logoutBtn';
import NeumorphicText from '../components/Text';
const { width } = Dimensions.get('window');

export default function Doctors({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');
  const [message, setMessage] = useState("");
  const [isLoadingm, setIsLoadingm] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoadingConvert, setIsLoadingconvert] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  useEffect(() => {
    
    setFilteredDataSource(accounts);
    
  }, [accounts]);
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = accounts.filter(function (item) {
        const itemData = item.firstName ? item.firstName.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(accounts);
      setSearch(text);
    }
  };
  const data = {
    message: message 
  }
  const sendMessage = (userId) => {
 
    setIsLoadingm(true);
    setIsLoadingconvert(true)
    fetch(`https://f7g0y9alkg.execute-api.ca-central-1.amazonaws.com/dev/accounts/${userId}/message`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        setIsLoadingm(false);
        setIsLoadingconvert(false);
        if (!response.ok) {
          throw new Error("Failed to send message.");
        }
  
        const newMessage = {
          message: data.message,
          sender: "user",
          createdAt: new Date(),
        };
  alert(JSON.stringify(newMessage))
        setMessages((prevMessages) => [...prevMessages, newMessage]);
       
        setAlertVariant("success");
        setTimeout(() => {
            setAlertMessage("Message sent successfully!");
          }, 3000);
      
       
      })
      .catch((error) => {
        setIsLoadingm(false);
        console.log(error);
        setAlertVariant("danger");
        setAlertMessage(error.message || "Unknown error occurred");
      });
  };
  const handleLogout = async () => {
    // Remove the user type and username from AsyncStorage
    // await AsyncStorage.removeItem('userType');
    // await AsyncStorage.removeItem('username');
    // // Reset the navigation stack to the Login screen
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'LoginStack' }],
    // });
    console.log('ok')
  };
  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      fetch(
        "https://api.speech4all.com/admin/doctors"
      )
        .then((response) => response.json())
        .then((data) => {
         
          setAccounts(data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching enquiries:", error);
          setIsLoading(false);
        });
    }, [])
  );

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://api.speech4all.com/admin/doctors/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

    
      setAccounts(accounts.filter(account => account.id !== id));
      setShowAlert(true);
    
      setAlertMessage("Account deleted successfully!");
      setAlertVariant("success");
    
    } catch (error) {
      console.error(error);
      
    }
  };
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState(true);

    const renderItem = ({ item }) => (
      <TouchableOpacity  onPress={() => navigation.navigate('ViewAccount',{ item })} style={styles.itemContainer}>
          
      <NeumorphicView>
      <View style={styles.neomorph}>
      <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',padding:10}}>
        <Text style={styles.firstName}>{item.firstName}</Text>
      
        <View style={{justifyContent:"flex-end",alignItems:'flex-end',flex:1}}>
      <Text style={styles.balance}>{item.status == "" ? "New" : item.status}</Text>
      </View>
      </View>
      <Text style={{marginLeft:10,color:'#07b6ff',marginBottom:20}}>{' '}{item.emailID}</Text>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:'center',padding:5}}>
        <TouchableOpacity onPress={() => {
          setIsExpanded(isExpanded === item.id ? null : item.id);
          setExpandedItemId(item.id);
        }} style={{backgroundColor:"#07b6ff",padding:7,borderRadius:10,elevation:2}} > 
          <Text style={{color:"white"}}>{'    '}Edit{'   '} </Text>
          {/* <View style={{ justifyContent: "flex-end", alignItems: 'flex-end', flex: 1 }}>
            <Image style={{ height: 30, width: 30 }} source={{ uri: "https://cdn-icons-png.flaticon.com/128/2951/2951226.png" }} />
          </View> */}
        </TouchableOpacity>



        <TouchableOpacity onPress={() =>   Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete this item?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: () => {
             handleDelete(item.id)
            }
          }
        ]
      )} style={{backgroundColor:"red",padding:7,borderRadius:10,elevation:2,marginLeft:10}} ><Text style={{color:"white"}}>{'   '}Delete{'   '}</Text></TouchableOpacity>
       
    
        </View>
       
        </View>
       
        {/* <TouchableOpacity onPress={toggleExpansion1} style={{ marginBottom: 10, flexDirection: "row" }}>
        
          <View style={{ justifyContent: "flex-end", alignItems: 'flex-end', flex: 1 }}>
            <Image style={{ height: 30, width: 30 }} source={{ uri: "https://cdn-icons-png.flaticon.com/128/2951/2951226.png" }} />
          </View>
        </TouchableOpacity> */}
    

  
      </NeumorphicView>
     
    </TouchableOpacity>
  
    );
    const [showAlert, setShowAlert] = useState(false);

 

    const onClose =()=>{
      setAlertMessage('')
  }


    return (
      <View style={styles.container}>
        {alertMessage !== '' && (
             <View style={{ flexDirection:"row", }}>
        <Text style={alertVariant === 'success' ? styles.successText : styles.dangerText}>
          {alertMessage}
        </Text>
        <TouchableOpacity onPress={() =>onClose()} style={{ flex:1,justifyContent:"flex-end",alignItems:'flex-end' }}>
        <Text style={{color:'#07b6ff'}}>Done</Text> 
    </TouchableOpacity>
    </View>
      )}
       <NeumorphicHeader title={"Doctors"} 
         right={
         
          <TouchableOpacity onPress={() =>navigation.navigate('ViewDoctors')} >
          <View style={{backgroundColor:'white',padding:10,width:100,borderRadius:10,elevation:15}}>
  <NeumorphicText style={{color:'#07b6ff'}}>Add doctor</NeumorphicText>
          </View>
        </TouchableOpacity>
       
        }
        />
        <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#e0e5ec',
      borderRadius: 10,
     
    }}
  >
    <Searchbar
      style={{
    width:width,
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        marginLeft: 10,
      }}
      iconColor="#616161"
      placeholder="Search"
      onChangeText={searchFilterFunction }
      value={search}
      selectionColor="#616161"
    />

  </View>





        {isLoading ? (
         <NeomorphismLoading/>
        ) : (
          
          <FlatList
          showsVerticalScrollIndicator={false}
            data={filteredDataSource}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}



      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F5FCFF',
    },
    successText: {
      color: 'green',
      marginTop: 10,
    },
    dangerText: {
      color: 'red',
      marginTop: 10,
    },
    item: {
      marginVertical: 8,
      marginHorizontal: 16,
    },
  
    itemContainer: {
      alignItems: 'center',
      marginTop: 10,
      width: '100%',
    },
    neomorph: {
      borderRadius: 20,
      shadowOpacity: 0.8,
      shadowRadius: 10,
      backgroundColor: '#E0E5EC',
      width: width * 0.9,
      height: 140,
     
    },
    blur: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modal: {
      width: '80%',
      backgroundColor: '#EDEFF4',
      borderRadius: 20,
     
      elevation: 10,
      alignItems: 'center',
    },
    inner: {
      padding: 20,
      alignItems: 'center',
    },
    textContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },
    neomorph1: {
      shadowRadius: 6,
      borderRadius: 20,
      backgroundColor: '#EDEFF4',
      shadowColor: '#bdc1c6',
      shadowOpacity: 0.9,
      shadowOffset: {
        width: 5,
        height: 5,
      },
      elevation: 10,
    },
    message: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginHorizontal: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    button: {
      width: 100,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#07b6ff',
    },
    firstName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#6C7A89',
    },
    balance: {
      fontSize: 16,
      fontWeight: '500',
      color: '#6C7A89',
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
  });
  
  
