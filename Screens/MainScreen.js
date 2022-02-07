import React from "react";
// import {} from "react-native-gesture-handler";
import {
	ImageBackground,
	ScrollView,
	Button,
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

const ActionSheet = props => {
	const [alignment] = React.useState(new Animated.Value(0));
	const [openDoor, setOpenDoor] = React.useState(true);

	const valueAnimated = React.useRef(new Animated.Value(0)).current;

	const bringUpActionSheet = () => {
		Animated.timing(alignment, {
			toValue: 1,
			duration: 500,
			useNativeDriver: false,
		}).start();

		Animated.timing(valueAnimated, {
			toValue: 1,
			duration: 500,
			useNativeDriver: false,
		}).start();
	};

	const hideAcctionSheet = () => {
		Animated.timing(alignment, {
			toValue: 0,
			duration: 500,
			useNativeDriver: false,
		}).start();
	};

	const actionSheetInterpolate = alignment.interpolate({
		inputRange: [0, 1],
		outputRange: [-height / 2.4 + 50, 0],
	});

	const actionSheetStyle = {
		bottom: actionSheetInterpolate,
	};

	const getstureHandler = e => {
		if (openDoor) bringUpActionSheet();
		else {
			hideAcctionSheet();
		}

		setOpenDoor(prev => !prev);
		//else if (e.nativeEvent.contentOffset.y < 0)
		console.log("ok");
	};

	return (
		<Animated.View style={[styles.actionSheetContainer, actionSheetStyle]}>
			<TouchableOpacity
				onPress={getstureHandler}
				style={styles.grabber}
			></TouchableOpacity>

			<Text>Hello this is action Style</Text>
		</Animated.View>
	);
};

const MainScreen = () => {
	const [alignment] = React.useState(new Animated.Value(0));
	const [openDoor, setOpenDoor] = React.useState(true);
	const valueAnimated = React.useRef(new Animated.Value(0)).current;

	const bringUpActionSheet = () => {
		Animated.timing(alignment, {
			toValue: 1,
			duration: 500,
			useNativeDriver: false,
		}).start();

		Animated.timing(valueAnimated, {
			toValue: 1,
			duration: 500,
			useNativeDriver: false,
		}).start();
	};

	const hideAcctionSheet = () => {
		Animated.timing(alignment, {
			toValue: 0,
			duration: 1500,
			useNativeDriver: false,
		}).start();
	};

	const actionSheetInterpolate = alignment.interpolate({
		inputRange: [0, 1],
		outputRange: [-height + 100, 50],
	});

	const actionSheetStyle = {
		bottom: actionSheetInterpolate,
	};

	const getstureHandler = e => {
		openDoor ? bringUpActionSheet() : hideAcctionSheet();

		setOpenDoor(prev => !prev);

		//console.log("ok");
	};

	//////
	const scrollX = React.useRef(new Animated.Value(0)).current;
	const animatedValue = React.useRef(new Animated.Value(0)).current;

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
							<ImageBackground
								source={item.image}
								style={{ flex: 1, resizeMode: "cover", width, height }}
							/>
							<View
								style={[
									StyleSheet.absoluteFillObject,
									{ backgroundColor: "rgba(0,0,0,0.25)" },
								]}
							/>

							<View
								onLayout={event => {
									const { x, y, width, height } = event.nativeEvent.layout;
									//console.log(height);
								}}
								style={{
									justifyContent: "space-around",
									alignItems: "center",
									borderRadius: 10,
									height: 509,
									backgroundColor: "rgba(255,255,255,0.2.5)",
								}}
							>
								{/* <ActionSheet /> */}
								{item.prods && (
									<>
										<Animated.FlatList
											style={[styles.actionSheetContainer, actionSheetStyle]}
											keyExtractor={item => item + Math.random() * 100}
											data={item.prods}
											numColumns={2}
											alignItems="center"
											justifyContent="center"
											renderItem={({ item }) => (
												<Animated.View>
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
												</Animated.View>
											)}
										/>
										<Animated.View
											style={[
												{
													flex: 1,
													height: 0,
													width: 120,
												},
												// {
												// 	transform: [
												// 		{
												// 			translateY: valueAnimated.interpolate({
												// 				inputRange: [0, 1],
												// 				outputRange: [-520, 0],
												// 			}),
												// 		},
												// 	],
												// },
											]}
										>
											<TouchableOpacity
												onPress={getstureHandler}
												style={styles.grabber}
											/>
										</Animated.View>
									</>
								)}
							</View>
						</View>
					);
				}}
			/>

			<Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
		</View>
	);
};

export default MainScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	actionSheetContainer: {
		backgroundColor: "rgba(255,255,255,0.5)",
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,

		height: 600,
		width: width / 1.05,
		borderRadius: 5,
		marginHorizontal: 10,
	},

	grabber: {
		height: 0,
		top: height / 2 + 25,
		width: 120,
		borderTopWidth: 10,
		borderTopColor: "#fff",
		borderTopRightRadius: 5,
		borderTopLeftRadius: 5,
		bottom: 0,
	},
});