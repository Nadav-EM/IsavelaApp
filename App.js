import SplashScreen from "./Screens/SplashScreen";
import Main from "./Screens/Main";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShowInfo from "./Screens/ShowInfo";
import MainScreen from "./Screens/MainScreen";
import ShowProductScreen from "./Screens/ShowProductScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="ShowProductScreen"
          component={ShowProductScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ShowInfo" component={ShowInfo} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
