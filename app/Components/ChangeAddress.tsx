import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location"; // Import Location from Expo for accessing device location
import { RadioButton } from "react-native-paper"; // Import RadioButton component from react-native-paper
import { useRoute, useNavigation } from "@react-navigation/native"; // Import useRoute and useNavigation hooks
import { AntDesign } from "@expo/vector-icons"; // Import AntDesign icons

const ChangeAddress = () => {
  const navigation = useNavigation(); // Initialize navigation
  const route = useRoute(); // Access route object
  const productId = route.params?.productId;
  console.log("Route Params:", route.params);
  console.log("Product Id is:", route.params.productId);
  const [location, setLocation] = useState(null); // State to store device location
  const [errorMsg, setErrorMsg] = useState(null); // State for error message
  const [pincode, setPincode] = useState(""); // State for pincode input
  const [locality, setLocality] = useState(""); // State for locality input
  const [city, setCity] = useState(""); // State for city input
  const [state, setState] = useState(""); // State for state input
  const [landmark, setLandmark] = useState(""); // State for landmark input
  const [addressType, setAddressType] = useState("Home"); // State for address type (Home/Work)

  useEffect(() => {
    // Function to fetch current location on component mount
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); // Request location permission
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({}); // Get current location
      setLocation(location);
    })();
  }, []);

  const handleUseCurrentLocation = async () => {
    // Function to use current location as address
    let { status } = await Location.requestForegroundPermissionsAsync(); // Request location permission
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({}); // Get current location
    setLocation(location);
  };

  const handleSaveAddress = () => {
    // Function to save updated address
    const data = {
      address: {
        pincode,
        locality,
        city,
        state,
        landmark,
        addressType,
      },
    };

    fetch(`http://localhost:8000/cart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Address updated successfully:", data);
        Alert.alert("Success", "Address updated successfully");
      })
      .catch((error) => {
        console.error("Error updating address: ", error);
        Alert.alert("Error", "Failed to update address");
      });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="#007bff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.heading}>Change Address</Text>
      </View>

      {/* Button to use current location */}
      <Button
        title="Use Current Location"
        onPress={handleUseCurrentLocation}
        style={styles.button}
      />

      {/* Text inputs for address details */}
      <TextInput
        style={styles.input}
        placeholder="Pincode"
        value={pincode}
        onChangeText={setPincode}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Locality (Area and Street)"
        value={locality}
        onChangeText={setLocality}
      />
      <TextInput
        style={styles.input}
        placeholder="City/District/Town"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder="Landmark (Optional)"
        value={landmark}
        onChangeText={setLandmark}
      />

      {/* Radio buttons for address type */}
      <View style={styles.radioContainer}>
        <RadioButton.Group
          onValueChange={(newValue) => setAddressType(newValue)}
          value={addressType}
        >
          <View style={styles.radioOption}>
            <RadioButton value="Home" color="#007bff" />
            <Text style={styles.radioText}>Home (Delivery all day)</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value="Work" color="#007bff" />
            <Text style={styles.radioText}>
              Work (Delivery between 10AM to 5PM)
            </Text>
          </View>
        </RadioButton.Group>
      </View>

      {/* Button to save address */}
      <Button title="Save Address" onPress={handleSaveAddress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#007bff",
  },
  button: {
    marginBottom: 20,
    backgroundColor: "#007bff",
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  radioContainer: {
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default ChangeAddress;
