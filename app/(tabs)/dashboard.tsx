import { db } from "@/firebaseConfig";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// --- TYPES ---
interface DurumData {
  giris: number;
  cikis: number;
  icerde: number;
}

interface LogData {
  id: string;
  type: "giris" | "cikis";
  timestamp: any;
}

interface ClassCardProps {
  label: string;
  count: number;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  total: number;
  cardBg: string;
  borderColor: string;
  textColor: string;
  labelColor: string;
  percentageColor: string;
}

// --- COMPONENTS ---

const ClassCard = ({
  label,
  count,
  icon,
  color,
  total,
  cardBg,
  borderColor,
  textColor,
  labelColor,
  percentageColor,
}: ClassCardProps) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <View
      style={[
        styles.classCard,
        { backgroundColor: cardBg, borderColor: borderColor },
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: color + "15" }]}>
          <MaterialCommunityIcons name={icon} size={28} color={color} />
        </View>
        <Text style={[styles.classCount, { color: textColor }]}>{count}</Text>
      </View>

      <View style={styles.cardFooter}>
        <Text style={[styles.classLabel, { color: labelColor }]}>{label}</Text>
        <Text style={[styles.percentageText, { color: percentageColor }]}>
          {percentage.toFixed(0)}%
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={[styles.progressBarBg, { backgroundColor: borderColor }]}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${percentage}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
};

const RecentItem = ({
  type,
  time,
  textColor,
  timeColor,
  borderColor,
}: {
  type: string;
  time: string;
  textColor: string;
  timeColor: string;
  borderColor: string;
}) => (
  <View style={[styles.recentItem, { borderBottomColor: borderColor }]}>
    <View style={styles.recentLeft}>
      <View
        style={[styles.recentDot, { backgroundColor: getTypeColor(type) }]}
      />
      <Text style={[styles.recentType, { color: textColor }]}>
        {type.toUpperCase()}
      </Text>
    </View>
    <Text style={[styles.recentTime, { color: timeColor }]}>{time}</Text>
  </View>
);

const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "car":
      return "#3B82F6";
    case "truck":
      return "#F59E0B";
    case "bus":
      return "#10B981";
    case "motorcycle":
      return "#EF4444";
    default:
      return "#9CA3AF";
  }
};

