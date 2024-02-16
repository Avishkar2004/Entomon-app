import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  Picker,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Payment = () => {
  const route = useRoute();
  const { product } = route.params;
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedOffer, setSelectedOffer] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handleMobileNumberChange = (text) => {
    setMobileNumber(text);
  };

  const handlePayment = () => {
    // Implement your payment logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Payments</Text>
      <Text style={styles.totalAmount}>Total Amount: ₹ 1,68,999</Text>
      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Select Offer</Text>
          <Picker
            selectedValue={selectedOffer}
            // onValueChange={(itemValue) => setSelectedOffer(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Offer" value="" />
            <Picker.Item label="Offer 1" value="offer1" />
            <Picker.Item label="Offer 2" value="offer2" />
          </Picker>
        </View>
        <Text style={styles.savingsText}>Save up to ₹ 3,000</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Payment Method</Text>
          <Picker
            selectedValue={selectedPaymentMethod}
            // onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Payment Method" value="" />
            <Picker.Item label="Credit/Debit Card" value="creditDebitCard" />
            <Picker.Item label="Net Banking" value="netBanking" />
            <Picker.Item label="EMI" value="emi" />
            <Picker.Item label="Wallets" value="wallet" />
          </Picker>
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Paytm Linked Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile Number"
            value={mobileNumber}
            onChangeText={handleMobileNumberChange}
            keyboardType="numeric"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay ₹ {product.rupees}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  totalAmount: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  halfWidth: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 5,
  },
  picker: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 10,
  },
  savingsText: {
    fontSize: 16,
    color: "#666666",
    marginLeft: 10,
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
  },
  payButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default Payment;
