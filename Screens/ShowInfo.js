import { StyleSheet, Dimensions, Text, View, Image, SafeAreaView } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";

const letterAnimation = {
  0: { opacity: 0, translateY: -42 },
  1: { opacity: 1, translateY: 0 },
};


const ShowInfo = ({ route }) => {
  const { product } = route.params;
  console.log(product);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: 200,
          opacity: 0.2,
          backgroundColor: "blue",
        }}
      ></View>
      <Image source={product.assets[0].black} style={styles.image} />
      <View style={{ position: "absolute", top: 5, left: 5 }}>
        <View style={{ flexDirection: "row", overflow: "hidden", height: 50 }}>
          {product.desc.split("").map((letter, index) => {
            return (
              <Animatable.Text
                useNativeDriver
                animation={letterAnimation}
                delay={300 + index * 50}
                key={`${letter}-${index}`}
                style={styles.heading}
              >
                {letter}
              </Animatable.Text>
            );
          })}
        </View>
        <View style={{ overflow: "hidden" }}>
          <Animatable.Text
            useNativeDriver
            animation={letterAnimation}
            delay={300 + product.desc.split("").length * 50 + 50}
            style={{ fontSize: 20, fontWeight: "800", textTransform: "uppercase" }}
          >
            {product.price}
          </Animatable.Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ShowInfo;

const styles = StyleSheet.create({
  heading: {
    color: "#333",
    fontSize: 42,
    height: 50,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 10,
  },
  image: {
    width: Dimensions.get("screen").width * 0.9,
    height: Dimensions.get("screen").width * 0.9,
    alignSelf: "center",
    resizeMode: "contain",
    marginTop: 90,
  },
});
