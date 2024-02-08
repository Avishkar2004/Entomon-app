import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
const { width } = Dimensions.get("screen");

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        // Filter out product with ID 1
        const filteredProducts = data.filter((product) => product.id !== 1);
        setProducts(filteredProducts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const toggleDescription = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].showFullDescription =
      !updatedProducts[index].showFullDescription;
    setProducts(updatedProducts);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather
          name="search"
          size={24}
          color="black"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredProducts.map((product, index) => (
          <View key={product.id} style={styles.product}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.productDetails}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.price}>$ {product.price}</Text>
              <Text style={styles.description}>
                {product.showFullDescription
                  ? product.description
                  : `${product.description.substring(0, 100)}...`}
              </Text>
              {!product.showFullDescription && (
                <TouchableOpacity
                  onPress={() => toggleDescription(index)}
                  style={styles.showMoreButton}
                >
                  <Text style={styles.showMoreText}>Show More</Text>
                </TouchableOpacity>
              )}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  onPress={() => addToCart(product.id)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => buyNow(product.id)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Buy Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Link href={"Components/Profile"} style={styles.footerIcon}>
          <AntDesign name="user" size={24} color="black" />
        </Link>
        <Link href={"Components/Cart"} style={styles.footerIcon}>
          <AntDesign name="shoppingcart" size={25} color="black" />
        </Link>
        <Feather
          name="more-horizontal"
          size={24}
          color="black"
          style={styles.footerIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  scrollContainer: {
    paddingBottom: 20,
    alignItems: "center",
    marginTop: 12,
  },
  product: {
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    width: width * 0.9,
  },
  image: {
    width: width * 0.3,
    height: 150,
    marginRight: 10,
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  showMoreButton: {
    backgroundColor: "#ddd",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  showMoreText: {
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 10,
  },
  footerIcon: {
    marginLeft: 10,
  },
});

export default HomePage;
