import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import { FontAwesome6, AntDesign } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { CheckBox } from "react-native-elements";
import { Link } from "expo-router";
import WhySell from "./WhySell";
import Stepper from "./Stepper";

const Index = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gstin, setGstin] = useState("");
  const [isSelectedAllCategories, setIsSelectedAllCategories] = useState(false);
  const [isSelectedBooks, setIsSelectedBooks] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = () => {
    //? Validate inputs before sending otp
    if (!name || !email || !gstin) {
      setError("Please enter all the details.");
      return;
    }
    // Implement send OTP functionality here
    console.log("Sending OTP...");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>{/* Header content */}</View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Stepper />
        {/* Form inputs */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name* :-</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Full Name *"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email :-</Text>
          <TextInput
            style={styles.input}
            placeholder="Email ID *"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter GSTIN :-</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter GSTIN *"
            value={gstin}
            onChangeText={(text) => setGstin(text)}
          />
        </View>
        {/* Error message */}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {/* Checkbox */}
        <View style={styles.checkboxContainer}>{/* Checkbox options */}</View>
        <Text style={styles.gstin}>
          GSTIN is required to sell products on Flipkart. You can also share it
          in the final step.
        </Text>
        {/* WhySell component */}
        <WhySell />
      </ScrollView>
      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.terms}>
            By continuing, I agree to Flipkart’s{" "}
            <Link href={"/Components/privacyPolicy"} style={styles.blue}>
              Terms of Use
            </Link>{" "}
            &{" "}
            <Link href={"/Components/privacyPolicy"} style={styles.blue}>
              Privacy Policy
            </Link>
          </Text>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleSendOTP}
          >
            <Link
              href={"/Components/Seller/PassCreation"}
              style={styles.continueText}
            >
              Continue With Number
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  icon: {
    marginLeft: 10,
  },
  questionIcon: {
    marginLeft: "auto",
  },
  checkIconContainer: {
    marginTop: 15,
    flexDirection: "column",
    alignItems: "center",
  },
  option: {
    flexDirection: "row",
    gap: 23,
  },
  optionText: {
    marginTop: 5,
    left: 12,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    position: "relative",
    top: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
  },
  sendOTPButton: {
    color: "black",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginLeft: -90,
  },
  sendOTPText: {
    color: "blue",
    fontWeight: "bold",
  },
  looking: {
    top: 12,
    fontWeight: "500",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  options: {
    left: 0,
  },
  gstin: {
    fontSize: 13,
    fontWeight: "bold",
    top: 12,
    bottom: 12,
  },
  terms: {
    top: 25,
  },
  blue: {
    color: "blue",
    fontWeight: "700",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
  },
  continueButton: {
    backgroundColor: "blue",
    paddingVertical: 7,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginTop: 45,
  },
  continueText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
});

export default Index;
