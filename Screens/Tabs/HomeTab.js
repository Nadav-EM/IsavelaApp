import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	Dimensions,
} from "react-native";
import React from "react";

const HomeTab = () => {
	return (
		<View>
			<View
				style={{
					width: Dimensions.get("screen").width,
					height: 100,
					backgroundColor: "gold",
					justifyContent: "center",
					alignItems: "flex-start",
				}}
			>
				<Text
					style={{
						fontWeight: "bold",
						fontSize: 24,
						color: "white",
						left: 10,
						top: 30,
					}}
				>
					MEDICARE
				</Text>
			</View>
		</View>
	);
};

export default HomeTab;

const styles = StyleSheet.create({});
