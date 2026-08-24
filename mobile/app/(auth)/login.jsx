import { Image, StyleSheet, Text, View , TextInput, TouchableOpacity, ScrollView, Pressable, KeyboardAvoidingView, Platform} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from "expo-router";
import authStyles from '../../styles/authStyles';
import API_URL from '../../services/api';
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
    // const insets = useSafeAreaInsets();
    const [email, setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () =>{
        if (loading) return;

        setLoading(true);
        try{
            const response = await fetch(`${API_URL}/auth/login`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({

                    email,
                    password,

                }),
            });

            const data = await response.json();
                if (response.ok) {
                await AsyncStorage.setItem("token", data.token);
                await AsyncStorage.setItem("user", JSON.stringify(data.user));
                    Toast.show({
                        type: 'success',
                        text1: 'Login Successful',
                        
                        position: 'top',
                    });
    
                    console.log("Login successful:", data);
    
                    setTimeout(() => {
                        router.replace("/home");
                    }, 1500);
    
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Login Failed',
                        
                        position: 'top',
                    });
    
                    console.log("Login failed:", data);
            }
        } catch(error){
            Toast.show({
                type: 'error',
                text1: 'Something went wrong',
                text2: 'Unable to connect to the server.',
                position: 'top',
            });
            console.log(error);
        }finally {
        setLoading(false);
    }
    };
    
  return (
    <>
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1}}>
            <ScrollView
                style={authStyles.container}
                // contentContainerStyle={{
                //     paddingBottom: insets.bottom,
                // }}
                showsVerticalScrollIndicator={false}
            >
                <View style={authStyles.topSection}>
                {/* Logo */}
                <View style={authStyles.logoCircle}>
                <Image
                    source={require("../../assets/images/icon.png")}
                    style={authStyles.logo}
                />
                </View>
                </View>

                {/* Heading section */}
                <View style={authStyles.headingSection}>
                    <Text style={authStyles.title}>Welcome <Text style={authStyles.redText}>Back !</Text></Text>
                    <Text style={authStyles.subtitle}>
                        Please Login to Continue Your Journey.
                    </Text>
                    <View style={authStyles.dividerContainer}>
                        <View style={authStyles.line} />

                        <Ionicons name="add-outline" size={34} color="#ac0a0aa8" />

                        <View style={authStyles.line} />
                    </View>

                </View>

                {/* Form Section */}
                <View style={authStyles.form}>
                    <View style={authStyles.inputContainer}>
                        <Text style={authStyles.label}>Email</Text>
                        <View style={authStyles.inputWrapper}>
                            <Ionicons  name="mail-outline" size={20} color="#999" />
                            <TextInput style={authStyles.input} placeholder="Enter your email" placeholderTextColor="#999" value={email} onChangeText={setEmail}/>
                        </View>
                    </View>

                    <View style={authStyles.inputContainer}>
                        <Text style={authStyles.label}>Password</Text>
                        <View style={authStyles.inputWrapper}>
                            <Ionicons  name="lock-closed-outline" size={20} color="#999" />
                            <TextInput style={authStyles.input} placeholder="Enter your password" placeholderTextColor="#999" value={password} onChangeText={setPassword}
                            secureTextEntry={!showPassword} />
                            {/* Show/Hide password icon */}
                            <Pressable onPress={() => setShowPassword(prev => !prev)}>
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color="#999"
                                />
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.optionsRow}>
                        <View style={styles.rememberContainer}>
                            <TouchableOpacity style={styles.checkbox} onPress={() => setRememberMe(prev => !prev)}>
                                {rememberMe && <Ionicons name="checkmark" size={16} />}
                            </TouchableOpacity>

                            <Text style={styles.rememberText}>Remember Me</Text>
                        </View>

                        <TouchableOpacity onPress={() => router.push("/forgot-password")}>
                            <Text style={styles.forgotText}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Create Account Button */}
                    <TouchableOpacity style={authStyles.button} onPress={handleLogin} disabled={loading}>
                        <Text style={authStyles.buttonText}>
                            {loading ? "Logging in..." : "Login"}
                        </Text>
                    </TouchableOpacity>

                    <Text style={authStyles.text}>
                        Don't have an account?  
                        <Text style={authStyles.redText} onPress={() => router.push("/(auth)/register")}>
                            Sign Up here
                        </Text>
                    </Text>


                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
    </>
  )
}

export default Login

const styles = StyleSheet.create({
    //remember
    optionsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },

    rememberContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: "#ac0a0aa8",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },

    rememberText: {
        fontSize: 16,
        color: "#555",
    },

    forgotText: {
        fontSize: 16,
        color: "#ac0a0aa8",
        fontWeight: "600",
    },
})