import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTab from "./Tabs/HomeTab";
import WomanTab from "./Tabs/WomanTab";
import ManTab from "./Tabs/ManTab";
const HomeStack = createBottomTabNavigator();
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({
	route: {
		params: { bulbul },
	},
}) => {
	console.log(bulbul);
	console.log("OPTIONSSS");
	return (
		<HomeStack.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {},
				tabBarActiveTintColor: "tomato",
				tabBarInactiveTintColor: "gray",
			})}
		>
			<HomeStack.Screen
				options={{
					headerShown: false,
					tabBarLabel: "Home",
					tabBarIcon: () => <Ionicons name="home" size={24} color="black" />,
				}}
				name="HomeTab"
				component={HomeTab}
			/>
			<HomeStack.Screen
				options={{
					headerShown: false,
					tabBarLabel: "Woman",
					tabBarIcon: () => <Ionicons name="woman" size={24} color="black" />,
				}}
				name="WomanTab"
				component={WomanTab}
			/>
			<HomeStack.Screen
				options={{
					headerShown: false,
					tabBarLabel: "Man",
					tabBarIcon: () => <Ionicons name="man" size={24} color="black" />,
				}}
				name="ManTab"
				component={ManTab}
			/>
		</HomeStack.Navigator>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
