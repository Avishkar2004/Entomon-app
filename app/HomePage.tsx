// HomePage.tsx
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
import { Camera, CameraType } from "expo-camera";
import { Button } from "react-native";

const HomePage = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [showCamera, setShowCamera] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const toggleNavbarVisibility = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/productData")
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = data.filter(
          (product) => product.product_id !== 100
        );
        setProducts(filteredProducts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const noResultsMessage = () => {
    if (filteredProducts.length === 0 && searchQuery.length > 0) {
      return (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>Product Not Found</Text>
        </View>
      );
    }
    return null;
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
          onChangeText={(text) => setSearchQuery(text)}
        />
        {isNavbarVisible ? (
          <TouchableOpacity onPress={toggleNavbarVisibility}>
            <AntDesign name="menu-fold" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleNavbarVisibility}>
            <AntDesign name="menu-unfold" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      {/* {showCamera && hasPermission && (
        <Camera style={styles.camera} type={type}>
          <View style={styles.cameraButtons}>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => setShowCamera(false)}
            >
              <Text style={styles.cameraButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => alert("Take a picture functionality")}
            >
              <Text style={styles.cameraButtonText}>Take Picture</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )} */}
      {isNavbarVisible && (
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.navbarItem}>
            <Text style={styles.navbarText}>Phone Number</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navbarItem}>
            <Text style={styles.navbarText}>Address</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navbarItem}>
            <Text style={styles.navbarText}>Wishlist</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.productsContainer}>
          {noResultsMessage()}
          {filteredProducts.map((product, index) => (
            <TouchableOpacity
              key={product.product_id}
              style={styles.product}
              onPress={() => productDetails(product)}
            >
              <Image source={{ uri: product.photo }} style={styles.image} />
              <View style={styles.productDetails}>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>₹ {product.rupees}</Text>
                <Text style={styles.review}>
                  Review: {product.review} (102)
                </Text>
                <Text>
                  <Text style={styles.percentOff}>% </Text>
                  {product.percent_off} off
                </Text>
                <Text style={styles.deliveryCharges}>
                  Delivery Charges: {product.delivery_charges}
                </Text>
                <Text style={styles.time}>
                  Free delivery by: {product.delivery_time}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.headerForPrompt}>
        <Feather
          name="search"
          size={24}
          color="black"
          style={styles.searchIconForPrompt}
        />
        <TextInput
          style={styles.searchInputForPrompt}
          placeholder="Message Agro Easy..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <View style={styles.footer}>
        <Link href={"Components/Profile"} style={styles.footerIcon}>
          <AntDesign name="user" size={24} color="black" />
        </Link>
        <Link href={"Components/Cart/Cart"} style={styles.footerIcon}>
          <AntDesign name="shoppingcart" size={25} color="black" />
        </Link>
        <View>
          <Feather
            name="more-horizontal"
            size={24}
            color="black"
            style={styles.footerIcon}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noResultsContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 30,
    color: "red",
  },
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
    zIndex: 2,
  },
  headerForPrompt: {
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    zIndex: 2,
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
  searchIconForPrompt: {
    position: "absolute", // Position the icon absolutely
    left: 15, // Adjust the left position for alignment
    zIndex: 1, // Ensure the icon appears above the input field
    top: 18, // Adjust the top position for alignment
  },
  searchInputForPrompt: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 40, // Adjust the left padding for the icon
    marginBottom: 50, // Adjust margin bottom for spacing
    width: Dimensions.get("window").width - 20, // Adjust width to fill container
  },

  cameraIcon: {
    marginLeft: 10,
  },

  messageInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 60,
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
    marginTop: 10, // Adjust the marginTop to create space between camera and search bar
  },
  cameraButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
  cameraButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  cameraButtonText: {
    fontSize: 16,
  },
  scrollContainer: {
    flexGrow: 1,
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
    width: "48%",
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
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  menuIcon: {
    marginLeft: 10,
  },
  navbar: {
    flexDirection: "column",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  navbarItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  navbarText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#4CAF50",
    marginBottom: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "#fff",
  },
  footerIcon: {
    marginLeft: 10,
  },
});

export default HomePage;
