import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import { RadioButton } from "react-native-paper"; // Import RadioButton component
import { useRoute } from "@react-navigation/native";

const ChangeAddress = ({ productId }) => {
  const route = useRoute();
  const { product } = route.params;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pincode, setPincode] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [addressType, setAddressType] = useState("Home"); // Default to Home

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleUseCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const handleSaveAddress = () => {
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

    // send a put req to the backend endpoint
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
        // handle Error
        console.error("Error updating address: ", error);
        Alert.alert("Error", "Failed to update address");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Change Address</Text>
      <Button
        title="Use Current Location"
        onPress={handleUseCurrentLocation}
        style={styles.button}
      />
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
      <View style={styles.radioContainer}>
        <RadioButton.Group
          onValueChange={(newValue) => setAddressType(newValue)}
          value={addressType}
        >
          <View style={styles.radioOption}>
            <RadioButton value="Home" />
            <Text style={styles.radioText}>Home (Delivery all day)</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value="Work" />
            <Text style={styles.radioText}>
              Work (Delivery between 10AM to 5PM)
            </Text>
          </View>
        </RadioButton.Group>
      </View>
      <Button title="Save Address" onPress={handleSaveAddress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
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
