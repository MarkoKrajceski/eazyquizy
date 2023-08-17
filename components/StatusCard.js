import { Text, View } from "react-native";
import styles from "../helpers/styles";

export default function StatusCard({ text }) {
  return (
    <View>
      <Text style={styles.cardsText}>{text}</Text>
    </View>
  );
}
