import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import HorizontalLinearStepper from "./HorizontalLinearStepper";

const Buy = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;
  const [showModal, setShowModal] = useState(false);

  const handleBuyToCart = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const passDataToPayment = (product) => {
    if (product) {
      navigation.navigate("Components/Payment", { product: product });
    } else {
      console.error("Product info is missing");
    }
  };

  const handleAddress = () => {
    if (product) {
      navigation.navigate("Components/ChangeAddress", {
        product: product,
      });
    } else {
      console.error("Product info is missing");
    }
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
              style={{ marginRight: 10 }}
            />
            Order Summary
          </Text>
        </TouchableOpacity>
        <View style={styles.stepper}>
          <HorizontalLinearStepper />
        </View>
        <View style={styles.productDetails}>
          <Image source={{ uri: product.photo }} style={styles.image} />
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>₹ {product.rupees}</Text>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.deliverTo}>Deliver To:</Text>
          <View style={styles.addressInfo}>
            <Text style={styles.name}>Avishkar kakde</Text>
            <TouchableOpacity onPress={handleAddress}>
              <Text style={styles.changeAddress}>Change Address</Text>
            </TouchableOpacity>
            <Text style={styles.address}>Deliver Here: {product.address}</Text>
            <Text style={styles.pincode}>932203</Text>
          </View>
        </View>
        <View style={styles.priceDetails}>
          <Text style={styles.gstText}>Use GST Invoice :- </Text>
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
              style={styles.productImage}
            />
            <Text>{product.name}</Text>
            <TouchableOpacity
              onPress={(closeModal, () => passDataToPayment(product))}
              style={styles.modalbtnContainer}
            >
              <Text style={styles.buyButtonText}>Skip & Continue</Text>
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
    paddingBottom: 80,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 10,
  },
  BackButton: {
    fontWeight: "bold",
    color: "#007BFF",
    flexDirection: "row",
    alignItems: "center",
  },
  stepper: {
    marginTop: 30,
  },
  addressContainer: {
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    elevation: 2,
  },
  deliverTo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  addressInfo: {
    marginLeft: 10,
  },
  name: {
    marginBottom: 5,
    color: "#555",
  },
  changeAddress: {
    color: "#007bff",
    textDecorationLine: "underline",
    marginBottom: 5,
  },
  address: {
    marginBottom: 5,
    color: "#555",
  },
  pincode: {
    marginBottom: 5,
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
    color: "#333",
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
    color: "#4CAF50",
  },
  priceDetails: {
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
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
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  continueButton: {
    flex: 1,
    backgroundColor: "#fb641b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
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
    width: 300,
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
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
