import React, { ReactNode, useEffect, useRef } from "react";
import { Animated } from "react-native";
import { View, ViewProps } from "tamagui";

type SkeletonProps = {
  width?: number;
  height?: number;
} & ViewProps;

export const Skeleton = ({
  width = 100,
  height = 20,
  ...props
}: SkeletonProps): ReactNode => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View w={width} h={height} overflow="hidden" position="relative" {...props}>
      <Animated.View
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          transform: [{ translateX }],
        }}
      >
        <View w={"100%"} h={"100%"} bg={"$gray8"} opacity={0.3} />
      </Animated.View>
    </View>
  );
};
