import { View, StyleSheet, Platform, Button } from "react-native";
import React, { useEffect, useState } from "react";
import BottomSubView from "./BottomSubView";
import TopSubView from "./TopSubView";
import BounceButton from "./BounceButton";
import Spinner from "./Spinner";
import FadeBox from "./FadeBox";
import MovableBox from "./MovableBox";
import MarioJump from "./MarioJump";

const isNative =
  Platform.OS === "android" || Platform.OS === "ios" ? true : false;

export default function App() {
  const [showChain, setShowChain] = useState(null);

  !isNative &&
    useEffect(() => {
      // left: 37, up: 38, right: 39, down: 40,
      // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
      var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

      function preventDefault(e) {
        e.preventDefault();
      }

      function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
          preventDefault(e);
          return false;
        }
      }

      // modern Chrome requires { passive: false } when adding event
      var supportsPassive = false;
      try {
        window.addEventListener(
          "test",
          null,
          Object.defineProperty({}, "passive", {
            get: function () {
              supportsPassive = true;
            },
          })
        );
      } catch (e) {}

      var wheelOpt = supportsPassive ? { passive: false } : false;
      var wheelEvent =
        "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

      // call this to Disable
      function disableScroll() {
        window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
        window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
        window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
        window.addEventListener("keydown", preventDefaultForScrollKeys, false);
      }

      disableScroll();

      return () => {
        // call this to Enable
        function enableScroll() {
          window.removeEventListener("DOMMouseScroll", preventDefault, false);
          window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
          window.removeEventListener("touchmove", preventDefault, wheelOpt);
          window.removeEventListener(
            "keydown",
            preventDefaultForScrollKeys,
            false
          );
        }

        enableScroll();
      };
    }, []);

  return (
    <View style={styles.container}>
      {showChain === null && (
        <>
          <Button
            title="Show Chain Animation"
            onPress={() => setShowChain(true)}
          />
          <Button
            title="Show One-Off Animations"
            onPress={() => setShowChain(false)}
          />
        </>
      )}
      {showChain !== null && showChain && (
        <>
          <MarioJump />
        </>
      )}
      {showChain !== null && !showChain && (
        <>
          <FadeBox />
          <Spinner />
          <TopSubView />
          <BottomSubView />
          <BounceButton />
          <MovableBox />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
