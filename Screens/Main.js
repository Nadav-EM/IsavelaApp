import React from "react";
import {
	findNodeHandle,
	StyleSheet,
	StatusBar,
	Text,
	View,
	Dimensions,
	FlatList,
	Image,
	Animated,
	TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("screen");

const manImage = require("../IsavelaAssets/Cover4.jpg");
const WomanImage = require("../IsavelaAssets/Cover3.png");
const unisexImage = require("../IsavelaAssets/Cover5.png");
const facialImage = require("../IsavelaAssets/Cover8.png");
const contactImage = require("../IsavelaAssets/Cover1.png");

const images = {
	man: manImage,
	woman: WomanImage,
	unisex: unisexImage,
	facial: facialImage,
	contact: contactImage,
};

const data = Object.keys(images).map(i => ({
	key: i,
	title: i,
	image: images[i],
	ref: React.createRef(),
}));

console.log(data);

const Tab = React.forwardRef(({ item, onItemPress }, ref) => {
	return (
		<TouchableOpacity onPress={onItemPress}>
			<View ref={ref}>
				<Text
					style={{
						color: "white",
						fontSize: 84 / data.length,
						fontWeight: "bold",
						textTransform: "uppercase",
					}}
				>
					{item.title}
				</Text>
			</View>
		</TouchableOpacity>
	);
});

const Indicator = ({ measures, scrollX }) => {
	const inputRange = data.map((_, index) => index * width);
	const indicatorWidth = scrollX.interpolate({
		inputRange,
		outputRange: measures.map(measure => measure.width),
	});
	const translateX = scrollX.interpolate({
		inputRange,
		outputRange: measures.map(measure => measure.x),
	});
	return (
		<Animated.View
			style={{
				position: "absolute",
				height: 4,
				width: indicatorWidth,
				right: 0,
				backgroundColor: "white",
				bottom: -10,
				transform: [
					{
						translateX,
					},
				],
			}}
		/>
	);
};
const Tabs = ({ scrollX, data, onItemPress }) => {
	const [measures, setMeasures] = React.useState([]);
	const containerRef = React.useRef();

	React.useEffect(() => {
		const m = [];
		data.forEach(item => {
			item.ref.current.measureLayout(
				containerRef.current,
				(x, y, width, height) => {
					m.push({
						x,
						y,
						width,
						height,
					});
					if (m.length === data.length) {
						setMeasures(m);
					}
				}
			);
		});
	}, []);

	return (
		<View style={{ position: "absolute", top: 100, width }}>
			<View
				ref={containerRef}
				style={{
					justifyContent: "space-evenly",
					flex: 1,
					flexDirection: "row",
				}}
			>
				{data.map((item, index) => {
					return (
						<Tab
							key={item.key}
							item={item}
							ref={item.ref}
							onItemPress={() => onItemPress(index)}
						/>
					);
				})}
			</View>
			{measures.length > 0 && (
				<Indicator measures={measures} scrollX={scrollX} />
			)}
		</View>
	);
};

const Main = () => {
	const scrollX = React.useRef(new Animated.Value(0)).current;
	const ref = React.useRef();
	const onItemPress = React.useCallback(itemIndex => {
		ref?.current?.scrollToOffset({
			offset: itemIndex * width,
		});
	});
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Animated.FlatList
				ref={ref}
				data={data}
				keyExtractor={item => item.key}
				horizontal
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false }
				)}
				bounces={false}
				renderItem={({ item }) => {
					return (
						<View style={{ width, height }}>
							<Image
								source={item.image}
								style={{ flex: 1, resizeMode: "cover", width, height }}
							/>
							<View
								style={[
									StyleSheet.absoluteFillObject,
									{ backgroundColor: "rgba(0,0,0,0.4)" },
								]}
							/>
						</View>
					);
				}}
			/>
			<Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
		</View>
	);
};

export default Main;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
