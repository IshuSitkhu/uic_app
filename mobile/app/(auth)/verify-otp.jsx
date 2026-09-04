import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Toast from "react-native-toast-message";
import { COLORS } from "../../constants/colors";
import API_URL from "../../services/api";

const VerifyOtp = () => {
  const { email, purpose } = useLocalSearchParams();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const isRegistration = purpose === "registration";

  const handleVerifyOtp = async () => {
    if (loading) return;

    if (!otp.trim()) {
      Toast.show({
        type: "error",
        text1: "OTP Required",
        text2: "Please enter the verification code.",
        position: "top",
      });
      return;
    }

    if (otp.trim().length !== 4) {
      Toast.show({
        type: "error",
        text1: "Invalid OTP",
        text2: "OTP must contain 4 digits.",
        position: "top",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          otp: otp.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "OTP Verified",
          text2: isRegistration
            ? "Your email has been verified."
            : "OTP verified successfully.",
          position: "top",
        });

        console.log("OTP verified:", data);

        setTimeout(() => {
          if (isRegistration) {
            router.replace("/(auth)/pending-approval");
          } else {
            router.replace({
              pathname: "/(auth)/reset-password",
              params: {
                email,
                otp: otp.trim(),
              },
            });
          }
        }, 1200);
      } else {
        Toast.show({
          type: "error",
          text1: "Verification Failed",
          text2: data.message || "Invalid or expired OTP.",
          position: "top",
        });

        console.log("OTP verification failed:", data);
      }
    } catch (error) {
      console.log("OTP verification error:", error);

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
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.iconCircle}>
        <Ionicons name="mail-outline" size={40} color="#fff" />
      </View>

      <Text style={styles.title}>
        Verify <Text style={styles.redText}>OTP</Text>
      </Text>

      <Text style={styles.subtitle}>
        Enter the 4-digit verification code sent to
      </Text>

      <Text style={styles.email}>{email}</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Verification Code</Text>

        <View style={styles.inputWrapper}>
          <Ionicons name="keypad-outline" size={20} color="#999" />

          <TextInput
            style={styles.input}
            placeholder="Enter 4-digit OTP"
            placeholderTextColor="#999"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={4}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleVerifyOtp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Verifying..." : "Verify OTP"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f7fb",
  },

  content: {
    flexGrow: 1,
    padding: 25,
    justifyContent: "center",
  },

  backButton: {
    position: "absolute",
    top: 70,
    left: 25,
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
  },

  email: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginTop: 5,
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
    fontSize: 18,
    marginLeft: 10,
    color: "#333",
    letterSpacing: 3,
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

  backLogin: {
    alignItems: "center",
    marginTop: 25,
  },

  backLoginText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});
