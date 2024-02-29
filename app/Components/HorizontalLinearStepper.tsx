import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps"; // Import ProgressSteps and ProgressStep components

const HorizontalLinearStepper = () => {
  return (
    <View style={styles.container}>
      {/* ProgressSteps component wraps multiple ProgressStep components */}
      <ProgressSteps>
        {/* ProgressStep for "Address" */}
        <ProgressStep label="Address">
          <View style={styles.stepContent}></View>
        </ProgressStep>
        {/* ProgressStep for "Order Summary" */}
        <ProgressStep label="Order Summary">
          <View style={styles.stepContent}></View>
        </ProgressStep>
        {/* ProgressStep for "Payment" */}
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
