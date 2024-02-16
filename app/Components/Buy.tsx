import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal, // Import Modal component
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Link, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import HorizontalLinearStepper from "./HorizontalLinearStepper";

const Buy = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal

  if (!route.params || !product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Product info missing in Buy Now page
        </Text>
      </View>
    );
  }

  const handleBuyToCart = () => {
    // Implement logic to Buy product to cart
    console.log(`Bought ${quantity} ${product.name} to cart.`);
    // Show the modal
    setShowModal(true);
  };

  const closeModal = () => {
    // Close the modal
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
            Order Summary
          </Text>
        </TouchableOpacity>
        <View style={styles.stepper}>
          <HorizontalLinearStepper />
        </View>
        <Text style={styles.deliverTo}>Deliver To:</Text>
        <Text>Avishkar kakde</Text>
        <Text>
          Pune, LB bhopatkar path, front of kheliya, road, Bhatancha Bol, Pune,
          Maharashtra 411030., PUNE, Maharashtra - 411002
        </Text>
        <Text>93228103</Text>
        <View style={styles.productDetails}>
          <Image source={{ uri: product.photo }} style={styles.image} />
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>₹ {product.rupees}</Text>
        </View>
        <View style={styles.gstContainer}>
          <Text style={styles.gstText}>Use GST Invoice</Text>
        </View>
        <View style={styles.priceDetails}>
          <Text style={styles.priceText}>Item Discount: 0%</Text>
          <Text style={styles.priceText}>
            Delivery charges :- {product.delivery_charges}
          </Text>
          <Text style={styles.totalText}>Total Amount: ₹{product.rupees}</Text>
          <AntDesign name="Safety" size={24} color="black" />
          <Text>Safe and secure payments. Easy returns.</Text>
          <Text>100% Authentic products.</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuyToCart}>
          <Text style={styles.buyButtonText}>{product.rupees}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleBuyToCart}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      {/* we can add more text and whatever in this for now this is for testing purposes */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={{ uri: product.photo }}
              style={styles.productImage} // Added style for the image
            />
            <Text>{product.name}</Text>
            {/* <Text>Product Price:- {product.rupees}</Text> */}
            <TouchableOpacity
              onPress={closeModal}
              style={styles.modalbtnContainer}
            >
              <Link href={"Components/Payment"} style={styles.buyButtonText}>
                Skip & Continue
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Adjust paddingBottom for space for fixed buttons
  },
  backButton: {
    marginTop: 20,
    marginBottom: 10,
  },
  BackButton: {
    fontWeight: "bold",
  },
  stepper: {
    marginTop: 30,
  },
  deliverTo: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  productDetails: {
    alignItems: "center",
    marginBottom: 20,
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
  gstContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  gstText: {
    fontSize: 16,
    marginRight: 10,
  },
  priceDetails: {
    marginBottom: 20,
  },
  priceText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "200",
    marginBottom: 10,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buyButton: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  continueButton: {
    backgroundColor: "#fb641b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
    width: 300, // Set a fixed width for the modal content
  },
  productImage: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    marginBottom: 20,
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalbtnContainer: {
    marginTop: 20,
    backgroundColor: "#fb641b",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  modalbtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Buy;
