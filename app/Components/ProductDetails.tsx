import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";

const ProductDetails = () => {
  const route = useRoute(); // Access route object
  const { product } = route.params;
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  useEffect(() => {
    checkCart();
  }, []);

  const checkCart = async () => {
    try {
      // Fetch cart data from the server
      const response = await fetch("http://localhost:8000/api/cart");
      const cartData = await response.json();

      // Check if the current product is in the cart
      const isInCart = cartData.some(
        (item) => item.product_id === product.product_id
      );
      setIsInCart(isInCart);
    } catch (error) {
      console.error("Error checking cart:", error);
    }
  };

  const handleGoToCart = () => {
    navigation.navigate("Components/Cart/Cart"); // Navigate to Cart screen
  };

  const handleAddToCart = async (
    product_id,
    name,
    rupees,
    stockStatus,
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
      setIsLoading(true); // Show loader

      // Fetch request to add the product to the cart
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
          stockStatus: stockStatus,
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

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      setTimeout(() => {
        setIsLoading(false); // Hide loader
        setIsInCart(true); // Update isInCart state
      }, 1000);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setIsLoading(false); // Hide loader
    }
  };

  const handleBuyNow = (product) => {
    if (product) {
      navigation.navigate("Components/Buy", { product: product }); // Navigate to Buy screen with product information
    } else {
      console.error("Product information is missing.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* ScrollView for scrolling content */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Product image */}
        <Image source={{ uri: product.photo }} style={styles.image} />

        {/* Product title */}
        <Text style={styles.title}>{product.name}</Text>

        {/* Quantity info */}
        <View style={styles.quantityInfoContainer}>
          <Text style={styles.quantityInfo}>Minimum Order Quantity: 3</Text>
          <Text style={styles.quantityInfo}> @ ₹78/100ml</Text>
        </View>

        {/* Offer info */}
        <View style={styles.offerContainer}>
          <Text style={styles.offerText}>
            Combo Offer: Buy 3 items save 3%; Buy 4 or more save 5%
          </Text>
          <Text style={styles.offerText}>
            Bank Offer: 10% off on HSBC Bank Credit Card and EMI Transactions
          </Text>
        </View>

        {/* Quantity input */}
        <TextInput
          style={styles.quantityInput}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          placeholder="Enter Quantity"
        />

        {/* Additional product info */}
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

        {/* Product price */}
        <Text style={styles.price}>
          ₹{product.rupees} <Text style={styles.oldPrice}>20</Text>
        </Text>

        {/* Product description and delivery info */}
        <Text style={styles.description}>{product.address}</Text>
        <Text style={styles.description}>
          Free delivery by: {product.delivery_time}
        </Text>

        {/* Stock status */}
        <Text style={styles.stockStatus}>{product.stockStatus}</Text>

        {/* Product specifications */}
        <View style={styles.specifications}>
          <Text style={styles.specsTitle}>Specifications:</Text>
          <Text style={styles.specsDetail}>
            Quantity: 100 ml Fragrance: Deodorant Spray For Men
          </Text>
        </View>
      </ScrollView>

      {/* Button container */}
      <View style={styles.buttonContainer}>
        {/* Conditional rendering for cart buttons */}
        {isLoading ? ( // Show loader if isLoading is true
          <ActivityIndicator size="small" color="#007BFF" />
        ) : isInCart ? (
          <TouchableOpacity style={[styles.button]} onPress={handleGoToCart}>
            <Text style={[styles.buttonText]}>Go to Cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.addToCartButton]}
            onPress={() =>
              handleAddToCart(
                product.product_id,
                product.name,
                product.rupees,
                product.stockStatus,
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
            <Text style={[styles.buttonText, styles.addToCartButtonText]}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        )}

        {/* Buy Now button */}
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
    backgroundColor: "#FFFFFF",
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
    paddingHorizontal: 25,
    paddingBottom: 80,
    alignItems: "center",
    backgroundColor: "#FFFFFF", // White background color
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
    color: "#333333", // Dark text color
  },
  quantityInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  quantityInfo: {
    fontSize: 16,
    color: "#555555", // Medium text color
  },
  offerContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  offerText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
    color: "#555555", // Medium text color
  },
  quantityInput: {
    height: 40,
    width: "100%",
    borderColor: "#BDBDBD", // Light gray border color
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: "#FFFFFF", // White background color
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 1,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF", // White background color
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "48%",
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
    backgroundColor: "#FB641B", // Orange button color
  },

  addToCartButtonText: {
    color: "#000",
  },
  buyNowButtonText: {
    color: "#000",
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 20,
    color: "#555555", // Medium text color
  },
  stockStatus: {
    color: "red",
    marginBottom: 12,
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
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  specsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333333", // Dark text color
  },
  specsDetail: {
    fontSize: 16,
    color: "#555555", // Medium text color
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
    color: "#4CAF50", // Green text color
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

export default ProductDetails;
