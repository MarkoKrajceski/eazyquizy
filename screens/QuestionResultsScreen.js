import { Text, View, TouchableOpacity } from "react-native";
import styles from "../helpers/styles";
import { useEffect, useState } from "react";
import getQuestion from "../helpers/getQuestion";
import SwipeCards from "../helpers/react-native-swipe-cards-deck";
import Card from "../components/Card";
import StatusCard from "../components/StatusCard";
import FlipCard from "../components/FlipCard";

export default function QuestionResultsScreen({ route, navigation }) {
  const { language, questionType, topic } = route.params;
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshData, setRefreshData] = useState(0);

  const [questions, setQuestions] = useState([]);
  const [incorrectIndexes, setIncorrectIndexes] = useState([]);

  const [correctCounter, setCorretCounter] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let questionsRes = await getQuestion(
          language,
          questionType.type,
          topic,
          questionType.answers
        );
        setQuestions(questionsRes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [refreshData]);

  function handleYup(card) {
    if (questionType.quiz == "quiz") {
      if (card.answer == "Yes") {
        setCorretCounter(correctCounter + 1);
      } else {
        setIncorrectIndexes([...incorrectIndexes, questions.indexOf(card)]);
      }
    }
    return true;
  }
  function handleNope(card) {
    if (questionType.quiz == "quiz") {
      if (card.answer == "No") {
        setCorretCounter(correctCounter + 1);
      } else {
        setIncorrectIndexes([...incorrectIndexes, questions.indexOf(card)]);
      }
    }
    return true;
  }
  const handleRefresh = () => {
    setRefreshKey(refreshKey + 1);
    setCorretCounter(0);
  };

  const handleReload = () => {
    setRefreshData(refreshData + 1);
    // setRefreshKey(refreshKey + 1);
    setCorretCounter(0);
  };

  return (
    <View style={styles.container}>
      {questions && questions.length ? (
        <SwipeCards
          key={refreshKey}
          cards={questions}
          renderCard={(cardData) =>
            questionType.quiz == "flip" ? (
              <FlipCard data={{ ...cardData, border: "black" }} />
            ) : (
              <Card data={{ ...cardData, border: "black" }} />
            )
          }
          keyExtractor={(cardData) => String(cardData.question)}
          renderNoMoreCards={() =>
            questionType.quiz == "quiz" ? (
              <>
                <StatusCard text={`Result :${correctCounter}/10`} />
                <TouchableOpacity
                  style={{ ...styles.button }}
                  onPress={() => {
                    navigation.navigate("QuizReviewScreen", {
                      language: language,
                      questionType: questionType,
                      topic: topic,
                      questions: questions,
                      incorrectIndexes: incorrectIndexes,
                    });
                  }}
                >
                  <Text>Review Answers</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.button }}
                  onPress={handleRefresh}
                >
                  <Text>Retake</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ ...styles.button }}
                  onPress={handleReload}
                >
                  <Text>Generate new questions</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <StatusCard text="No more cards..." />

                <TouchableOpacity
                  style={{ ...styles.button }}
                  onPress={handleReload}
                >
                  <Text>Generate new questions</Text>
                </TouchableOpacity>
              </>
            )
          }
          actions={{
            nope: { onAction: handleNope },
            yup: { onAction: handleYup },
          }}
          neutral={questionType.quiz != "quiz"}
        />
      ) : (
        <StatusCard text="Loading..." />
      )}
    </View>
  );
}
