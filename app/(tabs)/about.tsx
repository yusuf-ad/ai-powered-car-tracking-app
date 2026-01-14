import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/context/auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Appearance,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const developers = [
  {
    name: "Osman İ.",
    id: "221504891",
    department: "SENG",
    avatar: "https://i.pravatar.cc/150?u=osman",
  },
  {
    name: "Yusuf A.",
    id: "221504005",
    department: "SENG",
    avatar: "https://i.pravatar.cc/150?u=yusuf",
  },
  {
    name: "Yunus Mert K.",
    id: "221504004",
    department: "SENG",
    avatar: "https://i.pravatar.cc/150?u=yunus",
  },
  {
    name: "Muhammet Mustafa Ö.",
    id: "221504008",
    department: "SENG",
    avatar: "https://i.pravatar.cc/150?u=muhammet1",
  },
  {
    name: "Mehmet Ali K.",
    id: "221504018",
    department: "SENG",
    avatar: "https://i.pravatar.cc/150?u=mehmet",
  },
  {
    name: "Songül Y.",
    id: "231504810",
    department: "SENG",
    avatar: "https://i.pravatar.cc/150?u=songul",
  },
  {
    name: "Muhammet Emir Y.",
    id: "221504014",
    department: "SENG",
    avatar: "https://i.pravatar.cc/150?u=muhammet2",
  },
  {
    name: "Muhammed D.",
    id: "211502009",
    department: "EEE",
    avatar: "https://i.pravatar.cc/150?u=muhammed1",
  },
  {
    name: "Furkan D.",
    id: "221504019",
    department: "SENG",
    avatar: "https://i.pravatar.cc/150?u=furkan",
  },
  {
    name: "Muhammed Dogan T.",
    id: "221504037",
    department: "SENG",
    avatar: "https://i.pravatar.cc/150?u=muhammed2",
  },
  {
    name: "Sudenaz A.",
    id: "221504027",
    department: "SENG",
    avatar: "https://i.pravatar.cc/150?u=sudenaz",
  },
  {
    name: "Ahmet N.",
    id: "221504039",
    department: "SENG",
    avatar: "https://i.pravatar.cc/150?u=ahmet",
  },
];

export default function AboutScreen() {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === "dark");
  const { top } = useSafeAreaInsets();
  const { user, signOut } = useAuth();
  const router = useRouter();

  const toggleTheme = (value: boolean) => {
    setIsDark(value);
    Appearance.setColorScheme(value ? "dark" : "light");
  };

  const handleOpenSourceCode = () => {
    Linking.openURL("https://github.com/yusuf-ad/ai-powered-car-tracking-app");
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace("/");
  };

  const cardBackgroundColor = colorScheme === "dark" ? "#1E1E1E" : "#FFFFFF";
  const shadowColor = colorScheme === "dark" ? "#000" : "#000";

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: top + 8 }]}
      >
        <ThemedText type="title" style={styles.headerTitle}>
          About
        </ThemedText>

        {/* Project Info Card */}
        <View
          style={[
            styles.card,
            { backgroundColor: cardBackgroundColor, shadowColor },
          ]}
        >
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            Project Info
          </ThemedText>
          <ThemedText style={styles.projectDescription}>
            This vehicle counter system is this project and wosaterned as a
            vehicle system as a baze:d vsalt and usoscur conmeran stratem.
            ircsotantls building enpemunications for example and control
            detectiors and unamovical analytic.
          </ThemedText>
        </View>

        {/* Developers Card */}
        <View
          style={[
            styles.card,
            { backgroundColor: cardBackgroundColor, shadowColor },
          ]}
        >
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            Developers
          </ThemedText>
          {developers.map((dev, index) => (
            <View key={index} style={styles.developerRow}>
              <Image source={{ uri: dev.avatar }} style={styles.avatar} />
              <View style={styles.developerInfo}>
                <ThemedText type="defaultSemiBold">{dev.name}</ThemedText>
                <ThemedText style={styles.studentId}>
                  {dev.id} - {dev.department}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>

        {/* Dark Mode Toggle */}
        <View
          style={[
            styles.card,
            styles.rowCard,
            { backgroundColor: cardBackgroundColor, shadowColor },
          ]}
        >
          <ThemedText type="defaultSemiBold">Dark Mode</ThemedText>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>

        {/* View Source Code Button */}
        <TouchableOpacity style={styles.button} onPress={handleOpenSourceCode}>
          <Ionicons
            name="logo-github"
            size={24}
            color="black"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>View Source Code</Text>
        </TouchableOpacity>

        {/* Sign Out Button */}
        {user && (
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <Ionicons
              name="log-out-outline"
              size={24}
              color="#FFFFFF"
              style={styles.buttonIcon}
            />
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        )}

        {/* Bottom padding */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 60, // Space for header
  },
  headerTitle: {
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  projectDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  developerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: "#ccc",
  },
  developerInfo: {
    flex: 1,
  },
  studentId: {
    fontSize: 12,
    opacity: 0.6,
  },
  rowCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8EAF6", // Light blueish gray
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#C5CAE9",
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A237E",
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DC3545",
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 16,
  },
  signOutButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
