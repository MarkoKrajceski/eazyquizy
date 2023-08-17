import { Text, View, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../helpers/styles";
import topics from "../data/topics";
export default function TopicPickerScreen({ route, navigation }) {
  const { language, questionType } = route.params;

  return (
    <FlashList
      data={topics}
      renderItem={({ item }) => (
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={["#FFFFFF", "#FFFFFF"]}
            // style={styles.background}
            start={{ x: 0, y: 0.75 }}
            end={{ x: 1, y: 0.25 }}
            style={styles.button}
          >
            <TouchableOpacity
              style={{ ...styles.button }}
              onPress={() => {
                navigation.navigate("QuestionResultsScreen", {
                  language: language,
                  questionType: questionType,
                  topic: item.topic,
                });
              }}
            >
              <Text
                style={{
                  ...styles.buttonTextSmall,
                }}
              >
                {item.topic}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}
      estimatedItemSize={topics.length}
    />
  );
}
