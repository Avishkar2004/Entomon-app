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
  Linking,
} from "react-native";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useNavigation } from "@react-navigation/native";

const HomePage = () => {
  // Navigation hook
  const navigation = useNavigation();
  // State to toggle visibility of navbar
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  // Function to toggle visibility of navbar
  const toggleNavbarVisibility = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  // State for products and search query
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

  // Fetching product data on component mount
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
          setCartCount(data.length); // Set the count of products in the cart
        } else {
          throw new Error("Data received is not an array");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filtering products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render message when no search results found
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

  // Navigate to product details screen
  const productDetails = (product) => {
    if (product) {
      navigation.navigate("Components/ProductDetails", { product: product });
    } else {
      console.error("Product information is missing.");
    }
  };

  // Handle call press to open phone app
  const handleCallPress = () => {
    Linking.openURL("tel:+8010281236");
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={[styles.options, styles.iconsContainer]}>
        {/* Notification Icon */}
        <TouchableOpacity
          style={styles.iconOption}
          onPress={() => alert("Alert Icon pressed!")}
        >
          <View style={styles.iconWrapper}>
            <Ionicons name="notifications-sharp" size={24} color="black" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>2</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Call Icon */}
        <TouchableOpacity style={styles.iconOption} onPress={handleCallPress}>
          <Feather name="phone-call" size={24} color="black" />
        </TouchableOpacity>

        {/* Cart Icon */}
        {/* Cart Icon */}
        <TouchableOpacity
          style={styles.iconOption}
          onPress={() => navigation.navigate("Components/Cart/Cart")}
        >
          <View style={styles.iconWrapper}>
            <AntDesign name="shoppingcart" size={24} color="black" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Options */}
      <View style={styles.options}>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Entomon</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Is A Products</Text>
        </TouchableOpacity>
      </View>

      {/* Header with Search */}
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

      {/* Scrollable names */}
      {/* Show Camera option */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Components/Camera")}
      >
        <View style={styles.Problem}>Know Your Problem</View>
        <Image
          source={require("../assets/images/image-removebg-preview.png")}
          style={styles.cameraImage}
        />
      </TouchableOpacity>

      {/* Horizontal scrollable names */}
      <ScrollView horizontal contentContainerStyle={styles.scrollableNames}>
        {[1, 2, 3, 4, 5, 6].map((name, index) => (
          <TouchableOpacity key={index} style={styles.scrollableName}>
            <Image
              source={require("../assets/images/kaka-front_600x.webp")}
              style={styles.imageforname}
            />
            <Text style={styles.scrollableNameText}>Name {name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Navbar options */}
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
          <TouchableOpacity style={styles.navbarItem}>
            <Link href={"/Components/Seller"} style={styles.navbarText}>
              Sell on Entomon
            </Link>
          </TouchableOpacity>
        </View>
      )}

      {/* Products list we are fetching from backend (dynamically) */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.productsContainer}>
          {/* Render no results message */}
          {noResultsMessage()}
          {/* Render filtered products */}
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

      {/* Footer */}
      <View style={styles.footer}>
        {/* Profile link when user click button*/}
        <Link href={"Components/Profile"} style={styles.footerIcon}>
          <AntDesign name="user" size={24} color="black" />
        </Link>
        {/* Cart link when user click button*/}
        {/* Cart link when user click button*/}
        <Link href={"Components/Cart/Cart"} style={styles.footerIcon}>
          <AntDesign name="shoppingcart" size={25} color="black" />
          {cartCount > 0 && (
            <View style={styles.footerCartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </Link>

        {/* More options */}
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
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  iconOption: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginHorizontal: 5,
    padding: 8,
    width: 40,
    height: 40,
    elevation: 3,
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },

  review: {
    fontSize: 12, // Adjusted font size
    color: "#666", // Adjusted font color
    marginBottom: 5,
  },
  percentOff: {
    fontSize: 12, // Adjusted font size
    color: "#FF5733", // Adjusted font color
  },
  notificationBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "red",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  deliveryCharges: {
    fontSize: 12, // Adjusted font size
    color: "#666", // Adjusted font color
    marginBottom: 5,
  },

  notificationText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  time: {
    fontSize: 12, // Adjusted font size
    color: "#666", // Adjusted font color
  },
  iconsContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cameraImage: {
    width: Dimensions.get("window").width - 50,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: -50,
  },
  Problem: {
    alignItems: "center",
    fontSize: 30,
  },
  noResultsText: {
    fontSize: 30,
    color: "red",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  options: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2874f0",
    marginRight: 10,
  },
  optionText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },

  scrollableNames: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 100,
    alignItems: "center",
    marginTop: 70,
  },
  scrollableName: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },
  scrollableNameText: {
    fontSize: 14,
    marginVertical: 5,
    textAlign: "center",
  },
  imageforname: {
    width: 80,
    height: 80,
    borderRadius: 60,
    marginBottom: 10,
  },
  cameraIcon: {
    position: "absolute",
    right: 20,
    zIndex: 1,
    top: 14,
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
    flexDirection: "row",
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
    backgroundColor: "#FFFFFF",
  },
  searchIconForPrompt: {
    position: "absolute",
    left: 15,
    zIndex: 1,
    top: 18,
  },
  searchInputForPrompt: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 40,
    width: Dimensions.get("window").width - 20,
    paddingRight: 40,
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

  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 40,
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  product: {
    marginBottom: 20,
    borderRadius: 10,
    width: "48%",
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
    marginRight: "2%", // Adjusted for spacing between cards
    marginBottom: "4%", // Adjusted for spacing between rows
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
    fontSize: 16, // Adjusted font size
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333", // Adjusted font color
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
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#FFFFFF",
  },
  footerCartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  footerIcon: {
    marginLeft: 10,
  },
});

export default HomePage;
