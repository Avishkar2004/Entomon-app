import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";

const Profile = () => {
  const user = {
    name: "John Doe",
    number: "+1234567890",
    address: "123 Main Street, City, Country",
    cart: [], // Array to store user's cart items
  };

  const handleLogout = () => {
    // Handle logout action
    console.log("Logout");
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.userInfoText}>{user.name}</Text>
        <Text style={styles.label}>Number:</Text>
        <Text style={styles.userInfoText}>{user.number}</Text>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.userInfoText}>{user.address}</Text>
      </View>
      <View style={styles.options}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => console.log("View Cart")}
        >
          <Link href={"/Cart"} style={styles.optionLink}>
            View Cart
          </Link>
          <AntDesign name="shoppingcart" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Text style={styles.optionText}>Log Out</Text>
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => console.log("Privacy Policy")}
        >
          <Text style={styles.optionText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => console.log("About Company")}
        >
          <Text style={styles.optionText}>About Company</Text>
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
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  userInfoText: {
    marginBottom: 10,
  },
  options: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 20,
  },
  optionLink: {
    textDecorationLine: "underline",
  },
  optionText: {
    fontSize: 16,
  },
});

export default Profile;
