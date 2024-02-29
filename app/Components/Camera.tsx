import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Camera as ExpoCamera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";

// Camera Component
const Camera = () => {
  // Ref to access camera functionality
  const cameraRef = useRef(null);

  // State variables
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(ExpoCamera.Constants.Type.back);
  const [problem, setProblem] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  // Request camera permissions on component mount
  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Toggle camera type (front/back)
  const handleCameraType = () => {
    setType(
      type === ExpoCamera.Constants.Type.back
        ? ExpoCamera.Constants.Type.front
        : ExpoCamera.Constants.Type.back
    );
  };

  // Alert to request camera permission
  const requestPermissionAlert = () => {
    Alert.alert(
      "Camera Permission",
      "Please allow camera access to use this feature.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Allow", onPress: handlePermissionRequest },
      ],
      { cancelable: false }
    );
  };

  // Request camera permission
  const handlePermissionRequest = async () => {
    const { status } = await ExpoCamera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  // Capture picture using the camera
  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);
      setShowCamera(false);
    }
  };

  // Pick image from the device's gallery
  const pickImageFromGallery = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        throw new Error("Permission to access media library denied");
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (result.cancelled) {
        console.log("Image picking cancelled");
        return;
      }

      console.log("Selected Image URI:", result.uri);

      // Send the image URI to your backend for further processing
      setCapturedImage(result.uri);
      setShowCamera(true); // Show the camera view after selecting an image
    } catch (error) {
      console.error("Error picking image:", error.message);
    }
  };

  // Send the problem description and captured image to the backend
  const sendProblem = () => {
    console.log("Problem:", problem);
    console.log("Captured Image URI:", capturedImage);
    // Reset the state after sending the problem
    setProblem("");
    setCapturedImage(null);
  };

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        // Prompt user to grant permission if it's null
        <View style={styles.permissionContainer}>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermissionAlert}
          >
            <Text style={styles.permissionButtonText}>Give Permission</Text>
          </TouchableOpacity>
        </View>
      ) : hasPermission ? (
        // If permission is granted, render main camera UI
        <>
          <Text style={styles.header}>Know Your Problem</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your problem here"
            value={problem}
            onChangeText={setProblem}
          />
          {showCamera && (
            // Render camera view and controls if showCamera is true
            <ExpoCamera style={styles.camera} type={type} ref={cameraRef}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={takePicture}>
                  <Text style={styles.text}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleCameraType}
                >
                  <Text style={styles.text}>Flip</Text>
                </TouchableOpacity>
              </View>
            </ExpoCamera>
          )}
          {!showCamera && !capturedImage && (
            // Render options to open camera or pick from gallery
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowCamera(true)}
              >
                <Text style={styles.text}>Open Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={pickImageFromGallery}
              >
                <Text style={styles.text}>Pick from Gallery</Text>
              </TouchableOpacity>
            </View>
          )}
          {capturedImage && (
            // Render captured image and upload button
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: capturedImage }}
                style={styles.capturedImage}
              />
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={sendProblem}
              >
                <Text style={styles.uploadText}>Upload Image</Text>
                <Feather
                  name="arrow-up"
                  size={24}
                  color="white"
                  style={styles.arrowIcon}
                />
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        // If permission is denied, continue to prompt user to grant permission
        <View style={styles.permissionContainer}>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermissionAlert}
          >
            <Text style={styles.permissionButtonText}>
              Give Permission To Camera
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
    color: "#333", // Change color to a darker shade
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    fontSize: 18, // Increase font size
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#4CAF50", // Change button color
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginHorizontal: 10,
    elevation: 3, // Add shadow
  },
  text: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  capturedImage: {
    width: 320,
    height: 320,
    borderRadius: 16,
    marginBottom: 30,
    shadowColor: "#000", // Add shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  uploadButton: {
    backgroundColor: "#4CAF50", // Change button color
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    elevation: 3, // Add shadow
  },
  uploadText: {
    fontSize: 18,
    color: "white",
    marginRight: 10,
    fontWeight: "bold",
  },
  arrowIcon: {
    marginLeft: 5,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  permissionButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default Camera;
