// Import necessary components and assets
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image, // Import Image component
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

// Import image assets for net banking
// import phonePeImage from "../../assets/images/phonePe.png";
// import gpayImage from "../../assets/images/gpay.png";
// import paytmImage from "../../assets/images/paytm.png";
// import upiImage from "../../assets/images/Upi.png";

const Payment = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;

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
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Payment</Text>
        <TouchableOpacity onPress={() => {}}>
          <AntDesign name="questioncircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Total Amount */}
      <Text style={styles.totalAmount}>Total Amount: ₹ {product.rupees}</Text>

      {/* Discount */}
      <Text style={styles.discount}>20% Off</Text>

      {/* Payment Method Container */}
      <View style={styles.paymentMethodContainer}>
        {/* Payment Method Header */}
        <Text style={styles.paymentMethodHeader}>Payment Method</Text>

        {/* Credit/Debit Card Option */}
        <TouchableOpacity
          style={[
            styles.paymentMethodOption,
            selectedPaymentMethod === "creditDebitCard"
              ? styles.selectedOption
              : null,
          ]}
          onPress={() => setSelectedPaymentMethod("creditDebitCard")}
        >
          <Text style={styles.paymentMethodText}>Credit/Debit Card</Text>
          {/* Card Details */}
          {selectedPaymentMethod === "creditDebitCard" && (
            <View style={styles.cardDetailsContainer}>
              {/* Input fields for card details */}
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

        {/* Net Banking Option */}
        <TouchableOpacity
          style={styles.paymentMethodOption}
          onPress={() => setSelectedPaymentMethod("netBanking")}
        >
          <Text style={styles.paymentMethodText}>Net Banking</Text>
        </TouchableOpacity>

        {/* Netbanking Options */}
        {selectedPaymentMethod === "netBanking" && (
          <View style={styles.walletsContainer}>
            <Text style={styles.walletsHeader}>Net Banking</Text>
            <View style={styles.walletsOptions}>
              {/* PhonePe */}
              <TouchableOpacity onPress={() => {}} style={styles.walletOption}>
                <Image
                  source={"../../assets/images/phonePe.png"}
                  style={styles.walletImage}
                />
              </TouchableOpacity>

              {/* GPay */}
              <TouchableOpacity onPress={() => {}} style={styles.walletOption}>
                <Image
                  source={"../../assets/images/gpay.png"}
                  style={styles.walletImage}
                />
              </TouchableOpacity>

              {/* Paytm */}
              <TouchableOpacity onPress={() => {}} style={styles.walletOption}>
                <Image
                  source={"../../assets/images/paytm.png"}
                  style={styles.walletImage}
                />
              </TouchableOpacity>

              {/* UPI */}
              <TouchableOpacity onPress={() => {}} style={styles.walletOption}>
                <Image
                  source={"../../assets/images/Upi.jpg"}
                  style={styles.walletImage}
                />
              </TouchableOpacity>
            </View>

            {/* Mobile Number for Net Banking */}
            {/* <Text style={styles.mobileNumberLabel}>
            Paytm Linked Mobile Number
          </Text> */}
            {/* <View style={styles.mobileNumberContainer}>
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
          </View> */}
          </View>
        )}

        {/* Wallets Option */}
        <TouchableOpacity
          style={styles.paymentMethodOption}
          onPress={() => setSelectedPaymentMethod("wallet")}
        >
          <Text style={styles.paymentMethodText}>Wallets</Text>
        </TouchableOpacity>
      </View>

      {/* Wallet Options */}
      {selectedPaymentMethod === "wallet" && (
        <View style={styles.walletsContainer}>
          <Text style={styles.walletsHeader}>Net Banking</Text>
          <View style={styles.walletsOptions}>
            {/* PhonePe */}
            <TouchableOpacity onPress={() => {}} style={styles.walletOption}>
              <Image
                source={"../../assets/images/phonePe.png"}
                style={styles.walletImage}
              />
            </TouchableOpacity>
            {/* UPI */}
            <TouchableOpacity onPress={() => {}} style={styles.walletOption}>
              <Image
                source={"../../assets/images/Upi.jpg"}
                style={styles.walletImage}
              />
            </TouchableOpacity>
          </View>

          {/* Mobile Number for Net Banking */}
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
      {/* Pay Button */}
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  totalAmount: {
    fontSize: 20,
    color: "#666666",
    marginBottom: 10,
  },
  discount: {
    fontSize: 18,
    color: "#00cc00",
    marginBottom: 20,
  },
  paymentMethodContainer: {
    marginBottom: 20,
  },
  paymentMethodHeader: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "bold",
    marginBottom: 10,
  },
  paymentMethodOption: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
  },
  paymentMethodText: {
    fontSize: 16,
    color: "#333333",
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
    flexWrap: "wrap", // Added to wrap wallet options to the next line if they exceed the width
    justifyContent: "space-between",
    marginBottom: 10,
  },
  walletOption: {
    marginBottom: 10,
  },
  walletImage: {
    width: 100,
    height: 50,
    resizeMode: "contain",
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
    backgroundColor: "#f5f5f5",
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default Payment;
