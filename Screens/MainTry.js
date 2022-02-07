import React from "react";
import {
	ImageBackground,
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

const images = {
	man: {
		img: require("../IsavelaAssets/Cover4.jpg"),
		prods: [
			require("../IsavelaAssets/Breast1B.png"),
			require("../IsavelaAssets/Breast1W.png"),
			require("../IsavelaAssets/Breast1B.png"),
			require("../IsavelaAssets/Breast1B.png"),
			require("../IsavelaAssets/Breast1W.png"),
			require("../IsavelaAssets/Breast1B.png"),
		],
	},
	woman: { img: require("../IsavelaAssets/Cover3.png") },
	unisex: { img: require("../IsavelaAssets/Cover5.png") },
	facial: {
		img: require("../IsavelaAssets/Cover8.png"),
		prods: [
			require("../IsavelaAssets/Breast1B.png"),
			require("../IsavelaAssets/Breast1W.png"),
			require("../IsavelaAssets/Breast1B.png"),
		],
	},
	contact: { img: require("../IsavelaAssets/Cover1.png") },
};

const data = Object.keys(images).map(i => ({
	key: i,
	title: i,
	image: images[i].img,
	prods: images[i].prods,
	ref: React.createRef(),
}));

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

const MainTry = () => {
	const scrollX = React.useRef(new Animated.Value(0)).current;
	const animatedValue = React.useRef(new Animated.Value(0)).current;
	const [isShowProducts, setIsShowProducts] = React.useState(true);

	const ref = React.useRef();
	const onItemPress = React.useCallback(itemIndex => {
		ref?.current?.scrollToOffset({
			offset: itemIndex * width,
		});
	});

	const ShowDetails = () => {
		Animated.timing(animatedValue, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: false,
		}).start();
	};

	const Slider = () => {
		console.log("ok");
	};

	const OpenDoor = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 509],
	});

	const CloseDoor = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [509, 0],
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
							<ImageBackground
								source={item.image}
								style={{ flex: 1, resizeMode: "cover", width, height }}
							/>
							<View
								style={[
									StyleSheet.absoluteFillObject,
									{ backgroundColor: "rgba(0,0,0,0.4)" },
								]}
							/>

							<TouchableOpacity
								onPress={ShowDetails}
								style={{
									width: 100,
									height: 50,
									backgroundColor: "white",
									position: "absolute",
									justifyContent: "center",
									alignItems: "center",
									borderRadius: 10,
									top: 200,
									right: 20,
									opacity: 0.7,
								}}
							>
								<Text style={{ fontWeight: "bold" }}>SHOW</Text>
							</TouchableOpacity>

							<Animated.View
								onLayout={event => {
									const { x, y, width, height } = event.nativeEvent.layout;
									console.log(height);
								}}
								style={{
									justifyContent: "space-around",
									alignItems: "center",
									borderRadius: 10,
									height: OpenDoor,
									backgroundColor: "rgba(255,255,255,0.2.5)",
								}}
							>
								{item.prods && (
									<FlatList
										keyExtractor={item => item + Math.random() * 100}
										data={item.prods}
										numColumns={2}
										renderItem={({ item }) => (
											<TouchableOpacity>
												<Image
													style={{
														height: 150,
														width: 150,
														borderRadius: 15,
														margin: 10,
													}}
													source={item}
												/>
											</TouchableOpacity>
										)}
									/>
								)}
							</Animated.View>
						</View>
					);
				}}
			/>
			{/* <View style={{ position: "absolute", top: 200, width }}>
				{data.map(
					i =>
						i.prods &&
						i.prods.map(prod => (
							<Image style={{ height: 100, width: 100 }} source={prod} />
						))
				)}
			</View> */}
			<Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
		</View>
	);
};

export default MainTry;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
