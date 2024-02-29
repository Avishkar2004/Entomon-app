import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";

const Profile = () => {
  const user = {
    name: "John Doe",
    number: "+1234567890",
    address: "123 Main Street, City, Country",
    cart: [],
  };

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <View style={styles.container}>
      {/* User information */}
      <View style={styles.userInfo}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.userInfoText}>{user.name}</Text>
        <Text style={styles.label}>Number:</Text>
        <Text style={styles.userInfoText}>{user.number}</Text>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.userInfoText}>{user.address}</Text>
      </View>

      {/* Options */}
      <View style={styles.options}>
        {/* View Cart */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => console.log("View Cart")}
        >
          <Link href={"Components/Cart/Cart"} style={styles.optionLink}>
            <Text style={styles.optionText}>View Cart</Text>
            <AntDesign name="shoppingcart" size={24} color="#333" />
          </Link>
        </TouchableOpacity>

        {/* Log Out */}
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Text style={styles.optionText}>Log Out</Text>
          <AntDesign name="logout" size={24} color="#333" />
        </TouchableOpacity>

        {/* Privacy Policy */}
        <TouchableOpacity style={styles.option}>
          <Link href={"Components/privacyPolicy"}>Privacy And Policy</Link>
        </TouchableOpacity>

        {/* About Company */}
        <TouchableOpacity style={styles.option}>
          <Link href={"Components/CompInfo"}>About Company</Link>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  userInfo: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  userInfoText: {
    marginBottom: 10,
    color: "#666",
  },
  options: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionLink: {
    textDecorationLine: "underline",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Profile;
