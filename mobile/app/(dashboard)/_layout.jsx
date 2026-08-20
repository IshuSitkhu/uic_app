import { Tabs } from "expo-router";
import { Platform, StyleSheet } from "react-native";
import AnimatedTabIcon from "../../components/AnimatedTabIcon";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DashboardLayout() {
    const isIOS = Platform.OS === "ios";
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            initialRouteName="home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: isIOS ? styles.iosTabBar : {  ...styles.androidTabBar,  marginBottom: insets.bottom,  },

                tabBarLabelStyle: styles.tabBarLabel,

                tabBarActiveTintColor: "#ac0a0a",
                tabBarInactiveTintColor: "#3b3a3a",

                //Hide tab bar when keyboard opens
                tabBarHideOnKeyboard: true,

                tabBarIcon: ({ color, size, focused }) => {
                    let iconName;

                    switch (route.name) {
                        case "home":
                            iconName = focused
                                ? "home"
                                : "home-outline";
                            break;

                        case "bible":
                            iconName = focused
                                ? "book"
                                : "book-outline";
                            break;

                        case "explore":
                            iconName = focused
                                ? "compass"
                                : "compass-outline";
                            break;

                        case "search":
                            iconName = focused
                                ? "search"
                                : "search-outline";
                            break;

                        case "you":
                            iconName = focused
                                ? "person"
                                : "person-outline";
                            break;

                        default:
                            iconName = "ellipse-outline";
                    }

                    return (
                        <AnimatedTabIcon name={iconName} color={color} size={size} focused={focused}  />
                    );
                },
            })}
        >
            <Tabs.Screen name="home" options={{ title: "Home", }} />

            <Tabs.Screen name="bible" options={{ title: "Bible", }}/>

            <Tabs.Screen name="explore" options={{ title: "Explore", }} />

            <Tabs.Screen name="search" options={{ title: "Search", }} />

            <Tabs.Screen name="you" options={{ title: "You",}}/>

            {/* Hidden from bottom navigation */}
            <Tabs.Screen name="settings" options={{ href: null, }} />

            <Tabs.Screen name="edit-profile" options={{ href: null, }}  />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    iosTabBar: {
        position: "absolute",

        left: 15,
        right: 15,
        bottom: 15,

        height: 65,

        borderRadius: 35,

        backgroundColor: "#fff",

        borderTopWidth: 0,

        elevation: 5,

        shadowOffset: {
            width: 0,
            height: 5,
        },

        shadowOpacity: 0.15,
        shadowRadius: 8,

        marginHorizontal: 10,

        paddingTop: 5,
    },

    androidTabBar: {
        height: 60,

        backgroundColor: "#fff",

        borderTopWidth: 1,
        borderTopColor: "#eee",

        elevation: 5,

        paddingTop: 0,
        paddingBottom: 0,
    },
    
    tabBarLabel: {
        fontSize: 11,
        fontWeight: "600",
    },
});