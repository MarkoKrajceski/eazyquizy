import { View, Text } from "react-native";
import styles from "../helpers/styles";

export default function StatusCard({ text }) {
  return (
    <View style={styles.statusContainer}>
      <Text style={styles.cardsText}>{text}</Text>
    </View>
  );
}
