import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";

const { width, height } = Dimensions.get("window");

const Ticker = ({ product, scrollX }) => {
  const { assets } = product.product;
  const inputRange = [-width, 0, width];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [40, 0, -40],
  });
  //   console.log(assets);

  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {assets.map((item, index) => {
          return (
            <Text key={index} style={styles.tickerText}>
              {item.color}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};

const Item = ({ desc, imgColor, price, index, scrollX }) => {
  const letterAnimation = {
    0: { opacity: 0, translateX: -50 },
    1: { opacity: 1, translateX: desc.length * 2 },
  };
  const descAnimation = {
    0: { opacity: 0, translateX: -50, scale: 10 },
    1: { opacity: 1, translateX: width / 2 - 35, scale: 1 },
  };
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });

  const opacity = scrollX.interpolate({
    inputRange: [(index - 0.3) * width, index * width, (index + 0.3) * width],
    outputRange: [0.2, 1, 0.2],
  });

  return (
    <View key={Math.random() * 1000000} style={styles.itemStyle}>
      <Animated.Image
        source={imgColor}
        style={[
          styles.imageStyle,
          {
            transform: [
              {
                scale,
              },
            ],
          },
        ]}
      />
      <Animated.View style={[styles.textContainer, { opacity }]}>
        <View style={{ flexDirection: "row", overflow: "hidden", height: 50, width }}>
          {desc.split("").map((letter, index) => {
            return (
              <Animatable.Text
                useNativeDriver
                animation={letterAnimation}
                delay={300 + index * 50}
                key={`${letter}-${index}`}
                style={[styles.heading]}
              >
                {letter}
              </Animatable.Text>
            );
          })}
        </View>
        <View style={{ flexDirection: "row", overflow: "hidden", height: 50, width }}>
          {price.split("").map((letter, index) => {
            return (
              <Animatable.Text
                useNativeDriver
                animation={descAnimation}
                delay={600 + index * 50}
                key={`${letter}-${index}`}
                style={[styles.heading2]}
              >
                {letter}
              </Animatable.Text>
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
};

const ShowProductScreen = ({ route }) => {
  const { product } = route.params;
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden />
      <Animated.FlatList
        keyExtractor={(item, index) => {
          `${item} - ${Math.random() * 100}`;
        }}
        data={product.assets}
        renderItem={({ item, index }) => {
          return (
            <Item {...item} index={index} scrollX={scrollX} />
            // <View key={index} style={styles.itemStyle}>
            //   <Animated.Image source={item.imgColor} style={[styles.imageStyle]} />
            //   <View style={styles.textContainer}>
            //     <Text style={[styles.heading]}>{item.desc}</Text>
            //     <Text style={[styles.desc]}>{item.price}</Text>
            //   </View>
            // </View>
          );
        }}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: scrollX } },
            },
          ],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
      <Ticker scrollX={scrollX} product={route.params} />
    </View>
  );
};

export default ShowProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemStyle: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: width * 0.75,
    height: width * 0.75,
    resizeMode: "contain",
    flex: 1,
  },
  textContainer: {
    alignItems: "flex-start",
    alignSelf: "flex-end",
    flex: 0.5,
  },
  heading: {
    color: "#444",
    textTransform: "uppercase",
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 5,
    alignSelf: "center",
  },
  heading2: {
    color: "#ccc",
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: 2,
    fontSize: 16,
    top: -20,
    alignSelf: "center",
    textAlign: "left",
  },
  desc: {
    color: "#ccc",
    fontWeight: "600",
    textAlign: "left",
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    marginLeft: 10,
  },
  tickerContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    overflow: "hidden",
    height: 40,
  },
  tickerText: {
    fontSize: 40,
    lineHeight: 40,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