export default function App() {
  const colorScheme = useColorScheme();
  const [durum, setDurum] = useState<DurumData>({
    giris: 0,
    cikis: 0,
    icerde: 0,
  });
  const [recentLogs, setRecentLogs] = useState<LogData[]>([]);
  // Animation Values
  // We start opacity at 0.6 so it's visible even if user can't scroll much, but animates to 1 on scroll
  const scrollY = useRef(new Animated.Value(0)).current;

  const { top, bottom } = useSafeAreaInsets();

  // Theme colors
  const isDark = colorScheme === "dark";
  const theme = {
    background: isDark ? "#000000" : "#F5F5F5",
    cardBg: isDark ? "#111" : "#FFFFFF",
    text: isDark ? "#FFF" : "#000",
    textSecondary: isDark ? "#888" : "#666",
    textTertiary: isDark ? "#555" : "#999",
    textQuaternary: isDark ? "#444" : "#AAA",
    border: isDark ? "#222" : "#E0E0E0",
    borderStrong: isDark ? "#333" : "#D0D0D0",
    statusBarStyle: isDark ? "light-content" : "dark-content",
  };

  useEffect(() => {
    // Listen to the single status document
    const docRef = doc(db, "otopark", "durum");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as DurumData;

        // Trigger Layout Animation for smooth updates
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        setDurum({
          giris: data.giris || 0,
          cikis: data.cikis || 0,
          icerde: data.icerde || 0,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Interpolations for scroll animation
  // Adjusted: Start at 0.5 opacity so it's never fully invisible
  // Input range shortened so it animates quickly
  const recentOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0.5, 1],
    extrapolate: "clamp",
  });

  const recentTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [20, 0], // Reduced movement distance
    extrapolate: "clamp",
  });

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top,
          paddingBottom: bottom,
          backgroundColor: theme.background,
        },
      ]}
    >
      <StatusBar
        barStyle={theme.statusBarStyle as any}
        backgroundColor={theme.background}
      />

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } // Change to false to avoid native driver issues with some props
        )}
        scrollEventThrottle={16}
      >
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.appTitle, { color: theme.text }]}>
              TRAFFIC<Text style={{ color: "#3B82F6" }}>AI</Text>
            </Text>
            <Text style={[styles.subTitle, { color: theme.textSecondary }]}>
              Gaziantep, TR • CAM-01
            </Text>
          </View>
          <View style={styles.liveBadge}>
            <View style={styles.blinkingDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>

        {/* --- HERO CARD --- */}
        <View
          style={[
            styles.heroCard,
            { backgroundColor: theme.cardBg, borderColor: theme.borderStrong },
          ]}
        >
          <View style={styles.heroInner}>
            <Text style={[styles.heroLabel, { color: theme.textSecondary }]}>
              VEHICLES INSIDE
            </Text>
            <Text style={[styles.heroCount, { color: theme.text }]}>
              {durum.icerde}
            </Text>
          </View>
          <View style={styles.heroGraphIcon}>
            <MaterialCommunityIcons
              name="car-multiple"
              size={44}
              color={isDark ? "#3B82F6" : "#2563EB"}
            />
          </View>
        </View>

        {/* --- GRID --- */}
        <Text style={[styles.sectionTitle, { color: theme.textQuaternary }]}>
          TRAFFIC FLOW
        </Text>
        <View style={styles.gridContainer}>
          <ClassCard
            label="Total Entries"
            count={durum.giris}
            icon="arrow-collapse-down"
            color="#10B981"
            total={durum.giris + durum.cikis}
            cardBg={theme.cardBg}
            borderColor={theme.border}
            textColor={theme.text}
            labelColor={theme.textSecondary}
            percentageColor={theme.textTertiary}
          />
          <ClassCard
            label="Total Exits"
            count={durum.cikis}
            icon="arrow-expand-up"
            color="#EF4444"
            total={durum.giris + durum.cikis}
            cardBg={theme.cardBg}
            borderColor={theme.border}
            textColor={theme.text}
            labelColor={theme.textSecondary}
            percentageColor={theme.textTertiary}
          />
        </View>

        {/* --- RECENT ACTIVITY (ANIMATED) --- */}
        <Animated.View
          style={{
            opacity: recentOpacity,
            transform: [{ translateY: recentTranslateY }],
          }}
        >
          <Text style={[styles.sectionTitle, { color: theme.textQuaternary }]}>
            RECENT DETECTIONS
          </Text>
          <View
            style={[
              styles.recentList,
              { backgroundColor: theme.cardBg, borderColor: theme.border },
            ]}
          >
            {recentLogs.length === 0 ? (
              <Text style={[styles.emptyText, { color: theme.textQuaternary }]}>
                Waiting for detection...
              </Text>
            ) : (
              recentLogs.map((log, index) => (
                <RecentItem
                  key={index}
                  type={log.type}
                  time="Just now"
                  textColor={theme.text}
                  timeColor={theme.textTertiary}
                  borderColor={theme.border}
                />
              ))
            )}
          </View>
        </Animated.View>

        {/* Padding to ensure scrollability for animation effect if content is short */}
        <View style={{ height: 100 }} />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.4)",
  },
  blinkingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#EF4444",
    marginRight: 6,
  },
  liveText: {
    color: "#EF4444",
    fontSize: 10,
    fontWeight: "bold",
  },

  heroCard: {
    borderRadius: 24,
    padding: 25,
    marginBottom: 30,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroInner: {
    flex: 1,
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 5,
    letterSpacing: 1,
  },
  heroCount: {
    fontSize: 64,
    fontWeight: "900",
    letterSpacing: -2,
    lineHeight: 70,
  },
  heroGraphIcon: {
    opacity: 0.2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 15,
    letterSpacing: 1,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  classCard: {
    width: "48%",
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  classCount: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  classLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  percentageText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  progressBarBg: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 2,
  },
  recentList: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 5,
  },
  recentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
  },
  recentLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  recentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
  },
  recentType: {
    fontSize: 14,
    fontWeight: "600",
  },
  recentTime: {
    fontSize: 12,
  },
  emptyText: {
    textAlign: "center",
    padding: 20,
    fontStyle: "italic",
  },
});
