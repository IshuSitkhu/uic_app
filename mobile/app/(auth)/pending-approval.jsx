import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/colors";

const PendingApproval = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="checkmark" size={50} color="#fff" />
      </View>

      <Text style={styles.title}>
        Registration <Text style={styles.redText}>Verified</Text>
      </Text>

      <Text style={styles.description}>
        Your email has been successfully verified.
      </Text>

      <Text style={styles.description}>
        Your account is now waiting for administrator approval. You will be able
        to log in once your account has been approved.
      </Text>

      <View style={styles.infoBox}>
        <Ionicons name="time-outline" size={24} color={COLORS.primary} />

        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Approval Pending</Text>

          <Text style={styles.infoText}>
            Please wait while an administrator reviews your account.
          </Text>
        </View>
      </View>

      {/* Back to Login */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/(auth)/login")}
      >
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PendingApproval;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f7fb",
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  iconCircle: {
    width: 95,
    height: 95,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    fontSize: 29,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    marginBottom: 15,
  },

  redText: {
    color: COLORS.primary,
  },

  description: {
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    lineHeight: 23,
    marginBottom: 10,
  },

  infoBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ac0a0a08",
    borderWidth: 1,
    borderColor: "#ac0a0a20",
    borderRadius: 12,
    padding: 16,
    marginTop: 25,
    marginBottom: 25,
  },

  infoContent: {
    flex: 1,
    marginLeft: 12,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },

  infoText: {
    fontSize: 14,
    color: "#777",
    lineHeight: 20,
  },

  button: {
    width: "100%",
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
});
