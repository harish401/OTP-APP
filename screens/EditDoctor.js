import React, { useState,useEffect } from 'react';
import { StyleSheet, TextInput, View, Text,TouchableOpacity,ActivityIndicator, ScrollView,Button,Switch,Modal } from 'react-native';
import NeumorphicView from '../components/NeumorphicView';
import NeumorphicInput from '../components/input';
import NeumorphicText from '../components/Text';
import NeumorphicButton from '../components/NeumorphicButton';
import DateTimePicker from "@react-native-community/datetimepicker";
import { FormatDateCorrect } from '../components/date';

export default function EditDoctors({route}) {
  const { item } = route.params;
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
  const [show, setShow] = useState(false);
  
 
  
  useEffect(() => {
    const fetchDoctorData = async () => {
        try {
          const response = await fetch(
            `https://api.speech4all.com/admin/doctors/${item.id}`
          );
          const data = await response.json();
          console.log(item.firstName)
          setFirstName(item.firstName);
          setLastName(item.lastName);
          setEmailID(item.emailID);
          setPhoneNumber(item.phoneNumber);
          setSpecialization(item.specialization);
          setLocation(item.location);
          setExperience(item.experience);
          setHospitalAffiliations(item.hospitalAffiliations);
          setAvailableDays(item.availableDays);
          setPincode(parseInt(item.pincode));
    
          setStartDate(new Date(item.doctorDOB));
    
          item.gender === "male" ? setMaleChecked(true) : setFemaleChecked(true);
          setBiography(item.biography);
          setAvailableTime(item.availableTime);
          setCity(item.city);
          setIsLoading1(false);
        } catch (error) {
          console.error(error);
          setAlertMessage(error.message || 'Unknown error occurred');
          setAlertVariant('danger');
        }
      };
    
      if (item.id) {
        fetchDoctorData();
      }
    console.log(JSON.stringify(item.id));
    setIsLoading1(true);
  
    
  }, [item.id]);
  const handleSubmit = async (id) => {
    setIsLoading(true);
    try {
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
        doctorDOB : startDate,
        gender: maleChecked ? 'male' : 'female',
        biography,
        city,
        pincode: parseInt(pincode),
      };
  
      const response = await fetch(`https://api.speech4all.com/admin/doctors/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(doctorData)
      });
  
      setIsLoading(false);
      if (response.status === 200) {
        setAlertMessage('Doctor updated successfully');
       
      } else {
        const message = await response.text();
        setAlertMessage(message);
        setAlertVariant('primary');
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setAlertMessage(error.message || 'Unknown error occurred');
      setAlertVariant('danger');
    }
  };
  
  const handleChange = (date) => {
    setStartDate(date);
  };
  const [maleChecked, setMaleChecked] = useState(false);
  const [femaleChecked, setFemaleChecked] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
const Alert =({title})=>{
  return(
   
    <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>{title}</Text>
      <View style={styles.modalButtons}>
  
        <TouchableOpacity    onPress={() => setAlertMessage("")} >
          <NeumorphicText style={styles.modalConfirm}>ok</NeumorphicText>
        </TouchableOpacity>
      </View>
    </View>
  </View>

  )
}

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <NeumorphicText style={styles.title}>Doctor Information</NeumorphicText>
      {alertMessage !== "" && (
          <View style={styles.alert}>
            <Alert title={alertMessage} />
          </View>
        )}
      <View style={styles.inputGroupRow}>
  <View style={[styles.inputGroup, { flex: 1 }]}>
    <Text style={styles.label}>First Name</Text>
    <TextInput
      style={styles.input}
      value={firstName}
      onChangeText={setFirstName}
    />
  </View>
  <View style={[styles.inputGroup, { flex: 1 }]}>
    <Text style={styles.label}>Last Name</Text>
    <TextInput
      style={styles.input}
      value={lastName}
      onChangeText={setLastName}
    />
  </View>
</View>



      <View style={styles.inputGroup}>
      
      </View>
    

<View style={styles.inputGroup}>
        <Text style={styles.label}>Experience</Text>
        <TextInput
          style={styles.input}
          value={experience}
          onChangeText={setExperience}
          keyboardType='numeric'
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType='phone-pad'
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email ID</Text>
        <TextInput
          style={styles.input}
          value={emailID}
          onChangeText={setEmailID}
          keyboardType='email-address'
        />
      </View>
  
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Specialization</Text>
        <TextInput
          style={styles.input}
          value={specialization}
          onChangeText={setSpecialization}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Hospital Affiliations</Text>
        <TextInput
          style={styles.input}
          value={hospitalAffiliations}
          onChangeText={setHospitalAffiliations}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Doctor DOB</Text>
        <TouchableOpacity onPress={() => setShow(true)}>
        <Text
          style={styles.input}>{FormatDateCorrect(startDate)}</Text>
          


      
                 {show && (
                        <DateTimePicker
                        
                        display={
                          Platform.OS === "ios" ? "clock" : "default"
                        }
                        style={{width: 320,flex:1}} 
                          testID="dateTimePicker"
                          value={startDate !== "" ? new Date(startDate) : new Date()}
                          mode={"date"}
                          minimumDate={new Date('1900-01-01')}
                          onChange={(date) => {
                            setShow(false);
                            setStartDate(new Date(date.nativeEvent.timestamp));
                          }}
                        />
                      )}
                      </TouchableOpacity>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.switchGroup}>
          <View style={styles.switchLabel}>
            <Text style={styles.switchText}>Male</Text>
            <Switch value={maleChecked} onValueChange={setMaleChecked} />
          </View>
          <View style={styles.switchLabel}>
            <Text style={styles.switchText}>Female</Text>
            <Switch value={femaleChecked} onValueChange={setFemaleChecked} />
          </View>
        </View>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Biography</Text>
        <TextInput
          style={styles.input}
          value={biography}
          onChangeText={setBiography}
          multiline
          numberOfLines={4}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>pincode</Text>
        <TextInput
          style={styles.input}
          value={pincode}
          onChangeText={setPincode}
          keyboardType="number-pad"
        />
      </View>

  


      <View style={styles.inputGroup}>
        <Text style={styles.label}>Biography</Text>
        <TextInput
          style={styles.input}
          value={biography}
          onChangeText={setBiography}
          multiline
          numberOfLines={4}
        />
      </View>
     
 


      <View style={styles.inputGroup}>
        <Text style={styles.label}>Available Time</Text>
        <TextInput
          style={styles.input}
          value={availableTime}
          onChangeText={setAvailableTime}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Available Days</Text>
        <TextInput
          style={styles.input}
          value={availableDays}
          onChangeText={setAvailableDays}
        />
      </View>
      <View style={styles.buttonGroup}>
        <NeumorphicButton 
          title="Submit  profile"
          onPress={handleSubmit}
          disabled={isLoading}
          
        />
     
        
      </View>

    </ScrollView>
  );

}


const styles = StyleSheet.create({
  container: {
  flexGrow: 1,
  padding: 20,
  paddingTop: 50,
  backgroundColor: "#f5f5f5",
  },
  title: {
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: 20,
  color:'#007bff'
  },
  inputGroup: {
  marginBottom: 15,
  },
  inputGroupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
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
  label: {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 5,
  },
  input: {
  padding: 10,
  backgroundColor: "#ffffff",
  borderRadius: 5,
  borderWidth: 1,
  borderColor: "#cccccc",
  },
  switchGroup: {
  flexDirection: "row",
  justifyContent: "space-between",
  },
  switchLabel: {
  flexDirection: "row",
  alignItems: "center",
  },
  switchText: {
  marginRight: 10,
  },
  buttonGroup: {
  marginTop: 10,
 justifyContent:'center',
 alignItems:'center',
  },
  alert: {
  marginTop: 20,
  },
  });