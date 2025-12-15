import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignupScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme === "dark" ? "dark" : "light"];
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  const handleSignup = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      alert("Please accept the terms and conditions");
      return;
    }

    // Signup logic here
    alert("Signup successful! You can now login.");
    router.push("/(auth)/login");
  };

  return (
    <ScrollView
      style={[
        styles.scrollContainer,
        { backgroundColor: themeColors.background },
      ]}
      contentContainerStyle={styles.scrollContent}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: themeColors.background, paddingTop: top },
        ]}
      >
        {/* APP TITLE */}
        <Text
          style={[
            styles.appTitle,
            { color: colorScheme === "light" ? "#2F3C8F" : "#E8EAF6" },
          ]}
        >
          SIGN UP
        </Text>

        {/* ICON */}
        <Image
          source={require("../../assets/images/home.png")}
          style={styles.image}
          resizeMode="contain"
        />

        {/* FULL NAME LABEL */}
        <Text style={[styles.label, { color: themeColors.label }]}>
          Full Name
        </Text>

        {/* FULL NAME INPUT */}
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Your Name"
          placeholderTextColor={colorScheme === "dark" ? "#666" : "#999"}
          style={[
            styles.input,
            {
              backgroundColor: themeColors.inputBackground,
              color: themeColors.inputText,
            },
          ]}
          autoCapitalize="words"
        />

        {/* EMAIL LABEL */}
        <Text style={[styles.label, { color: themeColors.label }]}>
          Email Address
        </Text>

        {/* EMAIL INPUT */}
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="example@email.com"
          placeholderTextColor={colorScheme === "dark" ? "#666" : "#999"}
          style={[
            styles.input,
            {
              backgroundColor: themeColors.inputBackground,
              color: themeColors.inputText,
            },
          ]}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* PASSWORD LABEL */}
        <Text style={[styles.label, { color: themeColors.label }]}>
          Password
        </Text>

        {/* PASSWORD INPUT */}
        <View style={styles.passwordContainer}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={colorScheme === "dark" ? "#666" : "#999"}
            style={[
              styles.passwordInput,
              {
                backgroundColor: themeColors.inputBackground,
                color: themeColors.inputText,
              },
            ]}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Text style={{ fontSize: 18, color: themeColors.inputText }}>
              {passwordVisible ? "👁️" : "👁️‍🗨️"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* CONFIRM PASSWORD LABEL */}
        <Text style={[styles.label, { color: themeColors.label }]}>
          Confirm Password
        </Text>

        {/* CONFIRM PASSWORD INPUT */}
        <View style={styles.passwordContainer}>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            placeholderTextColor={colorScheme === "dark" ? "#666" : "#999"}
            style={[
              styles.passwordInput,
              {
                backgroundColor: themeColors.inputBackground,
                color: themeColors.inputText,
              },
            ]}
            secureTextEntry={!confirmPasswordVisible}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            <Text style={{ fontSize: 18, color: themeColors.inputText }}>
              {confirmPasswordVisible ? "👁️" : "👁️‍🗨️"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* TERMS & CONDITIONS */}
        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              { borderColor: agreeTerms ? "#2F3C8F" : "#CCC" },
            ]}
            onPress={() => setAgreeTerms(!agreeTerms)}
          >
            {agreeTerms && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={[styles.termsText, { color: themeColors.label }]}>
            I agree to the Terms and Conditions
          </Text>
        </View>

        {/* SIGNUP BUTTON */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>

        {/* LOGIN LINK */}
        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { color: themeColors.label }]}>
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* BACK BUTTON */}
        <TouchableOpacity
          hitSlop={24}
          style={[styles.backButton, { top: top - 20 }]}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* =======================
   STYLES
   ======================= */
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },

  container: {
    alignItems: "center",
    paddingHorizontal: 30,
    position: "relative",
  },

  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2F3C8F",
    letterSpacing: 2,
    marginBottom: 30,
    marginTop: 20,
  },

  image: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },

  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    color: "#9A9A9A",
    marginBottom: 6,
    fontWeight: "600",
  },

  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },

  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
  },

  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },

  eyeIcon: {
    paddingHorizontal: 15,
  },

  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 25,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#CCC",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  checkmark: {
    color: "#2F3C8F",
    fontSize: 16,
    fontWeight: "bold",
  },

  termsText: {
    flex: 1,
    fontSize: 13,
    color: "#9A9A9A",
  },

  signupButton: {
    width: "100%",
    height: 55,
    backgroundColor: "#e80f95ff",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  loginContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  loginText: {
    fontSize: 14,
    color: "#9A9A9A",
  },

  loginLink: {
    fontSize: 14,
    color: "#2F3C8F",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1.5,
    borderColor: "#d1d5db",
  },

  backButtonText: {
    fontSize: 22,
    color: "#2F3C8F",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
