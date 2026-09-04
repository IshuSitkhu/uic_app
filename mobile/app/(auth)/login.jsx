import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { COLORS } from "../../constants/colors";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../services/api";
import authStyles from "../../styles/authStyles";

const Login = () => {
  const { login } = useAuth();
  // const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
          device_name: "mobile-app",
        }),
      });

      const data = await response.json();

      // LOGIN SUCCESS
      if (response.ok) {
        await login(data.user, data.access_token);

        Toast.show({
          type: "success",
          text1: "Login Successful",
          position: "top",
        });

        console.log("Login successful:", data);
        console.log("ACCESS TOKEN:", data.access_token);

        setTimeout(() => {
          router.replace("/home");
        }, 1500);

        // ACCOUNT WAITING FOR ADMIN APPROVAL
      } else if (
        response.status === 403 &&
        data.message === "Your account is awaiting administrator approval."
      ) {
        Toast.show({
          type: "info",
          text1: "Approval Pending",
          text2: "Your account is waiting for administrator approval.",
          position: "top",
        });

        setTimeout(() => {
          router.replace("/(auth)/pending-approval");
        }, 1200);

        // OTP NOT VERIFIED
      } else if (
        response.status === 403 &&
        data.message === "Please verify your OTP before logging in."
      ) {
        Toast.show({
          type: "error",
          text1: "OTP Verification Required",
          text2: "Please verify your email before logging in.",
          position: "top",
        });

        setTimeout(() => {
          router.replace({
            pathname: "/(auth)/verify-otp",
            params: {
              email: email.trim(),
              purpose: "registration",
            },
          });
        }, 1200);

        // OTHER ERRORS
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: data.message || "Invalid email or password.",
          position: "top",
        });

        console.log("Login failed:", data);
      }
    } catch (error) {
      console.log("Login error:", error);

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
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f7fb" }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={authStyles.container}
            // contentContainerStyle={{
            //     paddingBottom: insets.bottom,
            // }}
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
                  source={require("../../assets/images/icon.png")}
                  style={authStyles.logo}
                />
              </View>
            </View>

            <View style={authStyles.headingSection}>
              <Text style={authStyles.title}>
                Welcome <Text style={authStyles.redText}>Back !</Text>
              </Text>
              <Text style={authStyles.subtitle}>
                Please Login to Continue Your Journey.
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
              </View>

              <View style={styles.optionsRow}>
                <View style={styles.rememberContainer}>
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setRememberMe((prev) => !prev)}
                  >
                    {rememberMe && <Ionicons name="checkmark" size={16} />}
                  </TouchableOpacity>

                  <Text style={styles.rememberText}>Remember Me</Text>
                </View>

                <TouchableOpacity
                  onPress={() => router.push("/forgot-password")}
                >
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={authStyles.button}
                onPress={handleLogin}
                disabled={loading}
              >
                <Text style={authStyles.buttonText}>
                  {loading ? "Logging in..." : "Login"}
                </Text>
              </TouchableOpacity>

              <Text style={authStyles.text}>
                Don't have an account?
                <Text
                  style={authStyles.redText}
                  onPress={() => router.push("/(auth)/register")}
                >
                  Sign Up here
                </Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Login;

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
    borderColor: COLORS.secondary,
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
    color: COLORS.secondary,
    fontWeight: "600",
  },
});
