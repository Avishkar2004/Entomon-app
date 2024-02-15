import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import HorizontalLinearStepper from "./HorizontalLinearStepper";

const Buy = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);

  if (!route.params || !product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Product info missing in Buy Now page
        </Text>
      </View>
    );
  }

  const handleBuyToCart = () => {
    // Implement logic to Buy product to cart
    console.log(`Buyed ${quantity} ${product.name} to cart.`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.BackButton}>
          <AntDesign
            name="arrowleft"
            size={20}
            color="black"
            style={{ gap: 30 }}
          />
          Order Summary
        </Text>
      </TouchableOpacity>
      <View style={styles.stepper}>
        <HorizontalLinearStepper />
      </View>
      <Text style={styles.deliverTo}>Deliver To:</Text>
      <Text>Avishkar kakde</Text>
      <Text>
        Pune, LB bhopatkar path, front of kheliya, road, Bhatancha Bol, Pune,
        Maharashtra 411030., PUNE, Maharashtra - 411002
      </Text>
      <Text>93228103</Text>
      <View style={styles.productDetails}>
        <Image source={{ uri: product.photo }} style={styles.image} />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>₹ {product.rupees}</Text>
      </View>
      <View style={styles.gstContainer}>
        <Text style={styles.gstText}>Use GST Invoice</Text>
        {/* Checkbox for GST Invoice */}
      </View>
      <View style={styles.priceDetails}>
        <Text style={styles.priceText}>Item Discount: 0%</Text>
        <Text style={styles.priceText}>
          Delivery charges :- {product.delivery_charges}
        </Text>
        <Text style={styles.totalText}>Total Amount: ₹{product.rupees}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuyToCart}>
          <Text style={styles.buyButtonText}>{product.rupees}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleBuyToCart}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  BackButton: {
    fontWeight: "bold",
  },
  stepper: {
    marginTop: 30,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  deliverTo: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  productDetails: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
    color: "#4CAF50",
  },
  gstContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  gstText: {
    fontSize: 16,
    marginRight: 10,
  },
  priceDetails: {
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  priceText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "200",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "relative",
    bottom: 20,
    paddingHorizontal: 20,
  },
  buyButton: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    gap: 30,
  },
  continueButton: {
    backgroundColor: "#ff9f00",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default Buy;
