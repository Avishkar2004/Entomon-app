import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Data from "./Data";

const WhySell = () => {
  return (
    <View style={styles.outerBorder}>
      <View style={styles.innerBorder}>
        <View style={styles.container}>
          <Image
            style={styles.photo}
            source={require("../../../assets/images/person.jpg")} // Replace with your photo path
          />
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            ac ligula consequat, tempus dui ac, eleifend velit.
          </Text>
        </View>
      </View>
      <View style={styles.commisionPhoto}>
        <Image
          style={styles.girlphoto}
          source={require("../../../assets/images/Commission.png")} // Replace with your photo path
        />
      </View>
      <View style={styles.sellOnentomonContainer}>
        <Text style={styles.sellOnentomon}>Why Sell on Entomon</Text>
        {/* Render entries dynamically */}
        {Data.map((entry, index) => (
          <View key={index} style={styles.entryContainer}>
            <Image
              style={styles.photo}
              source={entry.photo} // Use the photo URL from the Data object
            />
            <View style={styles.entryContent}>
              <Text style={styles.title}>{entry.title}</Text>
              <Text style={styles.info}>{entry.info}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerBorder: {
    // padding: 10,
    top: 20,
  },
  innerBorder: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
    left: 12,
    right: 12,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  commisionPhoto: {
    alignItems: "center",
    marginTop: 20,
  },
  girlphoto: {
    width: 380,
    height: 380,
  },
  sellOnentomonContainer: {
    width: "100%",
    alignItems: "center",
    top: 12,
    backgroundColor: "#ebf3fb",
    marginBottom: 30,
  },
  sellOnentomon: {
    fontSize: 20,
    fontWeight: "bold",
    color: "grey",
    marginTop: 20,
  },
  entryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  entryContent: {
    flex: 1,
    marginRight: 10,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    left: 15,
  },
  info: {
    fontSize: 14,
    left: 15,
  },
});

export default WhySell;
