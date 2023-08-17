import { Text, View, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../helpers/styles";
import questionTypes from "../data/questionTypes";

export default function QuestionTypePickerScreen({ route, navigation }) {
  const { language } = route.params;

  return (
    <FlashList
      data={questionTypes}
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
                navigation.navigate("TopicPickerScreen", {
                  language: language,
                  questionType: item,
                });
              }}
            >
              <Text
                style={{
                  ...styles.buttonTextSmall,
                }}
              >
                {item.type}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}
      estimatedItemSize={questionTypes.length}
    />
  );
}
