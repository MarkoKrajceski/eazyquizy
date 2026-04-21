import { Text, View, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import styles, { COLORS } from "../helpers/styles";
import topics from "../data/topics";

export default function TopicPickerScreen({ route, navigation }) {
  const { language, questionType } = route.params;

  return (
    <FlashList
      data={topics}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.pickerRow}
          onPress={() =>
            navigation.navigate("QuestionResultsScreen", {
              language,
              questionType,
              topic: item.topic,
            })
          }
          activeOpacity={0.7}
        >
          <View style={styles.pickerIconBox}>
            <Ionicons name={item.icon} size={22} color={COLORS.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.pickerRowTitle}>{item.topic}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
        </TouchableOpacity>
      )}
      estimatedItemSize={62}
      contentContainerStyle={styles.listContent}
    />
  );
}
