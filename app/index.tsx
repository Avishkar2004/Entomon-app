import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

const Page = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#e2e4e1", "#ffffff"]}
        style={styles.gradientBackground}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/Logo.jpeg")}
            style={styles.logo}
          />
        </View>
        <View style={styles.middleContainer}>
          <View style={styles.photoContainer}>
            <Image
              source={require("../assets/images/Logo.jpeg")}
              style={styles.photo}
            />
          </View>
          <View style={styles.photoContainer}>
            <Image
              source={require("../assets/images/Logo.jpeg")}
              style={styles.photo}
            />
          </View>
          <View style={styles.photoContainer}>
            <Image
              source={require("../assets/images/Logo.jpeg")}
              style={styles.photo}
            />
          </View>
        </View>
        <Text style={styles.shopping}>
          Explore the new ways of Agriculture Shopping
        </Text>
        <TouchableOpacity style={styles.continueButton}>
          <Link style={styles.continueText} href={"/SecondPage"}>
            Continue With Phone Number
          </Link>{" "}
        </TouchableOpacity>
      </LinearGradient>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          By continuing, you agree that you have read and accept our T&C and
          Privacy Policy
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  middleContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  photoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  shopping: {
    fontSize: 18,
    color: "black",
    padding: 10,
    textAlign: "center",
  },
  continueButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  continueText: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
  },
  footerContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    marginTop: 5,
    color: "#000",
  },
});

export default Page;
