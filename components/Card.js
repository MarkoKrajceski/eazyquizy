import { Text, View } from "react-native";
import styles from "../helpers/styles";

export default function Card({ data }) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: data.backgroundColor,
          borderColor: data.border,
          borderWidth: 2,
        },
      ]}
    >
      <Text>{data.question}</Text>
    </View>
  );
}
