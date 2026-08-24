import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL from "../../services/api";
import { Image } from "react-native";
import {COLORS} from '../../constants/colors';

const You = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const token = await AsyncStorage.getItem("token");

            // No token = user is logged out
            if (!token) {
                setUser(null);
                return;
            }

            const response = await fetch(`${API_URL}/auth/me`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
            } else {
                console.log("Failed to fetch user:", data);

                if (response.status === 401) {
                    await AsyncStorage.removeItem("token");
                    setUser(null);
                }
            }
        } catch (error) {
            console.log("Fetch user error:", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            fetchUser();
        }, [])
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // LOGGED OUT
    if (!user) {
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.title}>My Profile</Text>
                </View>

                <View style={styles.loggedOutContainer}>

                    {/* <Image
                        source={require("../../assets/images/icon.png")}
                        style={styles.loginImage}
                    /> */}
                    <View style={styles.loginIcon}>
                        <Ionicons
                            name="person-outline"
                            size={45}
                            color={COLORS.primary}
                        />
                    </View>

                    <Text style={styles.loginTitle}>
                        Sign in to your account
                    </Text>

                    <Text style={styles.loginSubtitle}>
                        Log in to access your profile and connect with others.
                    </Text>

                    <Pressable
                        style={styles.loginButton}
                        onPress={() => router.push("/(auth)/login")}
                    >
                        <Text style={styles.loginButtonText}>
                            Log In
                        </Text>
                    </Pressable>

                    <View style={styles.registerRow}>
                        <Text style={styles.registerText}>
                            Don't have an account?
                        </Text>

                        <Pressable
                            onPress={() => router.push("/(auth)/register")}
                        >
                            <Text style={styles.registerLink}>
                                Register
                            </Text>
                        </Pressable>
                    </View>

                </View>

            </View>
        );
    }

    // LOGGED IN
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Profile</Text>

                <Pressable style={styles.settingsButton} onPress={() => router.push("/settings")}>
                    <Ionicons name="settings-outline" size={26} color="#333"/>
                </Pressable>
            </View>

            <View style={styles.profileSection}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {user.name?.charAt(0).toUpperCase()}
                    </Text>
                </View>
                <View>
                    <Text style={styles.name}>
                        {user.name}
                    </Text>

                    <Text style={styles.username}>
                        @{user.username}
                    </Text>
                </View>
            </View>

            <View style={styles.statsContainer}>
                <Pressable style={styles.statButton}>
                    <Text style={styles.statButtonText}>
                        Add Friends
                    </Text>
                </Pressable>

                <View style={styles.statButton}>
                    <Text style={styles.statButtonText}>
                        Following 0
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default You;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 25,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 60,
        paddingBottom: 28,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1D1D1F",
        letterSpacing: -0.5,
    },

    settingsButton: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: "#FFFFFF",

        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 6,

        elevation: 2,
    },

    loggedOutContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        // marginTop: 10,
    },

    loginIcon: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#f8eeee",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },

    loginTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#222",
        textAlign: "center",
    },

    loginSubtitle: {
        fontSize: 15,
        color: "#777",
        textAlign: "center",
        marginTop: 10,
        lineHeight: 22,
    },

    loginButton: {
        width: "100%",
        backgroundColor:  COLORS.primary,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 25,
    },

    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },

    registerRow: {
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
    },

    registerText: {
        color: "#777",
        fontSize: 14,
    },

    registerLink: {
        color:  COLORS.primary,
        fontSize: 14,
        fontWeight: "700",
        marginLeft: 5,
    },

    profileSection: {
        backgroundColor: "#FFFFFF",
        borderRadius: 26,
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 12,

        elevation: 3,
        flexDirection: "row",
        gap: 20,
    },

    avatar: {
        width: 105,
        height: 105,
        borderRadius: 52.5,

        backgroundColor:COLORS.primary,

        justifyContent: "center",
        alignItems: "center",

        borderWidth: 4,
        borderColor: "#F8E9E9",
    },

    avatarText: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "700",
    },

    name: {
        marginTop: 15,
        fontSize: 22,
        fontWeight: "700",
        color: "#222",
    },

    username: {
        marginTop: 5,
        fontSize: 16,
        color: "#777",
    },

    email: {
        marginTop: 5,
        fontSize: 14,
        color: "#999",
    },

    accountInfo: {
        flexDirection: "row",
        gap: 15,
        marginTop: 15,
    },

    infoText: {
        fontSize: 14,
        color: "#555",
    },

    statsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        marginTop: 30,
    },

    statButton: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 25,
    },

    statButtonText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
    },

    loginImage: {
        width: 180,
        height: 140,
        resizeMode: "contain",
        marginBottom: 15,
    },
});