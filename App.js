import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LanguagePickerScreen from "./screens/LanguagePickerScreen";
import QuestionTypePickerScreen from "./screens/QuestionTypePickerScreen";
import TopicPickerScreen from "./screens/TopicPickerScreen";
import QuestionResultsScreen from "./screens/QuestionResultsScreen";
import QuizReviewScreen from "./screens/QuizReviewScreen";
import { COLORS } from "./helpers/styles";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LanguagePickerScreen"
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.primary,
          headerTitleStyle: { fontWeight: "700", fontSize: 18, color: COLORS.textPrimary },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen
          name="LanguagePickerScreen"
          component={LanguagePickerScreen}
          options={{ title: "Choose Language" }}
        />
        <Stack.Screen
          name="QuestionTypePickerScreen"
          component={QuestionTypePickerScreen}
          options={{ title: "Question Type" }}
        />
        <Stack.Screen
          name="TopicPickerScreen"
          component={TopicPickerScreen}
          options={{ title: "Choose Topic" }}
        />
        <Stack.Screen
          name="QuestionResultsScreen"
          component={QuestionResultsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QuizReviewScreen"
          component={QuizReviewScreen}
          options={{ title: "Review Answers" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
