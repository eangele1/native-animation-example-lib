import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet, Easing, Image } from "react-native";

const MarioJump = () => {
  const xAxis = useRef(new Animated.Value(0)).current;
  const yRotation = useRef(new Animated.Value(0)).current;
  const yAxis = useRef(new Animated.Value(0)).current;
  const imgOpacity = useRef(new Animated.Value(0)).current;
  const coinOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        //gets sprite to the peak
        Animated.parallel([
          Animated.timing(xAxis, {
            toValue: 200,
            delay: 1000,
            duration: 750,
            easing: Easing.out(Easing.exp),
          }),
          Animated.timing(yAxis, {
            toValue: 1,
            delay: 1000,
            duration: 750,
            easing: Easing.out(Easing.exp),
          }),
          Animated.timing(imgOpacity, {
            toValue: 1,
            delay: 1250,
            duration: 1,
          }),
          Animated.timing(coinOpacity, {
            toValue: 0,
            delay: 1250,
            duration: 0,
          }),
        ]),

        //gets sprite to the bottom
        Animated.parallel([
          Animated.timing(xAxis, {
            toValue: 400,
            duration: 500,
            easing: Easing.in(Easing.exp),
          }),
          Animated.timing(yAxis, {
            toValue: 0,
            duration: 500,
            easing: Easing.in(Easing.exp),
          }),
          Animated.timing(imgOpacity, {
            toValue: 0,
            delay: 250,
            duration: 1,
          }),
        ]),

        //turns sprite around
        Animated.timing(yRotation, {
          toValue: 1,
          duration: 1,
        }),
        Animated.timing(coinOpacity, {
          toValue: 1,
          duration: 1,
        }),

        //gets sprite to the peak in reverse
        Animated.parallel([
          Animated.timing(xAxis, {
            toValue: 200,
            delay: 1000,
            duration: 750,
            easing: Easing.out(Easing.exp),
          }),
          Animated.timing(yAxis, {
            toValue: 1,
            delay: 1000,
            duration: 750,
            easing: Easing.out(Easing.exp),
          }),
          Animated.timing(imgOpacity, {
            toValue: 1,
            delay: 1250,
            duration: 1,
          }),
          Animated.timing(coinOpacity, {
            toValue: 0,
            delay: 1250,
            duration: 1,
          }),
        ]),

        //gets sprite to the bottom in reverse
        Animated.parallel([
          Animated.timing(xAxis, {
            toValue: 0,
            duration: 500,
            easing: Easing.in(Easing.exp),
          }),
          Animated.timing(yAxis, {
            toValue: 0,
            duration: 500,
            easing: Easing.in(Easing.exp),
          }),
          Animated.timing(imgOpacity, {
            toValue: 0,
            delay: 250,
            duration: 1,
          }),
        ]),

        //turns sprite around again
        Animated.timing(yRotation, {
          toValue: 0,
          duration: 1,
        }),
        Animated.timing(coinOpacity, {
          toValue: 1,
          duration: 1,
        }),
      ])
    ).start();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Animated.Image
          resizeMode="contain"
          style={{
            width: 150,
            height: 150,
            opacity: imgOpacity,
            transform: [{ translateX: 180 }, { translateY: -110 }],
          }}
          source={require("./wahoo.png")}
        />
        <Animated.Image
          resizeMode="contain"
          style={{
            width: 75,
            height: 75,
            opacity: coinOpacity,
            transform: [{ translateX: 220 }, { translateY: -100 }],
          }}
          source={require("./coin.png")}
        />
        <Animated.Image
          style={{
            width: 100,
            height: 100,
            zIndex: 10,
            transform: [
              { translateX: xAxis },
              {
                rotateY: yRotation.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "-90deg", "-180deg"],
                }),
              },
              {
                translateY: yAxis.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -200],
                }),
              },
            ],
          }}
          source={require("./mario.png")}
        />
        <Image
          resizeMode="contain"
          style={{
            width: 100,
            height: 100,
            position: "absolute",
            left: 200,
            bottom: 0,
          }}
          source={require("./spikes.png")}
        />
      </View>
      <View style={styles.container2}></View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 500,
    height: 500,
    justifyContent: "flex-end",
    backgroundColor: "skyblue",
  },
  container2: {
    width: 500,
    height: 100,
    justifyContent: "flex-end",
    backgroundColor: "tan",
    zIndex: 0,
  },
});

export default MarioJump;
