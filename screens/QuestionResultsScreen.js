import { Text, View, TouchableOpacity } from "react-native";
import styles from "../helpers/styles";
import { useEffect, useState } from "react";
import getQuestion from "../helpers/getQuestion";
import SwipeCards from "../components/SwipeCards";
import Card from "../components/Card";
import StatusCard from "../components/StatusCard";
import FlipCard from "../components/FlipCard";

export default function QuestionResultsScreen({ route, navigation }) {
  const { language, questionType, topic } = route.params;
  const isQuiz = questionType.quiz == "quiz";
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshData, setRefreshData] = useState(0);

  const [questions, setQuestions] = useState([]);
  const [incorrectIndexes, setIncorrectIndexes] = useState([]);

  const [correctCounter, setCorrectCounter] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionsRes = await getQuestion(
          language,
          questionType.type,
          topic,
          questionType.answers
        );
        setQuestions(questionsRes);
        setRefreshKey(refreshKey+ 1)
        setCorrectCounter(0);
        setIncorrectIndexes([]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [refreshData]);

  function handleYup(card) {
    if (isQuiz) {
      if (card.answer == "Yes") {
        setCorrectCounter(correctCounter + 1);
        console.log(correctCounter);
        return false;
      } else {
        setIncorrectIndexes([...incorrectIndexes, questions.indexOf(card)]);
        console.log(correctCounter);
        return false;
      }
    }
    return false;
  }
  function handleNope(card) {
    if (isQuiz) {
      if (card.answer == "No") {
        setCorrectCounter(correctCounter + 1);
        console.log(correctCounter);
        return false;
      } else {
        setIncorrectIndexes([...incorrectIndexes, questions.indexOf(card)]);
        console.log(correctCounter);
        return false;
      }
    }
    return false;
  }
  const handleRefresh = () => {
    console.log(correctCounter);
    setRefreshKey(refreshKey + 1);
    setCorrectCounter(0);
    setIncorrectIndexes([])
  };

  const handleReload = () => {
    setQuestions([])
    console.log(correctCounter);
    setRefreshData(refreshData + 1);
    setCorrectCounter(0);
    setIncorrectIndexes([])
  };

  return (
    <View style={styles.container}>
      {questions && questions.length ? (
        <SwipeCards
          key={refreshKey}
          cards={questions}
          isFlip={questionType.quiz == "flip"}
          renderCard={(cardData) =>
            questionType.quiz == "flip" ? (
              <FlipCard data={{ ...cardData, border: "black" }} />
            ) : (
              <Card data={{ ...cardData, border: "black" }} />
            )
          }
          keyExtractor={(cardData) => String(cardData.question)}
          renderNoMoreCards={() =>
            isQuiz ? (
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
          handleNope={handleNope}
          handleYup={handleYup}
          neutral={!isQuiz}
        />
      ) : (
        <StatusCard text="Loading..." />
      )}
    </View>
  );
}
