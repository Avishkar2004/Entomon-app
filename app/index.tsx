import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";

const Page = () => {
  const animatedValue1 = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;
  const animatedValue3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
  Animated.sequence([
    Animated.timing(animatedValue1, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }),
    Animated.delay(200), // Delay before animating the second photo
    Animated.timing(animatedValue2, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }),
    Animated.delay(200), // Delay before animating the third photo
    Animated.timing(animatedValue3, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }),
  ]).start();
}, []);

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
          <Animated.View
            style={[styles.photoContainer, { opacity: animatedValue1 }]}
          >
            <Image
              source={require("../assets/images/ACTIVPLUS_400x.webp")}
              style={styles.photo}
            />
          </Animated.View>
          <Animated.View
            style={[styles.photoContainer, { opacity: animatedValue2 }]}
          >
            <Image
              source={require("../assets/images/kaka-front_600x.webp")}
              style={styles.photo}
            />
          </Animated.View>
          <Animated.View
            style={[styles.photoContainer, { opacity: animatedValue3 }]}
          >
            <Image
              source={require("../assets/images/ACTIVPLUS_400x.webp")}
              style={styles.photo}
            />
          </Animated.View>
        </View>
        <Text style={styles.shopping}>
          Explore the new ways of Agriculture Shopping
        </Text>
        <TouchableOpacity style={styles.continueButton}>
          <Link style={styles.continueText} href={"/SecondPage"}>
            Continue With Number
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.continueWithGoogleButton}>
          <AntDesign name="google" size={24} color="white" />
          <Link href={"/SecondPage"} style={styles.continueWithGoogleText}>
            Continue With Google
          </Link>
        </TouchableOpacity>
      </LinearGradient>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          By continuing, you agree that you have read and accept our T&C and{" "}
          <Link
            href={"/Components/privacyPolicy"}
            style={{ textDecorationLine: "underline", color: "blue" }}
          >
            Privacy Policy
          </Link>{" "}
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
    top: 40,
    left: 20,
    zIndex: 1,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  middleContainer: {
    marginTop: 140,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  photoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
    padding: 20,
    textAlign: "center",
  },
  continueButton: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 30,
  },
  continueText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  continueWithGoogleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4285F4",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
  },
  continueWithGoogleText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 10,
  },
  footerContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    marginTop: 10,
    color: "#888",
  },
});

export default Page;
