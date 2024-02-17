import { Link } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ThirdPage = () => {
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
          <TextInput style={styles.input} placeholder="Type your name " />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your email (optional)"
          />
        </View>
        <TouchableOpacity style={styles.registerButton}>
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
