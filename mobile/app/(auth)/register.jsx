import { Image, StyleSheet, Text, View , TextInput, TouchableOpacity, ScrollView, Pressable, KeyboardAvoidingView, Platform} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from "expo-router";
import authStyles from '../../styles/authStyles';
import API_URL from '../../services/api';
import Toast from 'react-native-toast-message';


const Register = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError]= useState(null)
    const [loading , setLoading] = useState(false);


    const handleRegister = async () => {
        try{
            setLoading(true);
            

            const response = await fetch(`${API_URL}/auth/register`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    name,
                    username,
                    mobile_number: mobileNumber,
                    email,
                    password,
                    password_confirmation: confirmPassword,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'Registration Successful',
                    text2: 'Your account has been created.',
                    position: 'top',
                });

                console.log("Registration successful:", data);

                setTimeout(() => {
                    router.push("/(auth)/login");
                }, 1500);

            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Registration Failed',
                    text2: data.message || 'Please check your information.',
                    position: 'top',
                });

                console.log("Registration failed:", data);
            }
        }catch(error){
            console.log(error);
            
        Toast.show({
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Unable to connect to the server.',
            position: 'top',
        });

        }finally {
            setLoading(false);
        }
    }
  return (
    <>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1}}>
        <ScrollView contentContainerStyle={{ paddingBottom: 5 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>


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
                <Text style={authStyles.title}>Create your <Text style={authStyles.redText}>Account</Text></Text>
                <Text style={authStyles.subtitle}>
                Be the part of something great. Sign up now!
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
                    <Text style={authStyles.label}>Full Name</Text>
                    <View style={authStyles.inputWrapper}>
                        <Ionicons name="person-outline" size={20} color="#999" />
                        <TextInput style={authStyles.input} placeholder="Enter your name" placeholderTextColor="#999" value={name} onChangeText={setName}/>
                    </View>
                </View>

                <View style={authStyles.inputContainer}>
                    <Text style={authStyles.label}>Username</Text>
                    <View style={authStyles.inputWrapper}>
                        <Ionicons name="person-outline" size={20} color="#999" />
                        <TextInput style={authStyles.input} placeholder="Enter your username" placeholderTextColor="#999" value={username} onChangeText={setUsername} />
                    </View>
                </View>

                <View style={authStyles.inputContainer}>
                    <Text style={authStyles.label}>Mobile Number</Text>
                    <View style={authStyles.inputWrapper}>
                        <Ionicons  name="phone-portrait-outline" size={20} color="#999" />
                        <TextInput style={authStyles.input} placeholder="Enter your number" placeholderTextColor="#999" value={mobileNumber} onChangeText={setMobileNumber}/>
                    </View>
                </View>

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
                        <TextInput style={authStyles.input} placeholder="Enter your password" placeholderTextColor="#999" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
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

                <View style={authStyles.inputContainer}>
                    <Text style={authStyles.label}>Confirm Password</Text>
                    <View style={authStyles.inputWrapper}>
                        <Ionicons  name="lock-closed-outline" size={20} color="#999" />
                        <TextInput style={authStyles.input} placeholder="Confirm your password" placeholderTextColor="#999"  value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={!showConfirmPassword} />
                        <Pressable onPress={() => setShowConfirmPassword(prev => !prev)}>
                            <Ionicons
                                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                                size={20}
                                color="#999"
                            />
                        </Pressable>
                    </View>
                </View>

                {/* Create Account Button */}
                <TouchableOpacity style={authStyles.button} onPress={handleRegister}>
                    <Text style={authStyles.buttonText} >
                        Create Account
                    </Text>
                </TouchableOpacity>

                <Text style={authStyles.text}>
                    Already have an account?  
                    <Text style={authStyles.redText} onPress={() => router.push("/(auth)/login")}>
                         Sign in here
                    </Text>
                </Text>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
        
        
    </>
    
  )
}

export default Register

