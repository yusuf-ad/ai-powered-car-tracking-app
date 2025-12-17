import { useRouter } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");
const CIRCLE_SIZE = Math.max(width, height) * 2.5;

interface Position {
  x: number;
  y: number;
}

interface TransitionContextType {
  startTransition: (
    x: number,
    y: number,
    color?: string,
    targetRoute?: string
  ) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined
);

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within TransitionProvider");
  }
  return context;
};

interface TransitionProviderProps {
  children: ReactNode;
}

export const TransitionProvider = ({ children }: TransitionProviderProps) => {
  const router = useRouter();
  const scale = useRef(new Animated.Value(0)).current;
  const [isAnimating, setIsAnimating] = useState(false);
  const [isShrinking, setIsShrinking] = useState(false);
  const [circleColor, setCircleColor] = useState("#e80f95ff");
  const [expandPosition, setExpandPosition] = useState<Position>({
    x: width / 2,
    y: height / 2,
  });
  
  // TrafficAI title position (top-left area of dashboard)
  const shrinkPosition: Position = {
    x: 80,
    y: 70,
  };

  const startTransition = useCallback(
    (
      x: number,
      y: number,
      color: string = "#e80f95ff",
      targetRoute: string = "/(tabs)/dashboard"
    ) => {
      if (isAnimating) return;

      setCircleColor(color);
      setExpandPosition({ x, y });
      setIsAnimating(true);
      setIsShrinking(false);
      scale.setValue(0);

      // Expand animation
      Animated.timing(scale, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        // Navigate and switch to shrink mode
        router.push(targetRoute as any);
        setIsShrinking(true);

        // Start shrink animation right away
        Animated.timing(scale, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          setIsAnimating(false);
          setIsShrinking(false);
        });
      });
    },
    [isAnimating, router, scale]
  );

  // Use different position based on animation phase
  const currentPosition = isShrinking ? shrinkPosition : expandPosition;

  return (
    <TransitionContext.Provider value={{ startTransition }}>
      {children}

      {isAnimating && (
        <View style={styles.overlay} pointerEvents="none">
          <Animated.View
            style={[
              styles.circle,
              {
                backgroundColor: circleColor,
                left: currentPosition.x - CIRCLE_SIZE / 2,
                top: currentPosition.y - CIRCLE_SIZE / 2,
                transform: [{ scale }],
              },
            ]}
          />
        </View>
      )}
    </TransitionContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    elevation: 9999,
  },
  circle: {
    position: "absolute",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
});
