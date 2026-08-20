import { Ionicons } from "@expo/vector-icons";
import { Animated } from "react-native";
import { useEffect, useRef } from "react";

export default function AnimatedTabIcon({
    name,
    color,
    size,
    focused,
}) {
    const scale = useRef(
        new Animated.Value(focused ? 1.1 : 1)
    ).current;

    //moves slightly upward
    const translateY = useRef(
        new Animated.Value(focused ? -2 : 0)
    ).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scale, {
                toValue: focused ? 1.1 : 1,
                useNativeDriver: true,
                friction: 6,
            }),

            Animated.spring(translateY, {
                toValue: focused ? -2 : 0,
                useNativeDriver: true,
                friction: 6,
            }),
        ]).start();
    }, [focused]);

    return (
        <Animated.View
            style={{
                transform: [
                    { scale },
                    { translateY },
                ],
            }}
        >
            <Ionicons
                name={name}
                size={size}
                color={color}
            />
        </Animated.View>
    );
}