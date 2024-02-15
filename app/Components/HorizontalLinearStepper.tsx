import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

const HorizontalLinearStepper = () => {
  return (
    <View style={styles.container}>
      <ProgressSteps>
        <ProgressStep label="Address">
          <View style={styles.stepContent}></View>
        </ProgressStep>
        <ProgressStep label="Order Summary">
          <View style={styles.stepContent}></View>
        </ProgressStep>
        <ProgressStep label="Payment">
          <View style={styles.stepContent}></View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stepContent: {
    alignItems: "center",
    marginVertical: 20,
  },
});

export default HorizontalLinearStepper;
