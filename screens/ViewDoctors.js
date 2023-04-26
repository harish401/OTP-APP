import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text,TouchableOpacity,ActivityIndicator, ScrollView } from 'react-native';
import NeumorphicView from '../components/NeumorphicView';
import NeumorphicInput from '../components/input';

export default function ViewDoctors() {
  const doctorData = {
    lastName,
    firstName,
    experience,
    phoneNumber,
    location,
    emailID,
    availableTime,
    availableDays,
    specialization,
    hospitalAffiliations,
    doctorDOB,
    gender,
    biography,
    city,
    pincode,
  };
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [experience, setExperience] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [emailID, setEmailID] = useState('');
  const [availableTime, setAvailableTime] = useState('');
  const [availableDays, setAvailableDays] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [hospitalAffiliations, setHospitalAffiliations] = useState('');
  const [doctorDOB, setDoctorDOB] = useState('');
  const [gender, setGender] = useState('');
  const [biography, setBiography] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date) => {
    setStartDate(date);
  };
  const [maleChecked, setMaleChecked] = useState(false);
  const [femaleChecked, setFemaleChecked] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);

  return (
    <ScrollView>
    <NeumorphicView style={styles.container}>
      <Text style={styles.heading}>Doctor Form</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label} label="Last Name"></Text>
        <NeumorphicInput
          style={styles.input}
          value={lastName}
          placeholder="Enter Last Name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <NeumorphicInput
          style={styles.input}
          value={firstName}
          placeholder="Enter First Name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Experience</Text>
        <NeumorphicInput
          style={styles.input}
          value={experience}
          placeholder="Enter Experience"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <NeumorphicInput
          style={styles.input}
          value={phoneNumber}
          placeholder="Enter Phone Number"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <NeumorphicInput
          style={styles.input}
          value={location}
          placeholder="Enter Location"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email ID</Text>
        <NeumorphicInput
          style={styles.input}
          value={emailID}
          placeholder="Enter Email ID"
        />
      </View>
      {/* <View style={styles.inputContainer}>
    <Text style={styles.label}>Date of Birth</Text>
    <DatePicker
      style={{ width: "100%" }}
      date={doctorDOB}
      mode="date"
      placeholder="Select Date of Birth"
      format="YYYY-MM-DD"
      minDate="1920-01-01"
      maxDate={moment().format("YYYY-MM-DD")}
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      customStyles={{
        dateIcon: {
          position: "absolute",
          left: 0,
          top: 4,
          marginLeft: 0,
        },
        dateInput: {
          marginLeft: 36,
        },
      }}
      onDateChange={(date) => setDoctorDOB(date)}
    />
  </View>
  <View style={styles.inputContainer}>
    <Text style={styles.label}>Gender</Text>
    <View style={styles.radioContainer}>
      <RadioButton
        value="male"
        status={maleChecked ? "checked" : "unchecked"}
        onPress={() => {
          setMaleChecked(!maleChecked);
          setFemaleChecked(false);
          setGender("male");
        }}
        color="#13D6DC"
      />
      <Text style={styles.radioLabel}>Male</Text>
      <RadioButton
        value="female"
        status={femaleChecked ? "checked" : "unchecked"}
        onPress={() => {
          setFemaleChecked(!femaleChecked);
          setMaleChecked(false);
          setGender("female");
        }}
        color="#13D6DC"
      />
      <Text style={styles.radioLabel}>Female</Text>
    </View>
  </View> */}
  <View style={styles.inputContainer}>
    <Text style={styles.label}>Biography</Text>
    <TextInput
      style={styles.input}
      value={biography}
      placeholder="Enter Biography"
      onChangeText={(value) => setBiography(value)}
    />
  </View>
  <View style={styles.inputContainer}>
    <Text style={styles.label}>City</Text>
    <TextInput
      style={styles.input}
      value={city}
      placeholder="Enter City"
      onChangeText={(value) => setCity(value)}
    />
  </View>
  <View style={styles.inputContainer}>
    <Text style={styles.label}>Pincode</Text>
    <TextInput
      style={styles.input}
      value={pincode}
      placeholder="Enter Pincode"
      keyboardType="number-pad"
      onChangeText={(value) => setPincode(value)}
    />
  </View>
  <TouchableOpacity style={styles.button} >
    {isLoading ? (
      <ActivityIndicator size="small" color="#fff" />
    ) : (
      <Text style={styles.buttonText}>Submit</Text>
    )}
  </TouchableOpacity>
  {alertMessage !== "" && (
    <Text >{alertMessage}</Text> 
  )}



</NeumorphicView>
</ScrollView>
);
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 20,
        textAlign: "center",
        },
        inputContainer: {
        marginBottom: 20,
        },
        label: {
        fontWeight: "bold",
        marginBottom: 5,
        },
        input: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

    },
});
