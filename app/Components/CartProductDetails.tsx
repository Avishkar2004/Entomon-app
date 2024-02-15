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

const CartProductDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);

  // Check if route params and product exist and have the necessary properties
  if (!route.params || !product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product information is incomplete.</Text>
      </View>
    );
  }

  const addToCart = async (
    product_id,
    name,
    rupees,
    photo,
    quantity,
    review,
    percent_off,
    delivery_charges,
    delivery_time,
    emi_per_month,
    emi_month,
    address
  ) => {
    try {
      const response = await fetch(`http://localhost:8000/cart/${product_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: product_id,
          name: name,
          photo: photo,
          rupees: rupees,
          quantity: quantity,
          review: review,
          percent_off: percent_off,
          delivery_charges: delivery_charges,
          delivery_time: delivery_time,
          emi_per_month: emi_per_month,
          emi_month: emi_month,
          address: address,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      // Handle success, e.g., show a success message
      console.log("Item added to cart successfully");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleBuyNow = (product) => {
    if (product) {
      navigation.navigate("./Buy", { product: product });
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
        <Text style={styles.BackButton}>Back</Text>
      </TouchableOpacity>
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
      <Text style={styles.description}>
        Delivery Charges :- {product.delivery_charges}
      </Text>
      <Text style={styles.description}>{product.review} 20,000 ratings</Text>
      <Text style={styles.description}>
        Emi :- ₹ {product.emi_per_month}/Month
      </Text>
      <Text style={styles.EMI}>
        6 Month Cost EMI Plan with HDFC credit-cart.
      </Text>
      <Text style={styles.price}>
        ₹{product.rupees}{" "}
        <Text style={{ textDecorationLine: "line-through" }}>170</Text>
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            addToCart(
              product.product_id,
              product.name,
              product.rupees,
              product.photo,
              quantity,
              product.review,
              product.percent_off,
              product.delivery_charges,
              product.delivery_time,
              product.emi_per_month,
              product.emi_month,
              product.address
            )
          }
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleBuyNow}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
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
  BackButton: {
    fontWeight: "bold",
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
  EMI: {
    fontSize: 12,
    marginBottom: 12,
    marginTop: -18,
    color: "#555",
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
    bottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "48%",
  },
  buttonText: {
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
  stockStatus: {
    color: "red",
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

export default CartProductDetails;
