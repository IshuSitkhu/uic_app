import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { COLORS } from "../../constants/colors";
import API_URL from "../../services/api";
import authStyles from "../../styles/authStyles";

const Register = () => {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

const handleRegister = async () => {
  try {
    setLoading(true);

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        phone_number: mobileNumber,
        email,
        password,
        password_confirmation: confirmPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      Toast.show({
        type: "success",
        text1: "Registration Successful",
        text2: "Your account has been created.",
        position: "top",
      });

      console.log("Registration successful:", data);

      setTimeout(() => {
        router.replace({
          pathname: "/(auth)/verify-otp",
          params: {
            email: email.trim(),
            purpose: "registration",
          },
        });
      }, 1500);

    } else if (response.status === 422) {
      setErrors(data.errors || {});

      if (errors?.name) {
        Toast.show({
          type: "error",
          text1: "Name Error",
          text2: errors.name[0],
          position: "top",
        });

      } else if (errors?.username) {
        Toast.show({
          type: "error",
          text1: "Username Error",
          text2: errors.username[0],
          position: "top",
        });

      } else if (errors?.email) {
        Toast.show({
          type: "error",
          text1: "Email Error",
          text2: errors.email[0],
          position: "top",
        });

      } else if (errors?.phone_number) {
        Toast.show({
          type: "error",
          text1: "Phone Number Error",
          text2: errors.phone_number[0],
          position: "top",
        });

      } else if (errors?.password) {
        Toast.show({
          type: "error",
          text1: "Password Error",
           text2: errors.password.join("\n"),
          position: "top",
        });

      } else if (errors?.password_confirmation) {
        Toast.show({
          type: "error",
          text1: "Password Confirmation",
          text2: errors.password_confirmation[0],
          position: "top",
        });
      }

      console.log("Registration validation errors:", data);

    } else {
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: data.message || "Please check your information.",
        position: "top",
      });

      console.log("Registration failed:", data);
    }

  } catch (error) {
    console.log("Registration error:", error);

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
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F7FB" }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={authStyles.container}
            contentContainerStyle={{
              paddingBottom: insets.bottom,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={authStyles.topSection}>
              <TouchableOpacity
                style={authStyles.backButton}
                onPress={() => router.back()}
              >
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>

              <View style={authStyles.logoCircle}>
                <Image
                  source={require("../../assets/images/uiclogo.png")}
                  style={authStyles.logo}
                />
              </View>
            </View>

            <View style={authStyles.headingSection}>
              <Text style={authStyles.title}>
                Create your <Text style={authStyles.redText}>Account</Text>
              </Text>
              <Text style={authStyles.subtitle}>
                Be the part of something great. Sign up now!
              </Text>
              <View style={authStyles.dividerContainer}>
                <View style={authStyles.line} />

                <Ionicons name="add-outline" size={34} color={COLORS.primary} />

                <View style={authStyles.line} />
              </View>
            </View>

            {/* Form Section */}
            <View style={authStyles.form}>
              <View style={authStyles.inputContainer}>
                <Text style={authStyles.label}>Full Name</Text>
                <View style={authStyles.inputWrapper}>
                  <Ionicons name="person-outline" size={20} color="#999" />
                  <TextInput
                    style={authStyles.input}
                    placeholder="Enter your name"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
                {errors.name && (
                  <Text style={authStyles.errorText}>
                    * {errors.name[0]}
                  </Text>
                )}
              </View>

              <View style={authStyles.inputContainer}>
                <Text style={authStyles.label}>Username</Text>
                <View style={authStyles.inputWrapper}>
                  <Ionicons name="person-outline" size={20} color="#999" />
                  <TextInput
                    style={authStyles.input}
                    placeholder="Enter your username"
                    placeholderTextColor="#999"
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>
                {errors.username && (
                  <Text style={authStyles.errorText}>
                    * {errors.username[0]}
                  </Text>
                )}
              </View>

              <View style={authStyles.inputContainer}>
                <Text style={authStyles.label}>Mobile Number</Text>
                <View style={authStyles.inputWrapper}>
                  <Ionicons
                    name="phone-portrait-outline"
                    size={20}
                    color="#999"
                  />
                  <TextInput
                    style={authStyles.input}
                    placeholder="Enter your number"
                    placeholderTextColor="#999"
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                  />
                </View>
                {errors.phone_number && (
                  <Text style={authStyles.errorText}>
                    * {errors.phone_number[0]}
                  </Text>
                )}
              </View>

              <View style={authStyles.inputContainer}>
                <Text style={authStyles.label}>Email</Text>
                <View style={authStyles.inputWrapper}>
                  <Ionicons name="mail-outline" size={20} color="#999" />
                  <TextInput
                    style={authStyles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
                {errors.email && (
                  <Text style={authStyles.errorText}>
                    * {errors.email[0]}
                  </Text>
                )}
              </View>

              <View style={authStyles.inputContainer}>
                <Text style={authStyles.label}>Password</Text>
                <View style={authStyles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color="#999" />
                  <TextInput
                    style={authStyles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  {/* Show/Hide password icon */}
                  <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color="#999"
                    />
                  </Pressable>
                </View>
                {errors.password && (
                  <Text style={authStyles.errorText}>
                    * {errors.password
                      .filter((error) => !error.includes("confirmation"))
                      .map((error) => `* ${error}`)
                      .join("\n")}
                  </Text>
                )}
              </View>

              <View style={authStyles.inputContainer}>
                <Text style={authStyles.label}>Confirm Password</Text>
                <View style={authStyles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color="#999" />
                  <TextInput
                    style={authStyles.input}
                    placeholder="Confirm your password"
                    placeholderTextColor="#999"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <Pressable
                    onPress={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    <Ionicons
                      name={
                        showConfirmPassword ? "eye-outline" : "eye-off-outline"
                      }
                      size={20}
                      color="#999"
                    />
                  </Pressable>
                </View>
                {errors.password && errors.password.some((error) =>
                  error.includes("confirmation")
                ) && (
                  <Text style={authStyles.errorText}>
                    * {errors.password.find((error) =>
                      error.includes("confirmation")
                    )}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                style={authStyles.button}
                onPress={handleRegister}
              >
                <Text style={authStyles.buttonText}>
                  {loading ? "Creating Account..." : "Create Account"}
                </Text>
              </TouchableOpacity>

              <Text style={authStyles.text}>
                Already have an account?
                <Text
                  style={authStyles.redText}
                  onPress={() => router.push("/(auth)/login")}
                >
                  Sign in here
                </Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Register;
