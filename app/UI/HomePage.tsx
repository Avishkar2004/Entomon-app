import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";

const HomePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather
          name="search"
          size={24}
          color="black"
          style={styles.searchIcon}
        />
        <TextInput style={styles.searchInput} placeholder="Search..." />
      </View>
      <View style={styles.content}>
        <Text>Content goes here</Text>
      </View>
      <View style={styles.footer}>
        <Link href={"Components/Profile"} style={styles.footerIcon}>
          <AntDesign name="user" size={24} color="black" />
        </Link>
        <Link href={"Components/Cart"} style={styles.footerIcon}>
          <AntDesign name="shoppingcart" size={25} color="black" />
        </Link>
        <Feather
          name="more-horizontal"
          size={24}
          color="black"
          style={styles.footerIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 10,
  },
  footerIcon: {
    marginLeft: 10,
  },
});

export default HomePage;
