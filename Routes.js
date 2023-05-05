


import React from 'react';
import { View,TouchableOpacity,AsyncStorage,Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Fontisto } from '@expo/vector-icons';
import Entypo from "react-native-vector-icons/Entypo";
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from './screens/HomeScreen';
// import TableScreen from './screens/TableScreen';
// import OTPScreen from './screens/OTPScreen';
import Enquiries from './screens/Enquiries';
import Accounts from './screens/Accounts';
import Welcome from './Welcome';
import Login from './Login';
import ViewEnquiry from './screens/ViewEnquiry';
import Dashboard from './screens/Home';
import ViewAccount from './screens/ViewAccount';
import SettingsScreen from './screens/Settings';
import NeumorphicText from './components/Text';
import Doctors from "./screens/doctors"
import ViewDoctors from './screens/ViewDoctors';
import EditDoctors from './screens/EditDoctor';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

export default function Routes() {
  const handleLogout = async () => {
  
    navigation.navigation('LoginStack')
  };
  

  const EnquiryTab = ({ navigation }) => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Stack"
          component={Enquiries}
          options={{
            headerShown: false,
  
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 10 }}
              >
                <Ionicons
                  name="chevron-back-outline"
                  size={30}
                  color="white"
                  backBehavior="history"
                />
              </TouchableOpacity>
            ),
          }}
        />
           <Stack.Screen
          name="ViewEnquiry"
          options={{
            backBehavior: "history",
           headerShown:false
          }}
          component={ViewEnquiry}
        />
       
         
      </HomeStack.Navigator>
    );
  };
  const DoctorTab = ({ navigation }) => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Stack"
          component={Doctors}
          options={{
            headerShown: false,
  
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 10 }}
              >
                <Ionicons
                  name="chevron-back-outline"
                  size={30}
                  color="white"
                  backBehavior="history"
                />
              </TouchableOpacity>
            ),
          }}
        />
           <Stack.Screen
          name="ViewDoctors"
          options={{
            backBehavior: "history",
           headerShown:false
          }}
          component={ViewDoctors}
        />
         <Stack.Screen
          name="EditDoctors"
          options={{
            backBehavior: "history",
           headerShown:false
          }}
          component={EditDoctors}
        />
       
         
      </HomeStack.Navigator>
    );
  };
  const AccountTab = ({ navigation }) => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Stack"
          component={Accounts}
          options={{
            headerShown: false,
  
            headerStyle: {
              backgroundColor: "black",
            },
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 10 }}
              >
                <Ionicons
                  name="chevron-back-outline"
                  size={30}
                  color="white"
                  backBehavior="history"
                />
              </TouchableOpacity>
            ),
          }}
        />
           <Stack.Screen
          name="ViewAccount"
          options={{
            backBehavior: "history",
           headerShown:false
          }}
          component={ViewAccount}
        />
       
         
      </HomeStack.Navigator>
    );
  };
  function CustomerTabs({ navigation }){
    return(
  
      <Tab.Navigator
     
          screenOptions={({ route }) => ({
            headerStyle: {
              backgroundColor: 'white',
              shadowColor: '#B7C4CF',
              shadowOffset: {
                width: -10,
                height: -10,
              },
              shadowOpacity: 1,
              shadowRadius: 20,
              elevation: 20,
            },
            headerTitleStyle: {
              fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
 
            },
            headerTitleAlign: 'center',
            headerShown: false,
            tabBarActiveTintColor: "#07b6ff",
            tabBarInactiveTintColor: "silver",
            tabBarStyle: [
              {
                display: "flex",
              },
              null,
            ],
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let iconNames;
              let iconNamesd;
  
              if (route.name === "Enquiries") {
                iconName = "share";
              }
               else if (route.name === "Home") {
                iconNames = "home";
              } 
             
              else if (route.name === "Settings") {
                iconName = "md-settings";
              } 
              else if (route.name === "Accounts") {
                iconName = "md-person";
              } 
              else if (route.name === "Doctors") {
                iconNamesd = "doctor";
              } 
              return (
              <View style={{flex:1,flexDirection:'row',}}>
              <Ionicons name={iconName} size={size} color={color} />
             <Fontisto name={iconNamesd} size={size} color={color} />
              <Entypo name={iconNames} size={size} color={color}/>
              
              </View>
              )
              ;
            },
          })}>
         <Tab.Screen name="Home" component={Dashboard}  options={{
          
          headerShown: false,
          headerTitle:'',

          

        }}
          />
        <Tab.Screen name="Enquiries" component={EnquiryTab}    options={({ navigation }) => ({
    headerShown: false,
    headerTitle: "Enquiries",
    headerRight: () => (
      <TouchableOpacity
        style={{
          backgroundColor: "#E0E5EC",
          borderRadius: 10,
          marginRight: 20,
          elevation: -10,
          width: 85,
        }}
        onPress={handleLogout}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            elevation: 25,
            width: 70,
            marginRight: 10,
          }}
        >
          <NeumorphicText style={{ color: "#07b6ff", padding: 7 }}>
            Logout
          </NeumorphicText>
        </View>
      </TouchableOpacity>
    ),
    // pass navigation object to options
    navigation: navigation,
  })}
              />
<Tab.Screen
  name="Accounts"
  component={AccountTab}
  options={{
    headerRight: () => (
      <TouchableOpacity onPress={handleLogout}>
        <NeumorphicText  style={{ color: '#07b6ff',padding:15 }}>Logout</NeumorphicText>
      </TouchableOpacity>
    ),
    backBehavior: "history",
    headerShown: false
  }}
/>
<Tab.Screen
  name="Doctors"
  component={DoctorTab}
  options={{
    headerRight: () => (
      <TouchableOpacity onPress={handleLogout}>
        <NeumorphicText  style={{ color: '#07b6ff',padding:15 }}>Logout</NeumorphicText>
      </TouchableOpacity>
    ),
    backBehavior: "history",
    headerShown: false
  }}
/>
                
           
               <Tab.Screen name="Settings" component={SettingsScreen} options={{
   headerShown: true,
              backBehavior: "history",
             }}
               />
   
      </Tab.Navigator>
    
  
    )
  }

  function LoginStack (){
    return(
  <Stack.Navigator>
       
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false,}} />
        
        
        </Stack.Navigator>
    )
  }
  function SplashStack (){
    return(
  <Stack.Navigator>
        <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{headerShown: false,
           
            }} />
         
        
        </Stack.Navigator>
    )
  }
  return (
      
    <NavigationContainer>
       <StatusBar backgroundColor='white'></StatusBar>
    <Stack.Navigator>
    <Stack.Screen name="SplashStack" component={SplashStack} options={{
          backBehavior: "history",
          animation:'fade',
            headerShown: false}} />
     
      <Stack.Screen name="LoginStack" component={LoginStack} options={{
        animation:"slide_from_left",
          backBehavior: "history",
            headerShown: false}} />
      
             <Stack.Screen name="CustomerTabs" component={CustomerTabs} options={{
            backBehavior: "history",
            animation:'slide_from_bottom',
            headerShown: false,
            headerStyle: {
              backgroundColor: "white",
            },
          }}
            />
      
 
    </Stack.Navigator>
   
    </NavigationContainer>
  );
}

