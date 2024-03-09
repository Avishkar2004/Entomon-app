import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import { FontAwesome6, AntDesign } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { CheckBox } from "react-native-elements";
import { Link, useNavigation } from "expo-router";
import WhySell from "./WhySell";
import Stepper from "./Stepper";

const Index = () => {
  const navigation = useNavigation(); // Initialize useNavigation hook
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gstin, setGstin] = useState("");
  const [isSelectedAllCategories, setIsSelectedAllCategories] = useState(false);
  const [isSelectedBooks, setIsSelectedBooks] = useState(false);

  const handleSendOTP = () => {
    console.log("Sending OTP...");
  };

  const validateMobileNumber = (number) => {
    // Basic mobile number validation (assuming it's a 10-digit number)
    return /^\d{10}$/.test(number);
  };

  const validateEmail = (email) => {
    // Basic email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const validateGstin = (gstin) => {
    // Basic GSTIN validation
    return gstin.length === 15; // Assuming GSTIN is 15 characters long
  };

  const handleContinue = () => {
    if (!validateMobileNumber(number)) {
      alert("Please enter a valid number .");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid Email.");
      return;
    }

    if (!validateGstin(gstin)) {
      alert("Please enter a valid GSTIN.");
      return;
    } else {
      // Navigate to the next page if validation passes
      navigation.navigate("Components/Seller/PassCreation");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../../../assets/images/Logo.jpeg")}
        />
        <FontAwesome6
          style={{ marginLeft: 12 }}
          name="bag-shopping"
          size={24}
          color="blue"
        />
        <AntDesign
          name="questioncircleo"
          size={24}
          color="blue"
          style={[styles.icon, styles.questionIcon]}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Stepper />
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Mobile Number *"
              value={number}
              onChangeText={(text) => setNumber(text)}
            />
            <TouchableOpacity
              style={styles.sendOTPButton}
              onPress={handleSendOTP}
            >
              <Text style={styles.sendOTPText}>Send OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Email ID *"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.options}>
          <Text style={styles.looking}>
            What are you looking to sell on Flipkart?
          </Text>
          <View style={styles.checkboxContainer}>
            <CheckBox
              title="All categories"
              checked={isSelectedAllCategories}
              onPress={() =>
                setIsSelectedAllCategories(!isSelectedAllCategories)
              }
            />
            <CheckBox
              title="Books"
              checked={isSelectedBooks}
              onPress={() => setIsSelectedBooks(!isSelectedBooks)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter GSTIN *"
              value={gstin}
              onChangeText={(text) => setGstin(text)}
            />
          </View>
          <Text style={styles.gstin}>
            GSTIN is required to sell products on Flipkart. You can also share
            it in the final step.
          </Text>
          <WhySell />
        </View>
      </ScrollView>
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
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>Continue With Number</Text>
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
