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
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");

const HomePage = () => {
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/insecticide")
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = data.filter((product) => product.id !== 1);
        setProducts(filteredProducts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // const addToCart = async (
  //   productId,
  //   productName,
  //   productPrice,
  //   productImage
  // ) => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/cart/${productId}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: productId,
  //         name: productName,
  //         price: productPrice,
  //         image: productImage,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to add item to cart");
  //     }

  //     // Handle success, e.g., show a success message
  //     console.log("Item added to cart successfully");
  //   } catch (error) {
  //     console.error("Error adding item to cart:", error);
  //     // Handle error, e.g., show an error message to the user
  //   }
  // };

  const toggleDescription = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].showFullDescription =
      !updatedProducts[index].showFullDescription;
    setProducts(updatedProducts);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const buyNow = (product) => {
    if (product) {
      const productWithoutDescription = { ...product };
      delete productWithoutDescription.description;
      navigation.navigate("Components/Buy", {
        product: productWithoutDescription,
      });
    } else {
      console.error("Product information is missing.");
    }
  };

  const productDetails = (product) => {
    if (product) {
      navigation.navigate("Components/ProductDetails", { product: product });
    } else {
      console.error("Product information is missing.");
    }
  };

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
        <View style={styles.productsContainer}>
          {filteredProducts.map((product, index) => (
            <TouchableOpacity
              key={product.id}
              style={styles.product}
              onPress={() => productDetails(product)}
            >
              <Image source={{ uri: product.image }} style={styles.image} />
              <View style={styles.productDetails}>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>₹ {product.price} </Text>
                <Text>{product.reviews}</Text>
                <Text style={styles.stockStatus}>{product.stockStatus}</Text>
                <Text style={styles.description}>
                  {product.showFullDescription
                    ? product.description
                    : `${product.description?.substring(0, 100)}...`}
                </Text>

                {!product.showFullDescription && (
                  <TouchableOpacity
                    onPress={() => toggleDescription(index)}
                    style={styles.showMoreButton}
                  >
                    <Text style={styles.showMoreText}>Show More</Text>
                  </TouchableOpacity>
                )}
                {/* <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      addToCart(
                        product.id,
                        product.name,
                        product.price,
                        product.image
                      )
                    }
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Add to Cart</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => buyNow(product)}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Buy Now</Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Link href={"Components/Profile"} style={styles.footerIcon}>
          <AntDesign name="user" size={24} color="black" />
        </Link>
        <Link href={"Components/Cart/Cart"} style={styles.footerIcon}>
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
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  product: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "48%", // Adjust width as needed
    paddingHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: "#4CAF50",
    marginBottom: 5,
  },
  stockStatus: {
    color: "red",
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
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
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
