import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

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

  const handleBuyNow = (product) => {
    if (product) {
      navigation.navigate("Components/Buy", { product: product });
    } else {
      console.error("Product information is missing.");
    }
  };

  const handleRemove = (productId) => {
    // Send a DELETE request to your backend API to remove the product from the cart
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

  const productDetails = (product) => {
    if (product) {
      navigation.navigate("Components/CartProductDetails", {
        product: product,
      });
    } else {
      console.error("Product information is missing.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cartHeader}>
        <AntDesign name="shoppingcart" size={40} color="black" />
        <Text style={styles.cartHeaderText}>Your Cart</Text>
      </View>
      <ScrollView>
        {products.map((product) => (
          <TouchableOpacity
            key={product.product_id}
            style={styles.itemContainer}
            onPress={() => productDetails(product)}
          >
            <Image source={{ uri: product.photo }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{product.name}</Text>
              <Text style={styles.itemPrice}>$ {product.rupees}</Text>
              <Text style={styles.itemPrice}>Quantity: {product.quantity}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, styles.removeButton]}
                onPress={() => handleRemove(product.product_id)}
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
});

export default Cart;
