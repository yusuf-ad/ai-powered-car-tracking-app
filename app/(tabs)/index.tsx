import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [ip, setIp] = useState("https://ai-tr***-car-prod.firebaseio.com");

  return (
    <View style={styles.container}>
      {/* APP TITLE */}
      <Text style={styles.appTitle}>AI TRACK CAR</Text>

      {/* ICON */}
      <Image
        source={require("../../assets/images/home.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* LABEL */}
      <Text style={styles.label}>Firebase Url</Text>

      {/* INPUT */}
      <TextInput
        value={ip}
        onChangeText={setIp}
        style={styles.input}
        readOnly
        keyboardType="numeric"
      />

      {/* BUTTON */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>CONNECT SYSTEM</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button1}>
        <Text style={styles.buttonText}>Login </Text>
      </TouchableOpacity>

      {/* STATUS */}
      <Text style={styles.status}>Alreday Logged in?</Text>
    </View>
  );
}

/* =======================
   STYLES
   ======================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  appTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2F3C8F", // buton rengiyle uyumlu
    letterSpacing: 2,
    marginBottom: 50,
  },

  image: {
    width: 180,
    height: 180,
    marginBottom: 40,
  },

  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    color: "#9A9A9A",
    marginBottom: 6,
  },

  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 25,
  },

  button: {
    width: "100%",
    height: 55,
    backgroundColor: "#e80f95ff",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  button1: {
    width: "100%",
    height: 55,
    backgroundColor: "#2F3C8F",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  status: {
    fontSize: 14,
    color: "#B0B0B0",
  },
});
