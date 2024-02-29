import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CountryPicker } from "react-native-country-codes-picker";

const SecondPage = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [buttonScale] = useState(new Animated.Value(1));

  // Function to handle continue button press
  const handleContinue = () => {
    // Validate phone number
    if (phoneNumber.trim() === "") {
      alert("Please enter your phone number.");
      return;
    }
    if (phoneNumber.length !== 10) {
      alert("Please enter a 10-digit phone number.");
      return;
    }

    // Navigate to the next page if phone number is entered
    navigation.navigate("ThirdPage");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* Title */}
      <Text style={{ fontSize: 24.5, marginBottom: 20 }}>
        Enter the number for verification
      </Text>

      {/* Explanation */}
      <Text style={{ fontSize: 12, marginBottom: 20, textAlign: "center" }}>
        This number will be used for all rides and shopping-related
        communication. You shall receive an SMS with a code for verification.
      </Text>

      {/* Country Picker and Input Field */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Country picker button */}
        <TouchableOpacity
          onPress={() => setShow(true)}
          style={{
            width: 80,
            height: 40,
            padding: 10,
            marginBottom: 20,
            marginRight: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "gray",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "black", fontSize: 16 }}>{countryCode}</Text>
        </TouchableOpacity>

        {/* CountryPicker component */}
        <CountryPicker
          show={show}
          pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code);
            setShow(false);
          }}
        />

        {/* Phone number input */}
        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            paddingHorizontal: 10,
            marginBottom: 20,
            fontSize: 16,
            marginLeft: 10,
            borderRadius: 5,
          }}
          onChangeText={(text) => {
            // Remove non-numeric characters
            const formattedText = text.replace(/[^0-9]/g, "");
            // Limit to 10 digits
            if (formattedText.length <= 10) {
              setPhoneNumber(formattedText);
            }
          }}
          value={phoneNumber}
          placeholder="Enter Phone Number"
          keyboardType="phone-pad"
        />
      </View>

      {/* Continue with number button */}
      <TouchableOpacity
        onPress={handleContinue}
        activeOpacity={0.8}
        style={{
          backgroundColor: "blue",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          transform: [{ scale: buttonScale }],
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>
          Continue with Number
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SecondPage;
