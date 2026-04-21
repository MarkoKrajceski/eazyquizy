import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import styles, { CARD_WIDTH } from "../helpers/styles";

export default function FlipCard({ data }) {
  const [animatedValue] = useState(new Animated.Value(0));
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const listener = animatedValue.addListener(({ value }) => {
      setFlipped(value >= 90);
    });
    return () => animatedValue.removeListener(listener);
  }, []);

  const flipCard = () => {
    Animated.spring(animatedValue, {
      toValue: flipped ? 0 : 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  const frontRotate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  const backRotate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });
  const frontOpacity = animatedValue.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
  });
  const backOpacity = animatedValue.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
  });

  return (
    <TouchableOpacity onPress={flipCard} activeOpacity={1}>
      <View style={{ width: CARD_WIDTH, minHeight: CARD_WIDTH }}>
        {/* Front */}
        <Animated.View
          style={[
            styles.card,
            { backgroundColor: data.backgroundColor, position: "absolute" },
            { opacity: frontOpacity, transform: [{ rotateY: frontRotate }] },
          ]}
        >
          <Text style={styles.cardText}>{data.question}</Text>
          <Text style={styles.cardHint}>Tap to reveal answer</Text>
        </Animated.View>

        {/* Back */}
        <Animated.View
          style={[
            styles.card,
            { backgroundColor: data.backgroundColor, position: "absolute" },
            { opacity: backOpacity, transform: [{ rotateY: backRotate }] },
          ]}
        >
          <Text style={styles.cardText}>{data.answer}</Text>
          <Text style={styles.cardHint}>Tap to see question</Text>
        </Animated.View>

        {/* Invisible spacer so the TouchableOpacity has correct dimensions */}
        <View
          style={{
            width: CARD_WIDTH,
            minHeight: CARD_WIDTH,
            opacity: 0,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}
