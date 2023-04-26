import React, { useState } from 'react';
import {Button, View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, TextInput,FlatList,ActivityIndicator, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import NeumorphicButton from '../components/NeumorphicButton';
import NeumorphicDropdown from '../components/Dropdown';
import { Picker } from '@react-native-picker/picker';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import {  } from 'react-native-paper';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import NeumorphicText from '../components/Text';
import { useTheme } from '@react-navigation/native';
const { width } = Dimensions.get('window');

export default function ViewEnquiry({ route }) {
  const { colors } = useTheme();
  const { item } = route.params;
  const [customStyleIndex, setCustomStyleIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConvert, setIsLoadingconvert] = useState(false);
  const [isLoadingm, setIsLoadingm] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded1, setIsExpanded1] = useState(false);
  const [selectedStatus, setSelectedStatus] =  useState(item.status)

  const [message, setMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

 
const convertToAccount = (id) => {
  setIsLoadingconvert(true);
  setAlertMessage(""); 
  console.log(id);
  fetch(
    `https://api.speech4all.com/admin/accounts/${id}/convert_account`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }
  )
    .then((response) => {
      setIsLoadingconvert(false); // Stop the loader
      if (!response.ok) {
        throw new Error("Account already created");
      }
      setAlertVariant("success");
      setAlertMessage("Account created successfully");
      setTimeout(() => {
        setAlertMessage("");
      }, 2000);
    })
    .catch((error) => {
      setIsLoadingconvert(false); // Stop the loader
      console.log(error);
      setAlertVariant("danger");
      setAlertMessage(error.message || "Unknown error occurred");
    });
};
  const handleCustomIndexSelect = (index) => {
    //handle tab selection for custom Tab Selection SegmentedControlTab
    setCustomStyleIndex(index);
  };
  const data = {
    message: message 
  }
  const sendMessage = (userId) => {
    setIsLoadingm(true);
    fetch(`https://api.speech4all.com/admin/${userId}/message`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        setIsLoadingm(false);
        if (!response.ok) {
          throw new Error("Failed to send message.");
        }
  
        const newMessage = {
          message: data.message,
          sender: "user",
          createdAt: new Date(),
        };
  
        setMessages((prevMessages) => [...prevMessages, newMessage]);
       
        setAlertVariant("success");
        setAlertMessage("Message sent successfully!");

          setTimeout(() => {
            setAlertMessage("");
          }, 2000);
        // messageInputRef.current.value = "";
 
      })
      .catch((error) => {
        setIsLoadingm(false);
        console.log(error);
        setAlertVariant("danger");
        setAlertMessage(error.message || "Unknown error occurred");
      });
  };
  const [messages, setMessages] = useState([]);
  React.useEffect(() => {
    getMessages(item.messages);
    console.log(messages);
  }, [item.messages]);
  const getMessages = (userId) => {
    fetch(
      `https://api.speech4all.com/admin/enquiry/${item.id}/message`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to get message.");
        }
        return response.json();
      })
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const handleChange = (newStatus) => {
  //   setIsLoading(true);
  //   fetch(`https://f7g0y9alkg.execute-api.ca-central-1.amazonaws.com/dev/enquiry/${item.id}?status=${newStatus}`, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ status: newStatus })
  //   })
  //   .then(response => response.text())
  //   .then(data => {
  //     setIsLoading(false);
  //     setSelectedStatus(newStatus);
  //     setAlertVariant("success");
  //     item.status = newStatus;
  //     setAlertMessage(data);
  //     setTimeout(() => {
  //       setAlertMessage("");
  //     }, 3000);
  //   })
  //   .catch(error => {
  //     setIsLoading(false);
  //     console.error('Error updating enquiry status:', error);
  //   });
  // };
  const handleChange = (newStatus) => {
    setIsLoading(true);
    fetch(`https://api.speech4all.com/admin/enquiry/${item.id}?status=${newStatus}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
    .then(response => response.text())
    .then(data => {
      setIsLoading(false);
      setSelectedStatus(newStatus);
      setAlertVariant("success");
      item.status = newStatus;
      setAlertMessage(data);
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    })
    .catch(error => {
      setIsLoading(false);
      console.error('Error updating enquiry status:', error);
    });
  };
  
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const toggleExpansion1 = () => {
    setIsExpanded1(!isExpanded1);
  };
  const formatTime = (time) => {
    const options = {
      year: "numeric",
      month: "short",
     
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(time).toLocaleDateString("en-US", options);
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity  style={styles.itemContainer}>
    {isLoading ? (
      <View style={[styles.loadingIndicator, styles.neomorph]}>
        <View style={[styles.loadingItem, { opacity: 0.8 }]} />
        <BlurView tint="light" intensity={50}></BlurView>
      </View>
    ) : (
      <NeumorphicView>
        <View style={styles.neomorph}>
         
           
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.firstName}>{item.message}</Text>
            
              </View>
              <View style={{flex: 1, alignItems: 'flex-end',justifyContent:"flex-end"}}>
                <NeumorphicText style={{color:'#07b6ff',padding:10}}> {formatTime (item.createdAt)}</NeumorphicText>
              </View>
            
          </View>
        
      </NeumorphicView>
    )}
  </TouchableOpacity>
    // <View style={{ padding: 10 }}>
    //   <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
    //   {formatTime (item.createdAt)}

    //   </Text>
    //   <Text>{item.message}</Text>
    // </View>
  );
  const NeumorphicView = ({ children }) => {
    return (
      <View style={styles.outerShadow}>
        <View style={styles.innerShadow}>
          <LinearGradient colors={['#EDEFF4', '#D8D9E5']} style={styles.background}>
            {children}
          </LinearGradient>
        </View>
      </View>
    );
  };
  const NeumorphicViewPicker = ({ children }) => {
    return (
      <View style={styles.outerShadowpicker}>
        <View style={styles.innerShadowpicker}>
          <LinearGradient colors={['#EDEFF4', '#D8D9E5']} style={styles.backgroundpicker}>
            {children}
          </LinearGradient>
        </View>
      </View>
    );
  };
const onClose =()=>{
    setAlertMessage('')
}
  return (
   
    <View style={{ flex: 1, padding: 20,marginTop:60  }}>
 <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 10 }}>
        
        {alertMessage !== '' && (
            
              <View style={{flexDirection:'row',padding:10,}}>
        
        <Text style={alertVariant === 'success' ? styles.successText : styles.dangerText}>
          {alertMessage}
        </Text>
        <TouchableOpacity onPress={() =>onClose()} style={{flex:1, justifyContent:"flex-end",alignItems:'flex-end' }}>
        <Text style={{color:'#07b6ff',fontSize:20}}>Done</Text> 
    </TouchableOpacity>
    </View>
  
      )}
<View style={{ backgroundColor: colors.background }}>


      <SegmentedControlTab
        values={['EnquiryDetails', 'Messages']}
        selectedIndex={customStyleIndex}
        onTabPress={handleCustomIndexSelect}
        tabsContainerStyle={{ height: 50 }}
        tabStyle={{
          backgroundColor: colors.card,
  
          borderWidth: 1,
          borderColor: colors.border,
          elevation: 2,
          shadowColor: colors.border,
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
        }}
        activeTabStyle={{
          backgroundColor: "#07b6ff",
          marginTop: 2,
        }}
        tabTextStyle={{ color: colors.text, fontWeight: 'bold' }}
        activeTabTextStyle={{ color: colors.background }}
      />



      <View style={{borderWidth:0.2,borderColor:'silver'}}/>
      {customStyleIndex === 0 && (
       <View>
         <NeumorphicView>
        <View style={styles.neomorph}>
          <View style={styles.contentContainer}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10,textAlign:"center" }}>
              {item.firstName}{' '}{item.lastName}
            </Text>
        
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16 }}><Text style={{ fontSize: 18,color:'#007bff' }}>Email</Text>:{'  '}{item.emailID}</Text>
              <Text style={{ fontSize: 16 }}><Text style={{ fontSize: 18,color:'#007bff' }}>Phone</Text>:{'  '}{item.phoneNumber}</Text>
              <Text style={{ fontSize: 16 }}><Text style={{ fontSize: 18,color:'#007bff' }}>Birthday</Text>:{'  '}{item.clientAgeGroupDOB}</Text>
              <Text style={{ fontSize: 16 }}><Text style={{ fontSize: 18,color:'#007bff' }}>Gender</Text>:{"  "}{item.gender}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <NeumorphicText style={{ fontSize: 18, fontWeight: '500', marginRight: 10 }}>Status</NeumorphicText>
            <View>
    {isLoading ? (
      <NeumorphicViewPicker >
      <View style={{ borderRadius: 10,
    shadowOpacity: 0.9,
    elevation:0.5,
    shadowRadius: 10,
    backgroundColor: '#E0E5EC',
    width: width * 0.5,
  height:50,
  alignItems:'center',
  justifyContent:"center" }}>
      <ActivityIndicator size="small" color="#07b6ff" />
      </View>
      </NeumorphicViewPicker>
    ) : (
      <NeumorphicViewPicker >
        <View style={styles.neomorphpicker}>
        <Picker
          selectedValue={selectedStatus}
          onValueChange={newStatus => handleChange(newStatus)}
          style={{ height: 10, width: 200,marginBottom:40 }}
        >
          <Picker.Item label="New" value="Converted to Account" />
          <Picker.Item label="In Progress" value="In progress" />
          <Picker.Item label="Closed" value="Closed" />
          <Picker.Item label="Open" value="Open" />
          <Picker.Item label="Hold" value="Hold" />
        </Picker>
        </View>
      </NeumorphicViewPicker>
    )}
  </View>
       </View>
          <View style={{marginTop:20}}>
       <NeumorphicButton
  title={isLoadingConvert ? <ActivityIndicator color="white" size="small" /> : "Convert Account"}
  disabled={isLoadingConvert} onPress={() => convertToAccount(item.id)}
/>
</View>
          </View>
        </View>
      </NeumorphicView>
      <NeumorphicView>
      <View style={styles.neomorph1}>
      <TouchableOpacity onPress={toggleExpansion} style={{ marginBottom: 10,flexDirection:"row" }}>
              <Text style={{ fontSize: 16, color: '#07b6ff',marginTop:10  }}>
                Other details...
              </Text>
              <View style={{justifyContent:"flex-end",alignItems:'flex-end',flex:1}}>
              <Image style={{height:30,width:30}} source={{uri:"https://cdn-icons-png.flaticon.com/128/2951/2951226.png"}} />
              </View>
            </TouchableOpacity>
            {isExpanded && (
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 25,color:"black" }}>Requests</Text>
                <Text style={{ fontSize: 16,padding:5 }}>{item.requestDetails}</Text>
                <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 25,color:"black" }}>Initial Availability</Text>
                <Text style={{ fontSize: 16,padding:5 }}>{item.initialMeetingAvailability}</Text>
                <Text style={{ fontSize: 25,color:"black" }}>Address</Text>
                <Text style={{ fontSize: 16,padding:5 }}>{item.address}</Text>
              </View>
              </View>
            
             
          
     
            
            )}
            
            </View>
            
      </NeumorphicView>
      <NeumorphicView>
      <View style={styles.neomorph1}>
        <TouchableOpacity onPress={toggleExpansion1} style={{ marginBottom: 10, flexDirection: "row" }}>
          <Text style={{ fontSize: 16, color: '#07b6ff', marginTop: 10 }}>
            Add message
          </Text>
          <View style={{ justifyContent: "flex-end", alignItems: 'flex-end', flex: 1 }}>
            <Image style={{ height: 30, width: 30 }} source={{ uri: "https://cdn-icons-png.flaticon.com/128/2951/2951226.png" }} />
          </View>
        </TouchableOpacity>
        {isExpanded1 && (
        <View>
            <TouchableWithoutFeedback>
              <TextInput
                multiline={true}
                numberOfLines={4}
                value={message}
                onChangeText={ setMessage}
                style={{ backgroundColor: 'white', borderRadius: 10, elevation: 5 }}
              />
            </TouchableWithoutFeedback>
            <View style={{padding:10,alignItems:"center"}}>
            <NeumorphicButton
  disabled={isLoadingm} 
  title={isLoadingm ? <ActivityIndicator color="white" size="small" /> : "Send"} 
  onPress={() => sendMessage(item.id)} 
  style={{ marginTop: 10, borderRadius:20 }} 
/>


          </View>
        </View>
        )}
      </View>
    </NeumorphicView>
       </View>
      )}
      {customStyleIndex === 1 && (
        <View >
      
          <FlatList showsVerticalScrollIndicator={false}
          data={messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
          renderItem={renderItem}
        
        
        />
        </View>
      )}
         {customStyleIndex === 2 && (
        <Text style={styles.tabContent}> </Text>
      )}
  </View>
 
  </ScrollView>  
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
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
    width: width * 0.85,
    padding: 20,
  },
  neomorph1: {
    borderRadius: 20,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    backgroundColor: '#E0E5EC',
    width: width * 0.85,
    padding: 10,
  },
  neomorph2: {
    borderRadius: 10,
    shadowOpacity: 0.9,
    elevation:0.5,
    shadowRadius: 10,
    backgroundColor: '#E0E5EC',
    width: width * 0.6,
    padding: 10,
  },
  neomorphpicker: {
    borderRadius: 10,
    shadowOpacity: 0.9,
    elevation:0.5,
    shadowRadius: 10,
    backgroundColor: '#E0E5EC',
    width: width * 0.5,
  height:50,
    flexDirection:"row",
  },
  neomorphAlert: {
    borderRadius: 10,
    shadowOpacity: 0.9,
    elevation:0.5,
    shadowRadius: 10,
    backgroundColor: '#E0E5EC',
    width: width * 0.9,
  height:50,
    flexDirection:"row",
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
        shadowOpacity:5,
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
      outerShadowpicker: {
        shadowColor: '#b2b2b2',
        shadowOffset: {
          width: -5,
          height: -5,
        },
        shadowOpacity:10,
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
      background: {
        borderRadius: 15,
        padding: 10,
      },
      backgroundpicker: {
        borderRadius: 10,
        padding: 2,
      },
      dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
      },
      dropdownLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
      },
      dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
      },
      successText: {
        color: 'green',
        marginTop: 10,
        fontSize:20,
      },
      dangerText: {
        color: 'red',
        marginTop: 10,
        fontSize:20,
      },
  });
  
  