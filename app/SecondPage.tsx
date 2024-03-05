import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CountryPicker } from "react-native-country-codes-picker";

const SecondPage = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [buttonScale] = useState(new Animated.Value(1));

  const handleContinue = () => {
    if (phoneNumber.trim() === "") {
      alert("Please enter your phone number.");
      return;
    }
    if (phoneNumber.length !== 10) {
      alert("Please enter a 10-digit phone number.");
      return;
    }

    navigation.navigate("ThirdPage");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Enter the number for verification</Text>

      <Text style={styles.description}>
        This number will be used for all rides and shopping-related
        communication. You shall receive an SMS with a code for verification.
      </Text>

      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={() => setShow(true)}
          style={styles.countryPickerButton}
        >
          <Text style={styles.countryPickerButtonText}>{countryCode}</Text>
        </TouchableOpacity>

        <CountryPicker
          show={show}
          pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code);
            setShow(false);
          }}
        />

        <TextInput
          style={styles.phoneNumberInput}
          onChangeText={(text) => {
            const formattedText = text.replace(/[^0-9]/g, "");
            if (formattedText.length <= 10) {
              setPhoneNumber(formattedText);
            }
          }}
          value={phoneNumber}
          placeholder="Enter Phone Number"
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity
        onPress={handleContinue}
        activeOpacity={0.8}
        style={styles.continueButton}
      >
        <Text style={styles.continueButtonText}>Continue with Number</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007BFF",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  countryPickerButton: {
    width: 80,
    height: 40,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  countryPickerButtonText: {
    color: "black",
    fontSize: 16,
  },
  phoneNumberInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default SecondPage;
