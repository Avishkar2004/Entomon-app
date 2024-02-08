import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Cart = () => {
  const products = [
    { id: 1, name: "Product 1", price: 10.99 },
    { id: 2, name: "Product 2", price: 5.99 },
    { id: 3, name: "Product 3", price: 15.99 },
  ];

  const handleBuyNow = (productId) => {
    // Handle Buy Now action for the product
    console.log("Buy Now:", productId);
  };

  const handleRemove = (productId) => {
    // Handle Remove action for the product
    console.log("Remove:", productId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cartHeader}>
        <AntDesign name="shoppingcart" size={40} color="black" />
        <Text style={styles.cartHeaderText}>Your Cart</Text>
      </View>
      <View style={styles.itemContainer}>
        {products.map((product) => (
          <View key={product.id} style={styles.item}>
            <View>
              <Text style={styles.itemName}>{product.name}</Text>
              <Text style={styles.itemPrice}>$ {product.price.toFixed(2)}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleBuyNow(product.id)}
              >
                <Text style={styles.buttonText}>Buy Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.removeButton]}
                onPress={() => handleRemove(product.id)}
              >
                <Text style={[styles.buttonText, styles.removeButtonText]}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
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
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "green",
    borderRadius: 5,
    marginLeft: 10,
  },
  removeButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  removeButtonText: {
    color: "white",
  },
});

export default Cart;
