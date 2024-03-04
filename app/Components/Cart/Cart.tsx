import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Cart Component
const Cart = () => {
  // State variables
  const [products, setProducts] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation prompt
  const [productIdToRemove, setProductIdToRemove] = useState(null); // State to store product id to be removed
  const navigation = useNavigation();

  // Fetch cart data on component mount
  useEffect(() => {
    fetch("http://localhost:8000/api/cart")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          throw new Error("Data received is not an array");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Calculate total price of all products in cart
  const totalPrice = products.reduce((total, product) => {
    return total + product.rupees * product.quantity;
  }, 0);

  // Function to show confirmation prompt
  const showRemoveConfirmation = (productId) => {
    setProductIdToRemove(productId);
    setShowConfirmation(true);
  };

  // Remove product from cart
  const handleRemove = (productId) => {
    // Hide confirmation prompt
    setShowConfirmation(false);

    fetch(`http://localhost:8000/cart/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Update the products state to remove the deleted product
        const updatedProducts = products.filter(
          (product) => product.product_id !== productId
        );
        setProducts(updatedProducts);
      })
      .catch((error) => console.error("Error removing product:", error));
  };
  // Navigation function to navigate to product details screen
  const productDetails = (product) => {
    if (product) {
      navigation.navigate("Components/CartProductDetails", {
        product: product,
      });
    } else {
      console.error("Product information is missing.");
    }
  };
  // Cancel removing product
  const cancelRemove = () => {
    // Hide confirmation prompt
    setShowConfirmation(false);
    // Reset product id to remove
    setProductIdToRemove(null);
  };

  // Navigation function to navigate to payment screen with total price
  const handleBuyNowPayment = () => {
    navigation.navigate("Components/Cart/Payments", { product: totalPrice });
  };

  // Navigation function to navigate to buy screen with product details
  const handleBuyNow = (product) => {
    if (product) {
      navigation.navigate("Components/Buy", { product: product });
    } else {
      console.error("Product information is missing.");
    }
  };

  return (
    <View style={styles.container}>
      {products.length === 0 ? (
        <View>
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
              Go Back
            </Text>
          </TouchableOpacity>

          <Text style={styles.emptyCartText}>Your Cart Is Empty</Text>
        </View>
      ) : (
        // <Text style={styles.emptyCartText}>Your Cart Is Empty</Text>
        <ScrollView style={styles.scrollView}>
          <View>
            <View style={styles.cartHeader}>
              <AntDesign name="shoppingcart" size={40} color="black" />
              <Text style={styles.cartHeaderText}>
                Your Cart ({products.length})
              </Text>
            </View>
            {products.map((product) => (
              <TouchableOpacity
                key={product.product_id}
                style={styles.itemContainer}
                onPress={() => productDetails(product)}
              >
                <Image
                  source={{ uri: product.photo }}
                  style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{product.name}</Text>
                  <Text style={styles.itemPrice}>₹ {product.rupees}</Text>
                  <Text style={styles.itemPrice}>
                    Quantity: {product.quantity}
                  </Text>
                </View>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.removeButton]}
                    onPress={() => showRemoveConfirmation(product.product_id)}
                  >
                    <Text style={styles.buttonText}>Remove</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buyNowButton]}
                    onPress={() => handleBuyNow(product)}
                  >
                    <Text style={styles.buttonText}>Buy Now</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
      {/* Total Price and Buy Now button */}
      {products.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalPriceText}>Total Price: ₹{totalPrice}</Text>
          <TouchableOpacity style={styles.buynow} onPress={handleBuyNowPayment}>
            <Text style={styles.BuybuttonText}>Buy</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Confirmation Prompt */}
      {showConfirmation && (
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationText}>
            Are you sure you want to remove this item?
          </Text>
          <View style={styles.confirmationButtonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.removeButton]}
              onPress={() => handleRemove(productIdToRemove)}
            >
              <Text style={styles.buttonTextRC}>Remove</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={cancelRemove}
            >
              <Text style={styles.buttonTextRC}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    marginTop: -0,
    marginBottom: 1,
  },
  BackButton: {
    fontWeight: "bold",
    color: "black",
  },
  emptyCartText: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 50,
  },
  cartHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  cartHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 16,
    marginBottom: 5,
    maxWidth: 300,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    borderTopWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: -35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  removeButton: {
    backgroundColor: "red",
  },
  buyNowButton: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonTextRC: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  buynow: {
    backgroundColor: "green",
    width: "50%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  BuybuttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  confirmationContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
    width: "80%",
    zIndex: 999,
  },
  confirmationText: {
    fontSize: 16,
    marginBottom: 20,
  },
  confirmationButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "black",
  },
});

export default Cart;
