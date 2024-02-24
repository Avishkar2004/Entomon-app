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

const Camera = () => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(ExpoCamera.Constants.Type.back);
  const [problem, setProblem] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleCameraType = () => {
    setType(
      type === ExpoCamera.Constants.Type.back
        ? ExpoCamera.Constants.Type.front
        : ExpoCamera.Constants.Type.back
    );
  };

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

  const handlePermissionRequest = async () => {
    const { status } = await ExpoCamera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);
      setShowCamera(false);
    }
  };

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setCapturedImage(result.uri);
    }
  };

  const sendProblem = () => {
    // Implement logic to send the problem description and captured image to the backend
    console.log("Problem:", problem);
    console.log("Captured Image URI:", capturedImage);
    // Reset the state after sending the problem
    setProblem("");
    setCapturedImage(null);
  };

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <View style={styles.permissionContainer}>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermissionAlert}
          >
            <Text style={styles.permissionButtonText}>Give Permission</Text>
          </TouchableOpacity>
        </View>
      ) : hasPermission ? (
        <>
          <Text style={styles.header}>Know Your Problem</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your problem here"
            value={problem}
            onChangeText={setProblem}
          />
          {showCamera && (
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
          {capturedImage && (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  capturedImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  uploadText: {
    fontSize: 16,
    color: "white",
    marginRight: 10,
  },
  arrowIcon: {
    marginLeft: 5,
  },
});

export default Camera;
