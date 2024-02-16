import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";

const PopUp = ({ product }) => {
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal

  const handleBuyToCart = () => {
    // Implement logic to Buy product to cart
    console.log(`Bought ${product.name} to cart.`);
    // Show the modal
    setShowModal(true);
  };

  const closeModal = () => {
    // Close the modal
    setShowModal(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>This is the popup page content</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  },
});

export default PopUp;
