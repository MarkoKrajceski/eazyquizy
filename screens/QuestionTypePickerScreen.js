import { Text, View, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import styles, { COLORS } from "../helpers/styles";
import questionTypes from "../data/questionTypes";

export default function QuestionTypePickerScreen({ route, navigation }) {
  const { language } = route.params;

  return (
    <FlashList
      data={questionTypes}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.pickerRow}
          onPress={() =>
            navigation.navigate("TopicPickerScreen", {
              language,
              questionType: item,
            })
          }
          activeOpacity={0.7}
        >
          <View style={styles.pickerIconBox}>
            <Ionicons name={item.icon} size={22} color={COLORS.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.pickerRowTitle}>{item.type}</Text>
            {item.description ? (
              <Text style={styles.pickerRowSub}>{item.description}</Text>
            ) : null}
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
        </TouchableOpacity>
      )}
      estimatedItemSize={70}
      contentContainerStyle={styles.listContent}
    />
  );
}
