import { Text, View, TouchableOpacity } from "react-native";
import languages from "../data/languages";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../helpers/styles";
import getContrastColor from "../helpers/getContrastColor";

export default function LanguagePickerScreen({ navigation }) {
  return (
    <FlashList
      data={languages}
      renderItem={({ item }) => (
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={item.hexColors}
            start={{ x: 0, y: 0.75 }}
            end={{ x: 1, y: 0.25 }}
            style={styles.button}
          >
            <TouchableOpacity
              style={{ ...styles.button }}
              onPress={() => {
                navigation.navigate("QuestionTypePickerScreen", {
                  language: item.language,
                });
              }}
            >
              <Text
                style={{
                  ...styles.buttonTextSmall,
                  color: getContrastColor(item.hexColors[1]),
                }}
              >
                {item.language}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}
      estimatedItemSize={languages.length}
    />
  );
}
