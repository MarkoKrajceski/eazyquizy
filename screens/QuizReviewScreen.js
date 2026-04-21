import { Text, View, TouchableOpacity } from "react-native";
import styles, { COLORS } from "../helpers/styles";
import SwipeCards from "../components/SwipeCards";
import Card from "../components/Card";

export default function QuizReviewScreen({ route, navigation }) {
  const { questions, incorrectIndexes } = route.params;
  const correct = questions.length - incorrectIndexes.length;

  return (
    <View style={styles.container}>
      {questions.length ? (
        <SwipeCards
          cards={questions}
          renderCard={(cardData) => {
            const idx = questions.indexOf(cardData);
            const border = incorrectIndexes.includes(idx) ? "red" : "green";
            return <Card data={{ ...cardData, border }} />;
          }}
          handleYup={() => true}
          handleNope={() => true}
          neutral={true}
          renderNoMoreCards={() => (
            <View style={{ alignItems: "center" }}>
              <Text style={[styles.cardsText, { marginBottom: 8 }]}>
                {correct}/{questions.length} correct
              </Text>
              <Text style={[styles.statusSubText, { marginBottom: 24 }]}>
                Review complete
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.buttonText}>Back to Results</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : null}
    </View>
  );
}
