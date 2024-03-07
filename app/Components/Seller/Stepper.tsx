import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const Stepper = () => {
  return (
    <View style={styles.option}>
      <View style={styles.checkIconContainer}>
        <AntDesign name="checkcircleo" size={24} color="black" />
        <Text style={styles.optionText}>Email Id & GST</Text>
      </View>
      <View style={styles.checkIconContainer}>
        <AntDesign name="checkcircleo" size={24} color="black" />
        <Text style={styles.optionText}>Password Creation</Text>
      </View>
      <View style={styles.checkIconContainer}>
        <AntDesign name="checkcircleo" size={24} color="black" />
        <Text style={styles.optionText}>Onboard Dashing</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    top: 12,
    flexDirection: "row",
    gap: 23,
    bottom: 12,
  },
  checkIconContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  optionText: {
    marginTop: 5,
    left: 12,
  },
});

export default Stepper;
