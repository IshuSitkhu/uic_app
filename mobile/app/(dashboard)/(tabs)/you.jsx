import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "../../../constants/colors";
import { useAuth } from "../../../context/AuthContext";

const You = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={COLORS.secondary} />
      </View>
    );
  }

  // =========================================
  // LOGGED OUT
  // =========================================

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loggedOutScreen}>
          <View style={styles.header}>
            <Text style={styles.title}>My Profile</Text>
          </View>

          <View style={styles.loggedOutContainer}>
            <View style={styles.loginIcon}>
              <Ionicons
                name="person-outline"
                size={42}
                color="#FFFFFF"
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
              <Text style={styles.loginButtonText}>Log In</Text>
            </Pressable>

            <View style={styles.registerRow}>
              <Text style={styles.registerText}>
                Don't have an account?
              </Text>

              <Pressable
                onPress={() => router.push("/(auth)/register")}
              >
                <Text style={styles.registerLink}>Register</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // =========================================
  // LOGGED IN
  // =========================================

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* =========================================
            HEADER
        ========================================= */}

        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>

          <Pressable
            style={({ pressed }) => [
              styles.settingsButton,
              pressed && styles.pressed,
            ]}
            onPress={() => router.push("/settings")}
          >
            <Ionicons
              name="settings-outline"
              size={24}
              color="#333"
            />
          </Pressable>
        </View>

        {/* =========================================
            PROFILE
        ========================================= */}

        <View style={styles.profileSection}>
          {/* AVATAR */}
          <View style={styles.avatarOuter}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.name?.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>

          {/* PROFILE INFO */}
          <View style={styles.profileInfo}>
            <Text style={styles.name}>
              {user.name}
            </Text>

            <Text style={styles.username}>
              @{user.username}
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.shareButton,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons
                name="share-social-outline"
                size={17}
                color={COLORS.primary}
              />

              <Text style={styles.shareText}>
                Share Profile
              </Text>
            </Pressable>
          </View>
        </View>


        
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              My Collection
            </Text>

            <Text style={styles.sectionDescription}>
              Things you've saved
            </Text>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.collectionCard,
            pressed && styles.featurePressed,
          ]}
          onPress={() => router.push("/saved-bible")}
        >
          <View style={styles.collectionIcon}>
            <Ionicons
              name="bookmark"
              size={27}
              color={COLORS.primary}
            />
          </View>

          <View style={styles.collectionContent}>
            <Text style={styles.collectionTitle}>
              Saved
            </Text>

            <Text style={styles.collectionSubtitle}>
              Prayer · Blog · Worship · Questions
            </Text>
          </View>

          <View style={styles.collectionArrow}>
            <Ionicons
              name="arrow-forward"
              size={20}
              color={COLORS.primary}
            />
          </View>
        </Pressable>

        {/* =========================================
            YOUR SPACE
        ========================================= */}

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Your Space</Text>
            <Text style={styles.sectionDescription}>
              Your personal faith journey
            </Text>
          </View>
        </View>

        {/* =========================================
            FEATURED PRAYER
        ========================================= */}

        <Pressable
          style={({ pressed }) => [
            styles.prayerFeatureCard,
            pressed && styles.featurePressed,
          ]}
        >
          <View style={styles.prayerGlow} />

          <View style={styles.featureIconContainer}>
            <MaterialCommunityIcons
              name="hands-pray"
              size={43}
              color="#6B4FA1"
            />
          </View>

          <View style={styles.featureTextContainer}>
            <Text style={styles.featureLabel}>
              PRAYER
            </Text>

            <Text style={styles.featureTitle}>
              Your Prayer Space
            </Text>

            <Text style={styles.featureSubtitle}>
              Keep your prayers and moments with God
              together.
            </Text>
          </View>

          <View style={styles.featureArrow}>
            <Ionicons
              name="arrow-forward"
              size={20}
              color="#6B4FA1"
            />
          </View>
        </Pressable>

        {/* =========================================
            WORSHIP + BLOG
        ========================================= */}

        <View style={styles.twoColumnRow}>

          {/* WORSHIP */}

          <Pressable
            style={({ pressed }) => [
              styles.smallFeatureCard,
              styles.worshipCard,
              pressed && styles.featurePressed,
            ]}
          >
            <View
              style={[
                styles.largeIconContainer,
                styles.worshipIcon,
              ]}
            >
              <FontAwesome5
                name="pray"
                size={32}
                color="#3D7DA8"
              />
            </View>

            <Text
              style={[
                styles.smallCardLabel,
                { color: "#3D7DA8" },
              ]}
            >
              WORSHIP
            </Text>

            <Text style={styles.smallCardTitle}>
              Your Worship
            </Text>

            <View style={styles.smallCardArrow}>
              <Ionicons
                name="arrow-forward"
                size={18}
                color="#3D7DA8"
              />
            </View>
          </Pressable>

          {/* BLOG */}

          <Pressable
            style={({ pressed }) => [
              styles.smallFeatureCard,
              styles.blogCard,
              pressed && styles.featurePressed,
            ]}
            onPress={() => router.push("/blogs")}
          >
            <View
              style={[
                styles.largeIconContainer,
                styles.blogIcon,
              ]}
            >
              <MaterialCommunityIcons
                name="clipboard-edit-outline"
                size={34}
                color="#B45D72"
              />
            </View>

            <Text
              style={[
                styles.smallCardLabel,
                { color: "#B45D72" },
              ]}
            >
              BLOG
            </Text>

            <Text style={styles.smallCardTitle}>
              Your Blogs
            </Text>

            <View style={styles.smallCardArrow}>
              <Ionicons
                name="arrow-forward"
                size={18}
                color="#B45D72"
              />
            </View>
          </Pressable>
        </View>

        {/* =========================================
            QUESTIONS
        ========================================= */}

        <Pressable
          style={({ pressed }) => [
            styles.questionCard,
            pressed && styles.featurePressed,
          ]}
        >
          <View
            style={[
              styles.questionIconContainer,
              styles.questionIcon,
            ]}
          >
            <MaterialCommunityIcons
              name="help"
              size={34}
              color="#5A9C91"
            />
          </View>

          <View style={styles.questionText}>
            <Text style={styles.questionLabel}>
              QUESTIONS
            </Text>

            <Text style={styles.questionTitle}>
              Ask, explore & discover
            </Text>

            <Text style={styles.questionSubtitle}>
              Your questions and conversations
            </Text>
          </View>

          <View style={styles.questionArrow}>
            <Ionicons
              name="arrow-forward"
              size={20}
              color="#5A9C91"
            />
          </View>
        </Pressable>

        {/* =========================================
            MY COLLECTION
        ========================================= */}


        {/* =========================================
            BIBLE JOURNAL
        ========================================= */}

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Bible Journal
            </Text>

            <Text style={styles.sectionDescription}>
              Your personal Bible study
            </Text>
          </View>
        </View>

        <View style={styles.bibleGrid}>

          {/* HIGHLIGHTS */}

          <Pressable
            style={({ pressed }) => [
              styles.bibleCard,
              pressed && styles.featurePressed,
            ]}
            onPress={() => router.push("/highlight-bible")}
          >
            <View style={styles.bibleLargeIcon}>
              <FontAwesome5
                name="highlighter"
                size={27}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.bibleTitle}>
              Highlights
            </Text>

            <Text style={styles.bibleSubtitle}>
              Your highlighted verses
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color="#999"
              style={styles.bibleArrow}
            />
          </Pressable>

          {/* NOTES */}

          <Pressable
            style={({ pressed }) => [
              styles.bibleCard,
              pressed && styles.featurePressed,
            ]}
            onPress={() => router.push("/saved-bible")}
          >
            <View style={styles.bibleLargeIcon}>
              <Ionicons
                name="document-text-outline"
                size={29}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.bibleTitle}>
              Notes
            </Text>

            <Text style={styles.bibleSubtitle}>
              Your Bible notes
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color="#999"
              style={styles.bibleArrow}
            />
          </Pressable>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // =========================================
  // SCREEN
  // =========================================

  safeArea: {
    flex: 1,
    backgroundColor: "#F8F6FA",
  },

  container: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F6FA",
  },

  // =========================================
  // HEADER
  // =========================================

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingTop: 18,
    paddingBottom: 15,
  },

  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#211D26",
    letterSpacing: -0.6,
  },

  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,

    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,

    elevation: 2,
  },

  // =========================================
  // PROFILE
  // =========================================

  profileSection: {
    flexDirection: "row",
  alignItems: "center",

  paddingTop: 8,
  paddingBottom: 20,

  paddingHorizontal: 4,
  },

  avatarOuter: {
    width: 126,
    height: 126,

    borderRadius: 63,

    backgroundColor: "#EEE8F5",

    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: 108,
    height: 108,

    borderRadius: 54,

    backgroundColor: COLORS.primary,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 4,
    borderColor: "#FFFFFF",

    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,

    elevation: 5,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "700",
  },

