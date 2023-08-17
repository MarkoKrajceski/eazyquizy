import { Text, View, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../helpers/styles";
import getContrastColor from "../helpers/getContrastColor";
import { useEffect, useState } from "react";
import getQuestion from "../helpers/getQuestion";
import SwipeCards from "../helpers/react-native-swipe-cards-deck";
import Card from "../components/Card";
import StatusCard from "../components/StatusCard";

export default function QuizReviewScreen({ route, navigation }) {
  const { questions, incorrectIndexes } = route.params;
  const [refreshKey, setRefreshKey] = useState(0);

  function handleYup(card) {
    return true;
  }
  function handleNope(card) {
    return true;
  }

  return (
    <View style={styles.container}>
      {questions && questions.length ? (
        <SwipeCards
          key={refreshKey}
          cards={questions}
          renderCard={(cardData) => (
            <Card
              data={{
                ...cardData,
                border: incorrectIndexes.includes(questions.indexOf(cardData))
                  ? "red"
                  : "green",
              }}
            />
          )}
          keyExtractor={(cardData) => String(cardData.question)}
          renderNoMoreCards={() => (
            <>
              <TouchableOpacity
                style={{ ...styles.button }}
                onPress={navigation.goBack}
              >
                <Text>Go Back</Text>
              </TouchableOpacity>
            </>
          )}
          actions={{
            nope: { onAction: handleNope },
            yup: { onAction: handleYup },
          }}
          neutral={true}
        />
      ) : (
        <StatusCard text="Loading..." />
      )}
    </View>
  );
}
