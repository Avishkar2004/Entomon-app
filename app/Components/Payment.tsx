import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const Payment = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;
  const { totalPrice } = route.params;

  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [validThru, setValidThru] = useState("");
  const [cvv, setCvv] = useState("");

  const handleMobileNumberChange = (text) => {
    setMobileNumber(text);
  };

  const handlePayment = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerText}>
            <AntDesign name="arrowleft" size={20} color="black" />
            Payment
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.arrow}></Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.totalAmount}>Total Amount: ₹ {product.rupees}</Text>
      <Text style={styles.discount}>20% Off</Text>
      <View style={styles.paymentMethodContainer}>
        <Text style={styles.paymentMethodHeader}>Payment Method</Text>
        <TouchableOpacity
          style={styles.paymentMethodOption}
          onPress={() => setSelectedPaymentMethod("creditDebitCard")}
        >
          <Text>Credit/Debit Card</Text>
          {selectedPaymentMethod === "creditDebitCard" && (
            <View style={styles.cardDetailsContainer}>
              <TextInput
                style={styles.input}
                placeholder="Card Number"
                value={cardNumber}
                onChangeText={(text) => setCardNumber(text)}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Valid Thru"
                value={validThru}
                onChangeText={(text) => setValidThru(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="CVV"
                value={cvv}
                onChangeText={(text) => setCvv(text)}
                keyboardType="numeric"
              />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentMethodOption}
          onPress={() => setSelectedPaymentMethod("netBanking")}
        >
          <Text>Net Banking</Text>
        </TouchableOpacity>
        {selectedPaymentMethod === "netBanking" && (
          <View style={styles.walletsContainer}>
            <Text style={styles.walletsHeader}>Wallets</Text>
            <View style={styles.walletsOptions}>
              <TouchableOpacity onPress={() => {}} style={styles.walletOption}>
                <Text>PhonePe</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} style={styles.walletOption}>
                <Text>Paytm Payments Bank</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.mobileNumberLabel}>
              Paytm Linked Mobile Number
            </Text>
            <View style={styles.mobileNumberContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter Mobile Number"
                value={mobileNumber}
                onChangeText={handleMobileNumberChange}
                keyboardType="numeric"
              />
              <TouchableOpacity onPress={() => {}} style={styles.linkButton}>
                <Text style={styles.linkButtonText}>Link</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <TouchableOpacity
          style={styles.paymentMethodOption}
          onPress={() => setSelectedPaymentMethod("wallet")}
        >
          <Text>Wallets</Text>
        </TouchableOpacity>
      </View>
      {selectedPaymentMethod === "wallet" && (
        <View style={styles.walletsContainer}>
          <Text style={styles.walletsHeader}>Wallets</Text>
          <View style={styles.walletsOptions}>
            <TouchableOpacity onPress={() => {}} style={styles.walletOption}>
              <Text>PhonePe</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.walletOption}>
              <Text>Paytm Payments Bank</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.mobileNumberLabel}>
            Paytm Linked Mobile Number
          </Text>
          <View style={styles.mobileNumberContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Mobile Number"
              value={mobileNumber}
              onChangeText={handleMobileNumberChange}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={() => {}} style={styles.linkButton}>
              <Text style={styles.linkButtonText}>Link</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
  },
  arrow: {
    fontSize: 28,
    color: "#007bff",
  },
  totalAmount: {
    fontSize: 20,
    color: "#666666",
    marginBottom: 10,
  },
  discount: {
    fontSize: 18,
    color: "green",
    marginBottom: 10,
  },
  paymentMethodContainer: {
    marginBottom: 20,
  },
  paymentMethodHeader: {
    fontSize: 18,
    color: "#333333",
    marginBottom: 10,
  },
  paymentMethodOption: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  walletsContainer: {
    marginBottom: 20,
  },
  walletsHeader: {
    fontSize: 18,
    color: "#333333",
    marginBottom: 10,
  },
  walletsOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  walletOption: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
  },
  mobileNumberLabel: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 10,
  },
  mobileNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  linkButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    padding: 15,
    marginLeft: 10,
  },
  linkButtonText: {
    fontSize: 16,
    color: "#ffffff",
  },
  payButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  payButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default Payment;
