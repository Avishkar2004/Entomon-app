import { Link } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";

const SecondPage = () => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleContinue = () => {
    // Implement your logic for continuing with the phone number
    console.log("Continue with phone number:", countryCode, phoneNumber);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24.5, marginBottom: 20 }}>
        Enter the number for verification
      </Text>

      {/* Text related to phone number */}
      <Text style={{ fontSize: 12, marginBottom: 20, textAlign: "center" }}>
        This number will be used for all rides and shopping-related
        communication. You shall receive an SMS with a code for verification.
      </Text>

      {/* Parent View for Country Picker and Input Field */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Country picker */}
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

        {/* Input field for phone number */}
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
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          placeholder="Enter Phone Number"
          keyboardType="phone-pad"
        />
      </View>

      {/* Continue with number button */}
      <TouchableOpacity
        onPress={handleContinue}
        style={{
          backgroundColor: "blue",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
        }}
      >
        <Link href={"/ThirdPage"} style={{ color: "white", fontSize: 16 }}>
          Continue with Number
        </Link>
      </TouchableOpacity>
    </View>
  );
};

export default SecondPage;
