import { Link } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
const Page = () => {
  return (
    <View style={styles.container}>
      <View style={styles.gradientBackground}>
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
        <Text style={styles.continueText}>
          <Link href={"/SecondPage"}>Continue With Phone Number</Link>
        </Text>
      </View>
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
    backgroundColor: "#e2e4e1",
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // Add position relative to position the logo absolutely
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
    fontSize: 15,
    color: "black",
    padding: 10,
    textAlign: "center",
  },
  continueText: {
    fontSize: 15,
    color: "#fff",
    marginTop: 20,
    backgroundColor: "black",
    padding: 10,
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
