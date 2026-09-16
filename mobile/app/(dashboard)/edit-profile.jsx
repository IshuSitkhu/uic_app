import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS } from "../../constants/colors";
import API_URL from "../../services/api";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const EditProfile = () => {
   const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        router.replace("/(auth)/login");
        return;
      }

      const response = await fetch(`${API_URL}/auth/user`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        const user = data.user;

        setUsername(user.username || "");
        setMobileNumber(user.phone_number || "");
        setEmail(user.email || "");

        setGender(user.profile?.gender || "");
        setAddress(user.profile?.address || "");
        setDob(user.profile?.dob || "");
        setProfileImage(user.profile?.profile_pic || null);
      }
    } catch (error) {
      console.log("Fetch profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        console.log("Permission to access photos was denied");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Image picker error:", error);
    }
  };

  // const handleSave = async () => {
  //   try {
  //     setSaving(true);

  //     const token = await AsyncStorage.getItem("token");

  //     const response = await fetch(`${API_URL}/auth/profile`, {
  //       method: "PUT",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         username,
  //         phone_number: mobileNumber,
  //         email,
  //         gender,
  //         address,
  //         dob: dob || null,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       console.log("Profile updated:", data);

  //       router.back();
  //     } else {
  //       console.log("Update failed:", data);
  //     }
  //   } catch (error) {
  //     console.log("Update profile error:", error);
  //   } finally {
  //     setSaving(false);
  //   }
  // };


  // UI only
  
  const handleSave = async () => {
    try {
      setSaving(true);

      const token = await AsyncStorage.getItem("token");

      const formData = new FormData();

      formData.append("_method", "PUT");
      formData.append("username", username);
      formData.append("phone_number", mobileNumber);
      formData.append("email", email);
      formData.append("gender", gender);
      formData.append("address", address);
      formData.append("dob", dob || "");

      // Add profile image only if a new local image was selected
      if (profileImage && !profileImage.startsWith("http")) {
        const filename = profileImage.split("/").pop();

        const match = /\.(\w+)$/.exec(filename || "");
        const type = match ? `image/${match[1]}` : "image/jpeg";

        formData.append("profile_pic", {
          uri: profileImage,
          name: filename || "profile.jpg",
          type,
        });
      }

      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Profile updated:", data);

        router.back();
      } else {
        console.log("Update failed:", data);
      }
    } catch (error) {
      console.log("Update profile error:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = () => {
    console.log("Delete account clicked");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={COLORS.secondary} />
      </View>
    );
  }

  return (
    <View
        style={{
          flex: 1,
          backgroundColor: "#F9F7FB",
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={23} color="#222" />
            </TouchableOpacity>

            <Text style={styles.title}>Edit Profile</Text>

            <View style={styles.headerPlaceholder} />
          </View>

          <View style={styles.profileSection}>
            <View style={styles.imageWrapper}>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.profilePlaceholder}>
                  <Ionicons name="person" size={58} color="#fff" />
                </View>
              )}

              <TouchableOpacity
                style={styles.cameraButton}
                activeOpacity={0.8}
                onPress={handlePickImage}
              >
                <Ionicons name="camera" size={19} color="#fff" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handlePickImage}>
              <Text style={styles.changePhotoText}>Change profile photo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            {/* <Text style={styles.label}>
                        Username
                    </Text> */}
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#999" />
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
                placeholderTextColor="#aaa"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color="#999" />
              <TextInput
                style={styles.input}
                value={mobileNumber}
                onChangeText={setMobileNumber}
                placeholder="Phone number"
                placeholderTextColor="#aaa"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#999" />

              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email address"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#999" />

              <TextInput
                style={styles.input}
                value={gender}
                onChangeText={setGender}
                placeholder="Gender"
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="location-outline" size={20} color="#999" />

              <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="Address"
                placeholderTextColor="#aaa"
              />
            </View>

            <Pressable
              style={styles.inputContainer}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={20} color="#999" />

              <TextInput
                style={styles.input}
                value={dob}
                placeholder="Select Date of Birth"
                placeholderTextColor="#aaa"
                editable={false}
                pointerEvents="none"
              />
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={dob ? new Date(dob) : new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                maximumDate={new Date()}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);

                  if (selectedDate) {
                    const formattedDate = selectedDate
                      .toISOString()
                      .split("T")[0];

                    setDob(formattedDate);
                  }
                }}
              />
            )}
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.saveButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </>
            )}
          </Pressable>

          <View style={styles.dangerSection}>
            <Text style={styles.dangerTitle}>Account Settings</Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteAccount}
              activeOpacity={0.75}
            >
              <View style={styles.deleteLeft}>
                <View style={styles.deleteIconContainer}>
                  <Ionicons
                    name="trash-outline"
                    size={21}
                    color={COLORS.primary}
                  />
                </View>

                <View>
                  <Text style={styles.deleteText}>Delete Account</Text>

                  <Text style={styles.deleteSubText}>
                    This action cannot be undone
                  </Text>
                </View>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F8FA",
  },

  content: {
    margin:10,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8FA",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F9F7FB",
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

  title: {
    fontSize: 21,
    fontWeight: "700",
    color: "#1D1D1F",
  },

  headerPlaceholder: {
    width: 44,
  },

  profileSection: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 28,
  },

  imageWrapper: {
    width: 120,
    height: 120,
    position: "relative",
  },

  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  cameraButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    bottom: 2,
    borderWidth: 3,
    borderColor: "#F8F8FA",
  },

  changePhotoText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.secondary,
  },

  section: {
    backgroundColor: "#F9F7FB",
    borderRadius: 22,
    padding: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
    marginBottom: 18,
  },

  inputContainer: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#F7F7F8",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEEEF0",
  },

  input: {
    flex: 1,
    height: "100%",
    fontSize: 15,
    color: "#222",
    marginLeft: 12,
  },

  saveButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.secondary,
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,

    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  buttonPressed: {
    opacity: 0.85,
    transform: [
      {
        scale: 0.98,
      },
    ],
  },

  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  dangerSection: {
    marginTop: 35,
    marginBottom: 20,
  },

  dangerTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8A8A8F",
    marginBottom: 10,
    marginLeft: 5,
  },

  deleteButton: {
    minHeight: 78,
    backgroundColor: "#F9F7FB",
    borderRadius: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F3DADA",
  },

  deleteLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  deleteIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 13,
    // backgroundColor: "#FCECEC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  deleteText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.secondary,
  },

  deleteSubText: {
    fontSize: 12,
    color: "#999",
    marginTop: 3,
  },
});