profileInfo: {
  flex: 1,
  marginLeft: 18,
},

name: {
  fontSize: 23,
  fontWeight: "700",
  color: "#29232F",
},

username: {
  marginTop: 4,
  fontSize: 14,
  color: "#89838F",
},

shareButton: {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "flex-start",

  marginTop: 12,

  paddingHorizontal: 16,
  paddingVertical: 8,

  borderRadius: 20,

  backgroundColor: "#FFFFFF",

  borderWidth: 1,
  borderColor: "#DDD5E8",
},

shareText: {
  marginLeft: 7,

  fontSize: 13,
  fontWeight: "600",

  color: COLORS.primary,
},

  // =========================================
  // SECTION HEADERS
  // =========================================

  sectionHeader: {
    marginTop: 17,
    marginBottom: 13,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",

    color: "#30263D",

    letterSpacing: -0.2,
  },

  sectionDescription: {
    marginTop: 3,

    fontSize: 12,

    color: "#96909A",
  },

  // =========================================
  // PRAYER FEATURE
  // =========================================

  prayerFeatureCard: {
    minHeight: 190,

    borderRadius: 25,

    padding: 20,

    backgroundColor: "#F3ECFA",

    position: "relative",
    overflow: "hidden",

    shadowColor: "#6B4FA1",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,

    elevation: 3,
  },

  prayerGlow: {
    position: "absolute",

    width: 150,
    height: 150,

    borderRadius: 75,

    right: -45,
    top: -45,
    backgroundColor:COLORS.primary,
    // backgroundColor: "#E7D9F4",
  },

  featureIconContainer: {
    width: 67,
    height: 67,

    borderRadius: 22,

    backgroundColor: "#E6D8F4",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 20,
  },

  featureTextContainer: {
    maxWidth: "82%",
  },

  featureLabel: {
    fontSize: 11,
    fontWeight: "800",

    letterSpacing: 1.4,

    color: "#7556A0",
  },

  featureTitle: {
    marginTop: 4,

    fontSize: 22,
    fontWeight: "700",

    color: "#342743",
  },

  featureSubtitle: {
    marginTop: 5,

    fontSize: 13,
    lineHeight: 19,

    color: "#776B81",
  },

  featureArrow: {
    position: "absolute",

    right: 18,
    bottom: 18,

    width: 38,
    height: 38,

    borderRadius: 19,

    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },

  // =========================================
  // WORSHIP / BLOG
  // =========================================

  twoColumnRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginTop: 13,
  },

  smallFeatureCard: {
    width: "48.2%",
    minHeight: 180,

    borderRadius: 23,

    padding: 17,

    position: "relative",
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 9,

    elevation: 2,
  },

  worshipCard: {
    backgroundColor: "#EDF6FB",
  },

  blogCard: {
    backgroundColor: "#FFF1F3",
  },

  largeIconContainer: {
    width: 67,
    height: 67,

    borderRadius: 22,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 21,
  },

  worshipIcon: {
    backgroundColor: "#D8EBF6",
  },

  blogIcon: {
    backgroundColor: "#F7DDE3",
  },

  smallCardLabel: {
    fontSize: 10,
    fontWeight: "800",

    letterSpacing: 1.2,
  },

  smallCardTitle: {
    marginTop: 4,

    fontSize: 17,
    fontWeight: "700",

    color: "#302936",
  },

  smallCardArrow: {
    position: "absolute",

    right: 14,
    bottom: 14,

    width: 34,
    height: 34,

    borderRadius: 17,

    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },

  // =========================================
  // QUESTIONS
  // =========================================

  questionCard: {
    minHeight: 110,

    marginTop: 13,

    borderRadius: 23,

    padding: 16,

    backgroundColor: "#EDF8F5",

    flexDirection: "row",
    alignItems: "center",

    position: "relative",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 9,

    elevation: 2,
  },

  questionIconContainer: {
    width: 67,
    height: 67,

    borderRadius: 21,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 15,
  },

  questionIcon: {
    backgroundColor: "#D8EFE9",
  },

  questionText: {
    flex: 1,

    paddingRight: 35,
  },

  questionLabel: {
    fontSize: 10,
    fontWeight: "800",

    letterSpacing: 1.2,

    color: "#5A9C91",
  },

  questionTitle: {
    marginTop: 4,

    fontSize: 17,
    fontWeight: "700",

    color: "#2D3B38",
  },

  questionSubtitle: {
    marginTop: 4,

    fontSize: 12,

    color: "#788A86",
  },

  questionArrow: {
    position: "absolute",

    right: 15,

    width: 36,
    height: 36,

    borderRadius: 18,

    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },

  // =========================================
  // COLLECTION
  // =========================================

  collectionCard: {
    minHeight: 92,

    borderRadius: 22,

    paddingHorizontal: 15,
    paddingVertical: 14,

    backgroundColor: "#FFFFFF",

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 9,

    elevation: 2,
  },

  collectionIcon: {
    width: 57,
    height: 57,

    borderRadius: 19,

    backgroundColor: "#EEE8F6",

    alignItems: "center",
    justifyContent: "center",

    marginRight: 14,
  },

  collectionContent: {
    flex: 1,
  },

  collectionTitle: {
    fontSize: 18,
    fontWeight: "700",

    color: "#30263D",
  },

  collectionSubtitle: {
    marginTop: 5,

    fontSize: 12,

    color: "#89838F",
  },

  collectionArrow: {
    width: 37,
    height: 37,

    borderRadius: 18.5,

    backgroundColor: "#F5F1F9",

    alignItems: "center",
    justifyContent: "center",
  },

  // =========================================
  // BIBLE JOURNAL
  // =========================================

  bibleGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  bibleCard: {
    width: "48.2%",
    minHeight: 165,

    borderRadius: 22,

    padding: 16,

    backgroundColor: "#FFFFFF",

    position: "relative",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 9,

    elevation: 2,
  },

  bibleLargeIcon: {
    width: 58,
    height: 58,

    borderRadius: 19,

    backgroundColor: "#F0EBF7",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 20,
  },

  bibleTitle: {
    fontSize: 16,
    fontWeight: "700",

    color: "#30263D",
  },

  bibleSubtitle: {
    marginTop: 5,

    fontSize: 12,
    lineHeight: 17,

    color: "#8A8490",

    paddingRight: 8,
  },

  bibleArrow: {
    position: "absolute",

    right: 14,
    bottom: 14,
  },

  // =========================================
  // PRESS STATES
  // =========================================

  pressed: {
    opacity: 0.7,
  },

  featurePressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },

  // =========================================
  // LOGGED OUT
  // =========================================

  loggedOutScreen: {
    flex: 1,
    paddingHorizontal: 20,
  },

  loggedOutContainer: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 20,
    paddingBottom: 80,
  },

  loginIcon: {
    width: 88,
    height: 88,

    borderRadius: 44,

    backgroundColor: COLORS.primary,

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
    marginTop: 10,

    fontSize: 15,
    lineHeight: 22,

    color: "#777",

    textAlign: "center",
  },

  loginButton: {
    width: "100%",

    backgroundColor: COLORS.primary,

    paddingVertical: 14,

    borderRadius: 12,

    alignItems: "center",

    marginTop: 25,
  },

  loginButtonText: {
    color: "#FFFFFF",

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
    color: COLORS.primary,

    fontSize: 14,
    fontWeight: "700",

    marginLeft: 5,
  },

  bottomSpace: {
    height: 25,
  },
});

export default You;