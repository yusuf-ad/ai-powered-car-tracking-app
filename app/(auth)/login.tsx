import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme === "dark" ? "dark" : "light"];
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    const { error } = await signIn(email, password);
    setIsLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.replace("/(tabs)");
  };

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      {/* APP TITLE */}
      <Text
        style={[
          styles.appTitle,
          { color: colorScheme === "light" ? "#2F3C8F" : "#E8EAF6" },
        ]}
      >
        LOGIN
      </Text>

      {/* ICON */}
      <Image
        source={require("../../assets/images/home.png")}
        style={styles.image}
        resizeMode="contain"
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
      <Text style={[styles.label, { color: themeColors.label }]}>Password</Text>

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

      {/* LOGIN BUTTON */}
      <TouchableOpacity
        style={[styles.loginButton, isLoading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>LOGIN</Text>
        )}
      </TouchableOpacity>

      {/* SIGNUP LINK */}
      <View style={styles.signupContainer}>
        <Text style={[styles.signupText, { color: themeColors.label }]}>
          Don&apos;t have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* BACK BUTTON */}
      <TouchableOpacity
        hitSlop={24}
        style={[styles.backButton, { top: top }]}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

/* =======================
   STYLES
   ======================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    position: "relative",
  },

  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2F3C8F",
    letterSpacing: 2,
    marginBottom: 40,
  },

  image: {
    width: 140,
    height: 140,
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
    marginBottom: 20,
  },

  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
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

  loginButton: {
    width: "100%",
    height: 55,
    backgroundColor: "#2F3C8F",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  signupContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },

  signupText: {
    fontSize: 14,
    color: "#9A9A9A",
  },

  signupLink: {
    fontSize: 14,
    color: "#e80f95ff",
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
