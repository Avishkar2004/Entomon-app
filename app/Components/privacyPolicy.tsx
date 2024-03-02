import React from "react";
import {  Text, StyleSheet, ScrollView } from "react-native";

const privacyPolicyText = `
Welcome to Entomon Pest Solutions's Privacy Policy!

At Entomon Pest Solutions, we take your privacy seriously. This Privacy Policy describes how we collect, use, and share your information when you use our services or interact with our website.

Starting a New Pest Control Company:
We're excited to announce the launch of our new pest control company in Pune! With [Your Company Name], we aim to provide top-notch pest control services to our customers in Pune and beyond. Our team of experienced professionals is dedicated to delivering effective pest control solutions to ensure a pest-free environment for your home or business.

We Never Share Your Information:
Your privacy is of utmost importance to us. We want you to feel confident and secure when using our services. We want to assure you that we never share your personal information with third parties without your consent. Any information collected from you is used solely for the purpose of providing our pest control services and improving your experience with us.

Security of Bank Account Details:
We understand the sensitivity of your bank account details. When you choose to make payments for our services, rest assured that your bank account information is handled with the utmost care and security. We employ industry-standard security measures to protect your financial data from unauthorized access or misuse.

Thank you for trusting [Your Company Name] for your pest control needs. If you have any questions or concerns about our Privacy Policy or how we handle your information, please don't hesitate to contact us.

[Entomon Pest Solutions]
`;

const PrivacyPolicy = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Privacy Policy</Text>
      <Text style={styles.paragraph}>{privacyPolicyText}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333", // Change color to a darker shade
    textDecorationLine: "underline", // Add underline
  },
  paragraph: {
    marginBottom: 15,
    lineHeight: 22,
    fontSize: 16, // Adjust font size
    textAlign: "justify", // Justify text
  },
});

export default PrivacyPolicy;
