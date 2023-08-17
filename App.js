import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuestionTypePickerScreen from "./screens/QuestionTypePickerScreen";
import LanguagePickerScreen from "./screens/LanguagePickerScreen";
import TopicPickerScreen from "./screens/TopicPickerScreen";
import QuestionResultsScreen from "./screens/QuestionResultsScreen";
import QuizReviewScreen from "./screens/QuizReviewScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LanguagePickerScreen">
        <Stack.Screen
          name="LanguagePickerScreen"
          component={LanguagePickerScreen}
          options={({ navigation, route }) => ({
            headerTitle: () => "",
          })}
        />
        <Stack.Screen
          name="QuestionTypePickerScreen"
          component={QuestionTypePickerScreen}
          options={({ navigation, route }) => ({
            headerTitle: () => "",
          })}
        />
        <Stack.Screen
          name="TopicPickerScreen"
          component={TopicPickerScreen}
          options={({ navigation, route }) => ({
            headerTitle: () => "",
          })}
        />
        <Stack.Screen
          name="QuestionResultsScreen"
          component={QuestionResultsScreen}
          options={({ navigation, route }) => ({
            headerTitle: () => "",
          })}
        />
        <Stack.Screen
          name="QuizReviewScreen"
          component={QuizReviewScreen}
          options={({ navigation, route }) => ({
            headerTitle: () => "",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
