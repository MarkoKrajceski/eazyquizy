import { Text, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../helpers/styles";
import getContrastColor from "../helpers/getContrastColor";
import languages from "../data/languages";

export default function LanguagePickerScreen({ navigation }) {
  return (
    <FlashList
      data={languages}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("QuestionTypePickerScreen", {
              language: item.language,
            })
          }
          activeOpacity={0.75}
          style={{ marginVertical: 5, marginHorizontal: 16 }}
        >
          <LinearGradient
            colors={item.hexColors}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[
              styles.pickerRow,
              { marginVertical: 0, marginHorizontal: 0, shadowOpacity: 0.1 },
            ]}
          >
            <Text
              style={[
                styles.pickerRowTitle,
                { color: getContrastColor(item.hexColors[Math.floor(item.hexColors.length / 2)]) },
              ]}
            >
              {item.language}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
      estimatedItemSize={62}
      contentContainerStyle={styles.listContent}
    />
  );
}
