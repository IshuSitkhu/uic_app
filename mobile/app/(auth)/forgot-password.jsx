import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import API_URL from "../../services/api";
import { COLORS } from "../../constants/colors";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {
        if (loading) return;

        if (!email.trim()) {
            Toast.show({
                type: "error",
                text1: "Email Required",
                text2: "Please enter your email address.",
                position: "top",
            });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    email: email.trim(),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Toast.show({
                    type: "success",
                    text1: "OTP Sent",
                    text2: "Check your email for the verification code.",
                    position: "top",
                });

                console.log("Forgot password:", data);

                setTimeout(() => {
                    router.push({
                        pathname: "/(auth)/verify-otp",
                        params: {
                            email: email.trim(),
                            purpose: "forgot-password",
                        },
                    });
                }, 1500);
            } else {
                Toast.show({
                    type: "error",
                    text1: "Request Failed",
                    text2: data.message || "Unable to send OTP.",
                    position: "top",
                });

                console.log("Forgot password failed:", data);
            }
        } catch (error) {
            console.log("Forgot password error:", error);

            Toast.show({
                type: "error",
                text1: "Something went wrong",
                text2: "Unable to connect to the server.",
                position: "top",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            <View style={styles.iconCircle}>
                <Ionicons
                    name="lock-closed-outline"
                    size={40}
                    color="#fff"
                />
            </View>

            <Text style={styles.title}>
                Forgot <Text style={styles.redText}>Password?</Text>
            </Text>

            <Text style={styles.subtitle}>
                Enter your email address and we will send you a verification
                code to reset your password.
            </Text>

            <View style={styles.form}>
                <Text style={styles.label}>Email</Text>

                <View style={styles.inputWrapper}>
                    <Ionicons
                        name="mail-outline"
                        size={20}
                        color="#999"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleForgotPassword}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? "Sending..." : "Send Code"}
                    </Text>
                </TouchableOpacity>
{/* 
                <TouchableOpacity
                    style={styles.loginLink}
                    onPress={() => router.replace("/(auth)/login")}
                >
                    <Ionicons
                        name="arrow-back-outline"
                        size={18}
                        color=COLORS.primary
                    />

                    <Text style={styles.loginText}>
                        Back to Login
                    </Text>
                </TouchableOpacity> */}
            </View>
        </ScrollView>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    content: {
        flexGrow: 1,
        padding: 25,
        justifyContent: "center",
    },

    // backButton: {
    //     position: "absolute",
    //     top: 50,
    //     left: 25,
    //     padding: 5,
    // },

    backButton: {
        position: "absolute",
        top:70,
        left:25,
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",

        // iOS shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.06,
        shadowRadius: 5,

        // Android shadow
        elevation: 2,
    },

    iconCircle: {
        width: 85,
        height: 85,
        borderRadius: 50,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 25,
    },

    title: {
        fontSize: 30,
        fontWeight: "700",
        textAlign: "center",
        color: "#222",
        marginBottom: 12,
    },

    redText: {
        color: COLORS.primary,
    },

    subtitle: {
        fontSize: 15,
        color: "#777",
        textAlign: "center",
        lineHeight: 23,
        marginBottom: 35,
    },

    form: {
        width: "100%",
    },

    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#444",
        marginBottom: 8,
    },

    inputWrapper: {
        height: 52,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        marginBottom: 25,
    },

    input: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
        color: "#333",
    },

    button: {
        height: 52,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "600",
    },

    loginLink: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
    },

    loginText: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 6,
    },
});