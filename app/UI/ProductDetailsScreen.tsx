import React from "react";
import { View, Text, Image } from "react-native";

const ProductDetailsScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <View>
      <Text>Product Details Screen</Text>
      <Text>Product ID: {product.id}</Text>
      <Text>Name: {product.name}</Text>
      <Text>Description: {product.description}</Text>
      <Text>Sale Price: {product.salePrice}</Text>
      <Image
        source={{ uri: product.image }}
        style={{ width: 200, height: 200 }}
      />
      {/* Display other product details here */}
    </View>
  );
};

export default ProductDetailsScreen;
