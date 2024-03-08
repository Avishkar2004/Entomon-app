import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import {
  FontAwesome6,
  AntDesign,
  EvilIcons,
  Ionicons,
} from "@expo/vector-icons";
import Stepper from "./Stepper";

const PassCreation = () => {
  const [name, setName] = useState("");
  const [showFAQ, setShowFAQ] = useState(false); // State to control accordion visibility
  const [selectedQuestion, setSelectedQuestion] = useState(null); // State to track selected question

  const toggleAnswer = (index) => {
    if (selectedQuestion === index) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(index);
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

        <View style={styles.icons}>
          <Ionicons
            name="call-outline"
            size={24}
            color="blue"
            style={[styles.icon, styles.questionIcon]}
          />
          <AntDesign
            name="questioncircleo"
            size={24}
            color="blue"
            style={[styles.icon, styles.questionIcon]}
          />
          <AntDesign
            name="poweroff"
            size={24}
            color="blue"
            style={[styles.icon, styles.questionIcon]}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Stepper />
        <Text style={styles.verification}>
          We’ve sent a verification link to your email
        </Text>
        <Text style={styles.verification2}>Almost there....</Text>
        <Text style={styles.verification}>
          We need these details to set up your account.
        </Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Create Password *"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TouchableOpacity style={styles.sendOTPButton}>
            <Text style={styles.sendOTPText}>
              <EvilIcons name="eye" size={24} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.verification2}>Suggest Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Full Name *"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Enter Display Name *" />
        </View>
        <View style={styles.commisionPhoto}>
          <Image
            style={styles.photo}
            source={require("../../../assets/images/seller.png")}
          />
        </View>

        {/* Frequently Asked Questions */}
        <TouchableOpacity
          onPress={() => setShowFAQ(!showFAQ)}
          style={styles.faqHeader}
        >
          <Text style={styles.faqHeaderText}>Frequently Asked Questions</Text>
        </TouchableOpacity>
        {showFAQ && (
          <View style={styles.faqContent}>
            {faqData.map((faq, index) => (
              <View key={index}>
                <TouchableOpacity onPress={() => toggleAnswer(index)}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                </TouchableOpacity>
                {selectedQuestion === index && (
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
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
  commisionPhoto: {
    alignItems: "center",
    marginTop: 20,
  },
  photo: {
    width: 420,
    height: 350,
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
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    position: "relative",
    top: 20,
  },
  icon: {
    marginLeft: 10,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "flex-start", // Align icons to the left
    padding: 10,
    left: 220,
    gap: 12,
  },
  questionIcon: {
    marginLeft: "auto",
  },
  verification: {
    top: 25,
    left: 10,
    marginBottom: 27,
  },
  verification2: {
    color: "black",
    fontWeight: "bold",
    top: 30,
    marginBottom: 17,
    left: 10,
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
  faqHeader: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  faqHeaderText: {
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  faqContent: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  faqAnswer: {
    fontSize: 16,
    marginBottom: 10,
  },
});

// Sample FAQ data (replace with your own data)
const faqData = [
  {
    question: "Where will my store name be used ?",
    answer:
      "My registered office and warehouse are at two different locations, which pin code should I submit?",
  },
];

export default PassCreation;
