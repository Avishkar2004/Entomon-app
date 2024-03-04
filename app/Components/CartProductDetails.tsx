import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";

const CartProductDetails = () => {
  const route = useRoute();
  const { product } = route.params;
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);

  if (!route.params || !product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product information is incomplete</Text>
      </View>
    );
  }

  const handleBuyNow = (product) => {
    if (product) {
      navigation.navigate("Components/Buy", { product: product });
    } else {
      console.error("Product information is missing.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={{ uri: product.photo }} style={styles.image} />
        <Text style={styles.title}>{product.name}</Text>
        <View style={styles.quantityInfoContainer}>
          <Text style={styles.quantityInfo}>Minimum Order Quantity: 3</Text>
          <Text style={styles.quantityInfo}> @ ₹78/100ml</Text>
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
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          placeholder="Enter Quantity"
        />
        <View style={styles.specificInfoContainer}>
          <Text style={styles.specificInfoText}>
            Delivery Charges: {product.delivery_charges}
          </Text>
          <Text style={styles.specificInfoText}>
            {product.review} 20,000 ratings
          </Text>
          <Text style={styles.specificInfoText}>
            EMI: ₹ {product.emi_per_month}/Month
          </Text>
          <Text style={styles.specificInfoText}>
            6 Month Cost EMI Plan with HDFC credit-cart.
          </Text>
        </View>
        <Text style={styles.price}>
          ₹{product.rupees} <Text style={styles.oldPrice}>20</Text>
        </Text>
        <Text style={styles.description}>{product.address}</Text>
        <Text style={styles.description}>
          Free delivery by: {product.delivery_time}
        </Text>
        <Text style={styles.stockStatus}>{product.stockStatus}</Text>
        <View style={styles.specifications}>
          <Text style={styles.specsTitle}>Specifications:</Text>
          <Text style={styles.specsDetail}>
            Quantity: 100 ml Fragrance: Deodorant Spray For Men
          </Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.addToCartButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.buttonText, styles.addToCartButtonText]}>
            Go To Cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buyNowButton]}
          onPress={() => handleBuyNow(product)}
        >
          <Text style={[styles.buttonText, styles.buyNowButtonText]}>
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007BFF",
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    marginTop: 40,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 4,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "50%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  addToCartButton: {
    backgroundColor: "#fff",
  },
  buyNowButton: {
    backgroundColor: "#fb641b",
  },

  addToCartButtonText: {
    color: "#000",
  },
  buyNowButtonText: {
    color: "#000",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  stockStatus: {
    color: "red",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
  },
  specificInfoContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  specificInfoText: {
    fontSize: 16,
    color: "#555",
  },
  specifications: {
    alignItems: "flex-start",
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    elevation: 2,
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
  price: {
    fontSize: 20,
    marginBottom: 20,
    color: "#4CAF50",
    textAlign: "center",
  },
  oldPrice: {
    textDecorationLine: "line-through",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default CartProductDetails;
