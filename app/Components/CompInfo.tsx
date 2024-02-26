import React from "react";
import { View, Text, StyleSheet, ScrollView, Linking } from "react-native";

const CompanyInformationPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Welcome to [Your Company Name]</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>About Us:</Text>
        <Text style={styles.description}>
          [Provide a comprehensive overview of your company, including its
          history, mission, vision, values, and what sets it apart from
          competitors.]
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Our Services/Products:</Text>
        <Text style={styles.description}>
          [List and describe the range of services or products your company
          offers, highlighting key features and benefits.]
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Contact Us:</Text>
        <Text style={styles.contactInfo}>
          - **Address:** Address Sr. No 422{"\n"}, Narayan Peth , Pune City,
          Pune-411030, Maharashtra , India{"\n"}- **Phone:** 8010281236{"\n"}-
          **Email:** entomon.pestsolution@gmail.com{"\n"}- **Website:**{" "}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("https://www.pestokiller.com/")}
          >
            https://www.pestokiller.com/
          </Text>
        </Text>
      </View>

      {/* Add more sections as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
  contactInfo: {
    fontSize: 16,
    color: "#555",
  },
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
});

export default CompanyInformationPage;
