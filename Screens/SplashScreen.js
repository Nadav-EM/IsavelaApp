import {
	StyleSheet,
	Dimensions,
	Text,
	Animated,
	TouchableOpacity,
	View,
	ImageBackground,
} from "react-native";
import React from "react";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const Start = ({ onPress, animatedValue, startButtonText }) => {
	return (
		<View
			style={{
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Animated.View
				style={[
					styles.startBTN,
					{
						transform: [
							{
								perspective: 400,
							},
							{
								rotateY: animatedValue.interpolate({
									inputRange: [0, 2],
									outputRange: ["0deg", "180deg"],
								}),
							},
							{
								scale: animatedValue.interpolate({
									inputRange: [0, 1, 1.5, 1.8, 2],
									outputRange: [1, 3, 10, 15, 18],
								}),
							},
						],
					},
				]}
			>
				<TouchableOpacity onPress={onPress}>
					<View>
						<Text style={{ fontWeight: "bold", fontSize: 16, color: "gold" }}>
							{startButtonText}
						</Text>
					</View>
				</TouchableOpacity>
			</Animated.View>
		</View>
	);
};

//////////////////////////////////

const ButtonAnimatedTop = ({ onPress, animatedValue, startButtonText }) => {
	const opacityBackground = animatedValue.interpolate({
		inputRange: [0, 1, 2],
		outputRange: [1, 0.5, 0],
	});
	return (
		<>
			<Animated.View
				style={{
					width,
					backgroundColor: "black",
					height: 100,
					top: 60,
					opacity: opacityBackground,
					borderRadius: 5,
				}}
			></Animated.View>
			<Animated.View
				style={[
					styles.startBTN,

					{
						transform: [
							{
								perspective: 400,
							},
							{
								translateY: animatedValue.interpolate({
									inputRange: [0, 1, 2],
									outputRange: [0, -150, -Dimensions.get("screen").height + 75],
								}),
							},
							{
								translateX: animatedValue.interpolate({
									inputRange: [0, 1, 2],
									outputRange: [0, -100, 150],
								}),
							},
							{
								scale: animatedValue.interpolate({
									inputRange: [0, 1, 2],
									outputRange: [1, 1.25, 0.65],
								}),
							},
						],
					},
				]}
			>
				<TouchableOpacity onPress={onPress}>
					<Text
						style={{
							fontWeight: "bold",
							fontSize: 44,
							color: "white",
						}}
					>
						{startButtonText}
					</Text>
				</TouchableOpacity>
			</Animated.View>
		</>
	);
};

const SplashScreen = ({ navigation }) => {
	const animatedValue = React.useRef(new Animated.Value(0)).current;
	const [startButtonText, setStartButtonText] = React.useState("MEDICARE");
	const onPress = () => {
		Animated.timing(animatedValue, {
			toValue: 2,
			duration: 2 * 1000,

			useNativeDriver: true,
		}).start();

		setStartButtonText("MEDICARE");
		setTimeout(() => {
			//navigation.navigate("HomeScreen", { bulbul: "213" });
			navigation.navigate("MainScreen", {
				bulbul: "213",
			});
		}, 2 * 1000);
	};

	return (
		<View style={{ flex: 1 }}>
			<ImageBackground
				style={styles.image}
				source={require("../IsavelaAssets/Cover3.png")}
			/>
			{/* <Start
				onPress={onPress}
				animatedValue={animatedValue}
				startButtonText={startButtonText}
			/> */}
			<ButtonAnimatedTop
				onPress={onPress}
				animatedValue={animatedValue}
				startButtonText={startButtonText}
			/>
		</View>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({
	image: {
		flex: 3,
		resizeMode: "contain",
		width,
		height,
	},

	startBTN: {
		alignItems: "center",
		justifyContent: "center",
		width,
	},
});
