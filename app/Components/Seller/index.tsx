import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import { FontAwesome6, AntDesign } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { CheckBox } from "react-native-elements";
import { Link } from "expo-router";
import WhySell from "./WhySell";

const Index = () => {
  const [name, setName] = useState("");
  const [isSelectedAllCategories, setIsSelectedAllCategories] = useState(false);
  const [isSelectedBooks, setIsSelectedBooks] = useState(false);

  const handleSendOTP = () => {
    // Implement send OTP functionality here
    console.log("Sending OTP...");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
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
          <View style={styles.verticalBorder} />
        </View>
        <AntDesign
          name="questioncircleo"
          size={24}
          color="blue"
          style={[styles.icon, styles.questionIcon]}
        />
      </View>
      <View style={styles.option}>
        <View style={styles.checkIconContainer}>
          <AntDesign name="checkcircleo" size={24} color="black" />
          <Text style={styles.optionText}>Email Id & GST</Text>
        </View>
        <View style={styles.checkIconContainer}>
          <AntDesign name="checkcircleo" size={24} color="black" />
          <Text style={styles.optionText}>Password Creation</Text>
        </View>
        <View style={styles.checkIconContainer}>
          <AntDesign name="checkcircleo" size={24} color="black" />
          <Text style={styles.optionText}>Onbroad Dashing</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name* :-</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile Number *"
            value={name}
            onChangeText={(text) => setName(text)} // Update name state
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
        <Text style={styles.label}>Email :-</Text>
        <TextInput style={styles.input} placeholder="Email ID *" />
      </View>
      <View style={styles.options}>
        <Text style={styles.looking}>
          What are you looking to sell on Flipkart?
        </Text>
        <View style={styles.checkboxContainer}>
          <CheckBox
            title="All categories"
            checked={isSelectedAllCategories}
            onPress={() => setIsSelectedAllCategories(!isSelectedAllCategories)}
          />
          <CheckBox
            title="Books"
            checked={isSelectedBooks}
            onPress={() => setIsSelectedBooks(!isSelectedBooks)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter GSTIN :-</Text>
          <TextInput style={styles.input} placeholder="Enter GSTIN *" />
        </View>
        <Text style={styles.gstin}>
          GSTIN is required to sell products on Flipkart. You can also share it
          in the final step.
        </Text>
        {/* for showing why sell info  */}
        <WhySell />
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
        <TouchableOpacity style={styles.continueButton}>
          <Link style={styles.continueText} href={"/SecondPage"}>
            Continue With Number
          </Link>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100, // Adjust this value according to the height of your button
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // Background color
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CCCCCC", // Border color
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  verticalBorder: {
    height: "100%",
    width: 1,
    backgroundColor: "#CCCCCC", // Border color
    marginHorizontal: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333", // Text color
  },
  icon: {
    marginLeft: 10,
  },
  questionIcon: {
    marginLeft: "auto",
  },
  checkIconContainer: {
    marginTop: 15, // Adjust as needed
    flexDirection: "column", // Display icon and text in a column
    alignItems: "center",
  },
  option: {
    flexDirection: "row",
    gap: 23,
  },
  optionText: {
    marginTop: 5, // Adjust as needed
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
    marginLeft: -90, // Adjust as needed
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
