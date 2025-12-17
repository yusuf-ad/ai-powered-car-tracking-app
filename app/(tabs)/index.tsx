import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/auth-context";
import { useTransition } from "@/context/transition-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [ip, setIp] = useState("https://ai-tr***-car-prod.firebaseio.com");
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme === "dark" ? "dark" : "light"];
  const router = useRouter();
  const { user } = useAuth();
  const { top } = useSafeAreaInsets();
  const { startTransition } = useTransition();
  const buttonRef = useRef<View>(null);

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";

  const handleConnectPress = () => {
    buttonRef.current?.measureInWindow((x: number, y: number, w: number, h: number) => {
      const centerX = x + w / 2;
      const centerY = y + h / 2;
      startTransition(centerX, centerY, '#e80f95ff', '/(tabs)/dashboard');
    });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      {/* HEADER */}
      {user && (
        <View style={[styles.header, { top: top + 10 }]}>
          <Text style={[styles.greeting, { color: themeColors.text }]}>
            Hello, {userName}
          </Text>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>
      )}

      {/* APP TITLE */}
      <Text
        style={[
          styles.appTitle,
          { color: colorScheme === "light" ? "#2F3C8F" : "#E8EAF6" },
        ]}
      >
        AI TRACK CAR
      </Text>

      {/* ICON */}
      <Image
        source={require("../../assets/images/home.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* LABEL */}
      <Text style={[styles.label, { color: themeColors.label }]}>
        Firebase Url
      </Text>

      {/* INPUT */}
      <TextInput
        value={ip}
        onChangeText={setIp}
        style={[
          styles.input,
          {
            backgroundColor: themeColors.inputBackground,
            color: themeColors.inputText,
          },
        ]}
        readOnly
        keyboardType="numeric"
      />

      {/* BUTTON */}
      <TouchableOpacity 
        ref={buttonRef}
        style={styles.button}
        onPress={handleConnectPress}
      >
        <Text style={styles.buttonText}>CONNECT SYSTEM</Text>
      </TouchableOpacity>

      {!user && (
        <>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={styles.buttonText}>Login </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text
              style={[
                styles.status,
                { color: colorScheme === "light" ? "#2F3C8F" : "#E8EAF6" },
              ]}
            >
              Create Account
            </Text>
          </TouchableOpacity>
        </>
      )}
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
  },

  header: {
    position: "absolute",
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  greeting: {
    fontSize: 18,
    fontWeight: "600",
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#2F3C8F",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  appTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2F3C8F",
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
