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

const ProductDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);

  // Check if route params and product exist and have the necessary properties
  if (
    !route.params ||
    !product ||
    !product.image ||
    !product.name ||
    !product.price
  ) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product information is incomplete.</Text>
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
        <Text>Back</Text>
      </TouchableOpacity>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>₹{product.price}</Text>
      <View style={styles.quantityInfoContainer}>
        <Text style={styles.quantityInfo}>Minimum Order Quantity: 3</Text>
        <Text style={styles.quantityInfo}>@ ₹78/100ml</Text>
      </View>
      <View style={styles.offerContainer}>
        <Text style={styles.offerText}>
          Combo Offer: Buy 3 items save 3%; Buy 4 or more save 5%
        </Text>
        <Text style={styles.offerText}>
          Bank Offer: 10% off on HSBC Bank Credit Card and EMI Transactions
        </Text>
      </View>
      <TextInput
        style={styles.quantityInput}
        value={quantity.toString()}
        onChangeText={(text) => setQuantity(parseInt(text) || 1)}
        keyboardType="numeric"
        placeholder="Quantity"
      />
      <TouchableOpacity style={styles.buyButton} onPress={handleBuyToCart}>
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.specifications}>
        <Text style={styles.specsTitle}>Specifications:</Text>
        <Text style={styles.specsDetail}>
          Quantity: 100 ml Fragrance: Deodorant Spray For Men
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
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
  quantityInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  quantityInfo: {
    fontSize: 16,
    color: "#555",
  },
  offerContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  offerText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
    color: "#555",
  },
  quantityInput: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  buyButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 20,
    color: "#555",
  },
  specifications: {
    alignItems: "flex-start",
  },
  specsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  specsDetail: {
    fontSize: 16,
    color: "#555",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
});

export default ProductDetails;
