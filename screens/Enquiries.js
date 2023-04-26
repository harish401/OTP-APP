import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import NeomorphismLoading from "../components/Loader";
import NeumorphicHeader from "../components/Header";
import { useFocusEffect } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import NeumorphicButton from "../components/NeumorphicButton";
import NeumorphicText from "../components/Text";
import { Searchbar } from "react-native-paper";
import { Dimensions } from "react-native";
import LogoutButton from "../components/logoutBtn";
import NeumorphicView from "../components/NeumorphicView";

const { width } = Dimensions.get("window");
export default function Enquiries({ navigation }) {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
 

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);

      fetch(
          "https://api.speech4all.com/admin/enquiry"
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
  useEffect(() => {

    setFilteredDataSource(accounts);

  }, [accounts]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = accounts.filter(function (item) {
        const itemData = item.firstName
          ? item.firstName.toUpperCase()
          : "".toUpperCase();
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ViewEnquiry", { item })}
      style={styles.itemContainer}
    >
      {isLoading ? (
        <View style={[styles.loadingIndicator, styles.neomorph]}>
          <View style={[styles.loadingItem, { opacity: 0.8 }]} />
          <BlurView tint="light" intensity={50}></BlurView>
        </View>
      ) : (
        <NeumorphicView>
          <View style={styles.neomorph}>
            <View style={styles.contentContainer}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.firstName}>{item.firstName}</Text>
                  <Text
                    style={{ color: "black", padding: 5 }}
                  >{`EmailID: ${item.emailID}`}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <NeumorphicText style={{ color: "#07b6ff", padding: 20 }}>
                    {" "}
                    {item.status === "Converted to Account"
                      ? "New"
                      : item.status}
                  </NeumorphicText>
                </View>
              </View>
            </View>
          </View>
        </NeumorphicView>
      )}
    </TouchableOpacity>
  );

  const handleLogoutConfirmed = async () => {
    // Remove the user type and username from AsyncStorage
    await AsyncStorage.removeItem('userType');
    await AsyncStorage.removeItem('username');
    // Reset the navigation stack to the Login screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginStack' }],
    });
  };
  const handleLogout = async () => {
    // Show the Logout modal
    setShowLogoutModal(true);
  };
  
  const handleLogoutCancelled = () => {
    // Hide the Logout modal
    setShowLogoutModal(false);
  };
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <View style={styles.container}>
      <NeumorphicHeader
        title={"Enquiries"}
        right={
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              backgroundColor: "gray",
              padding: 0,
              width: 80,
              borderRadius: 10,
              marginLeft: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 6,
                width: 65,
                borderRadius: 10,
                marginRight: 20,
                elevation: 15,
              }}
            >
              <NeumorphicText style={{ color: "#07b6ff" }}>
                Logout
              </NeumorphicText>
            </View>
            
          </TouchableOpacity>
        }
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#e0e5ec",
          borderRadius: 10,
        }}
      >
        <Searchbar
          style={{
            width: width,
            backgroundColor: "transparent",
            borderBottomWidth: 0,
            borderTopWidth: 0,
            marginLeft: 10,
          }}
          iconColor="#616161"
          placeholder="Search"
          onChangeText={searchFilterFunction}
          value={search}
          selectionColor="#616161"
        />
      </View>

      {filteredDataSource.length > 0 ? (
        <FlatList
          data={filteredDataSource}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <NeumorphicText style={{ fontSize: 20, color: "red" }}>
            No user found
          </NeumorphicText>
        </View>
      )}
          <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType={'fade'}
        onRequestClose={handleLogoutCancelled}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Are you sure you want to log out?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleLogoutCancelled}>
                <NeumorphicText style={styles.modalCancel}>Cancel</NeumorphicText>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogoutConfirmed}>
                <NeumorphicText style={styles.modalConfirm}>Logout</NeumorphicText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalCancel: {
    color: '#07b6ff',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalConfirm: {
    color: 'white',
    backgroundColor: '#07b6ff',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },

  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  loadingIndicator: {
    flexDirection: "column",
    alignItems: "stretch",
  },
  loadingItem: {
    height: 80,
    borderRadius: 8,
    margin: 8,
    backgroundColor: "#FFFFFF",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    blurRadius: 5,
  },
  loadedContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 16,
    padding: 16,
  },
  nameContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  neomorph: {
    borderRadius: 20,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    backgroundColor: "#E0E5EC",
    width: width * 0.9,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  firstName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6C7A89",
    padding: 5,
  },
  balance: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6C7A89",
  },
  outerShadow: {
    shadowColor: "#b2b2b2",
    shadowOffset: {
      width: -5,
      height: -5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  innerShadow: {
    shadowColor: "#ffffff",
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
  blurContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
