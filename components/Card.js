import { Text, View } from "react-native";
import styles, { COLORS } from "../helpers/styles";

export default function Card({ data }) {
  const borderStyle =
    data.border === "red"
      ? { borderColor: COLORS.danger, borderWidth: 3 }
      : data.border === "green"
      ? { borderColor: COLORS.success, borderWidth: 3 }
      : {};

  return (
    <View style={[styles.card, { backgroundColor: data.backgroundColor }, borderStyle]}>
      <Text style={styles.cardText}>{data.question}</Text>
    </View>
  );
}
