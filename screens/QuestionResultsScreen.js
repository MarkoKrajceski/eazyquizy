import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useEffect, useRef, useState } from "react";
import styles, { COLORS } from "../helpers/styles";
import getQuestion from "../helpers/getQuestion";
import SwipeCards from "../components/SwipeCards";
import Card from "../components/Card";
import FlipCard from "../components/FlipCard";

export default function QuestionResultsScreen({ route, navigation }) {
  const { language, questionType, topic } = route.params;
  const isQuiz = questionType.quiz === "quiz";
  const isFlip = questionType.quiz === "flip";

  const [questions, setQuestions] = useState([]);
  const [loadError, setLoadError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loadTrigger, setLoadTrigger] = useState(0);

  // Refs avoid stale-closure issues inside swipe handlers
  const correctRef = useRef(0);
  const incorrectRef = useRef([]);
  // Mirror into state only for the result render
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectIndexes, setIncorrectIndexes] = useState([]);

  useEffect(() => {
    let cancelled = false;
    setQuestions([]);
    setLoadError(null);
    correctRef.current = 0;
    incorrectRef.current = [];
    setCorrectCount(0);
    setIncorrectIndexes([]);

    getQuestion(language, questionType.type, topic, questionType.answers)
      .then((result) => {
        if (!cancelled) {
          setQuestions(result);
          setRefreshKey((k) => k + 1);
        }
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err?.message ?? "Something went wrong.");
      });

    return () => { cancelled = true; };
  }, [loadTrigger]);

  function handleYup(card) {
    if (isQuiz) {
      if (card.answer === "Yes") {
        correctRef.current += 1;
      } else {
        const idx = questions.indexOf(card);
        incorrectRef.current = [...incorrectRef.current, idx];
      }
    }
    return false;
  }

  function handleNope(card) {
    if (isQuiz) {
      if (card.answer === "No") {
        correctRef.current += 1;
      } else {
        const idx = questions.indexOf(card);
        incorrectRef.current = [...incorrectRef.current, idx];
      }
    }
    return false;
  }

  const handleRetake = () => {
    correctRef.current = 0;
    incorrectRef.current = [];
    setCorrectCount(0);
    setIncorrectIndexes([]);
    setRefreshKey((k) => k + 1);
  };

  const handleNewQuestions = () => {
    setLoadTrigger((t) => t + 1);
  };

  const handleDone = () => {
    // Flush refs → state so the result view has the final values
    setCorrectCount(correctRef.current);
    setIncorrectIndexes([...incorrectRef.current]);
  };

  const scoreMessage = () => {
    const pct = correctCount / questions.length;
    if (pct >= 0.8) return "Excellent! 🎉";
    if (pct >= 0.5) return "Good job! 👍";
    return "Keep practicing! 💪";
  };

  if (loadError) {
    return (
      <View style={styles.container}>
        <Text style={[styles.cardsText, { marginBottom: 8 }]}>Oops 😬</Text>
        <Text style={[styles.statusSubText, { marginBottom: 24 }]}>{loadError}</Text>
        <TouchableOpacity style={styles.button} onPress={handleNewQuestions}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!questions.length) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={[styles.statusSubText, { marginTop: 16 }]}>
          Generating questions…
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SwipeCards
        key={refreshKey}
        cards={questions}
        isFlip={isFlip}
        renderCard={(cardData) =>
          isFlip ? (
            <FlipCard data={{ ...cardData, border: "none" }} />
          ) : (
            <Card data={{ ...cardData, border: "none" }} />
          )
        }
        handleNope={handleNope}
        handleYup={handleYup}
        neutral={!isQuiz}
        renderNoMoreCards={() => {
          if (isQuiz) {
            // Flush on first render of result screen
            const score = correctRef.current;
            const total = questions.length;
            const pct = score / total;
            const msg =
              pct >= 0.8 ? "Excellent! 🎉" : pct >= 0.5 ? "Good job! 👍" : "Keep practicing! 💪";
            return (
              <View style={{ alignItems: "center" }}>
                <Text style={styles.scoreBig}>{score}</Text>
                <Text style={styles.scoreOf}>out of {total}</Text>
                <Text style={styles.scoreMessage}>{msg}</Text>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate("QuizReviewScreen", {
                      questions,
                      incorrectIndexes: incorrectRef.current,
                    })
                  }
                >
                  <Text style={styles.buttonText}>Review Answers</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSecondary]}
                  onPress={handleRetake}
                >
                  <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                    Try Again
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSecondary]}
                  onPress={handleNewQuestions}
                >
                  <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                    New Questions
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }

          return (
            <View style={{ alignItems: "center" }}>
              <Text style={[styles.cardsText, { marginBottom: 8 }]}>All done! 🎉</Text>
              <Text style={[styles.statusSubText, { marginBottom: 24 }]}>
                {isFlip ? "Come back to review any time." : "Hope that sparked some ideas!"}
              </Text>
              <TouchableOpacity style={styles.button} onPress={handleNewQuestions}>
                <Text style={styles.buttonText}>New Questions</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonSecondary]}
                onPress={handleRetake}
              >
                <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                  Go Again
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}
