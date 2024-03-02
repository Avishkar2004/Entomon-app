import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const ThirdPage = () => {
  const [name, setName] = useState("");
  const navigation = useNavigation(); // Initialize navigation

  const handleRegister = () => {
    const trimmedName = name.trim();
    if (trimmedName === "") {
      // If name is empty, show an alert
      alert("Please enter your full name.");
    } else if (trimmedName.split(" ").length < 2) {
      // If name has less than two words, show an alert
      alert("Please enter a valid full name with at least two words.");
    } else {
      // Navigate to next page without showing an alert
      navigation.navigate("HomePage");
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Setup Your Entomon Account</Text>
        <Text style={styles.subtitle}>
          Your name helps sellers identify you.
        </Text>
        <Text style={styles.subtitle}>
          An email address lets us share tips received.
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name*</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your name"
            value={name}
            onChangeText={(text) => setName(text)} // Update name state
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your email (optional)"
          />
        </View>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          {/* route to render on next page */}
          <Link href={"/HomePage"} style={styles.registerButtonText}>
            Register
          </Link>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    color: "#666",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    width: "100%",
    color: "#333",
  },
  registerButton: {
    backgroundColor: "#007BFF",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    margin: 5,
  },
});

export default ThirdPage;
