import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import styles from "../helpers/styles";

export default function FlipCard({ data }) {
  const [animatedValue] = useState(new Animated.Value(0));
  const [value, setValue] = useState(0);

  useEffect(() => {
    animatedValue.addListener(({ value }) => {
      setValue(value);
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, []);

  const interpolateFront = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const interpolateBack = animatedValue.interpolate({
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

  const flipCard = () => {
    if (value >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  const cardAnimatedStyle = {
    transform: [
      // Apply rotation based on the side of the card
      { rotateY: value >= 90 ? interpolateBack : interpolateFront },
    ],
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        cardAnimatedStyle,
        {
          backgroundColor: data.backgroundColor,
          borderColor: data.border,
          borderWidth: 2,
        },
      ]}
      onPress={flipCard}
      activeOpacity={1}
    >
      <Animated.View style={{ opacity: frontOpacity }}>
        <Text>{data.question}</Text>
      </Animated.View>
      <Animated.View style={[{ position: 'absolute' }, { opacity: backOpacity }]}>
        <Text>{data.answer}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}
