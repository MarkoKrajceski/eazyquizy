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

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = animatedValue.interpolate({
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

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: data.backgroundColor,
          borderColor: data.border,
          borderWidth: 2,
        },
      ]}
      onPress={flipCard}
    >
      <View>
        <Animated.View style={[frontAnimatedStyle, { opacity: frontOpacity }]}>
          <Text>{data.question}</Text>
        </Animated.View>
        <Animated.View style={[backAnimatedStyle, { opacity: backOpacity }]}>
          <Text>{data.answer}</Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}
