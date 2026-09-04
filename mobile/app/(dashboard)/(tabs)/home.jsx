import { Ionicons } from "@expo/vector-icons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { COLORS } from "../../../constants/colors";

const Home = () => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 50 : 5,
        }}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/images/quoteimg.png")}
              style={styles.logo}
            />

            <Text style={styles.logoText}>United in Christ</Text>
          </View>
          <Pressable>
            <Ionicons name="search" size={18} color={COLORS.primary} />
          </Pressable>
        </View>

        <View style={styles.welcomeSection}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>
              Welcome to{"\n"}
              <Text style={styles.subtitle}>United in Christ</Text>
            </Text>

            <Text style={styles.welcomeDescription}>
              A place to grow in faith, find encouragement, pray, worship, and
              connect with Christian community.
            </Text>
          </View>

          <View style={styles.welcomeImageContainer}>
            <Image
              source={require("../../../assets/images/quoteimg.png")}
              style={styles.welcomeImage}
            />
          </View>
        </View>

        <View style={styles.todaysVerseSection}>
          <View style={styles.verseHeader}>
            <View style={styles.verseTitleContainer}>
              <View style={styles.plusIconContainer}>
                <FontAwesome name="plus" size={14} color="white" />
              </View>

              <Text style={styles.verseTitle}>Today's Verse</Text>
            </View>

            <View style={styles.dateContainer}>
              <EvilIcons name="calendar" size={26} color={COLORS.secondary} />

              <Text style={styles.verseDate}>May 22</Text>
            </View>
          </View>

          <View style={styles.verseContent}>
            <Fontisto
              name="quote-a-right"
              size={20}
              color={COLORS.secondary}
              style={styles.quoteIcon}
            />

            <View style={styles.verseTextContainer}>
              <Text style={styles.verseText}>
                {/* And it came to pass, when the priests that bare the ark of the covenant of the Lord were come up out of the midst of Jordan, and the soles of the priests\u2019 feet were lifted up unto the dry land, that the waters of Jordan returned unto their place, and flowed over all his banks, as they did before. */}
                And it came to pass, when all the people were clean passed over
                Jordan, that the Lord spake unto Joshua, saying,
              </Text>
              <Text style={styles.verseReference}>Genesis 1:1</Text>
            </View>

            <View style={styles.verseImageContainer}>
              <Image
                source={require("../../../assets/images/today-verse.png")}
                style={styles.verseImage}
              />
            </View>
          </View>
        </View>

        <View style={styles.exploreFaithSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore Your Faith</Text>

            <Pressable style={styles.view}>
              <Text style={styles.viewAllText}>View All</Text>
              <MaterialIcons
                name="navigate-next"
                size={18}
                color={COLORS.secondary}
              />
            </Pressable>
          </View>

          <View style={styles.faithOptions}>
            <Pressable style={[styles.faithItem, styles.prayer]}>
              <View style={[styles.faithIcon, styles.prayerIcon]}>
                <MaterialCommunityIcons
                  name="hands-pray"
                  size={24}
                  color="#6B4FA1"
                />
              </View>

              <Text style={styles.faithText}>Prayers</Text>

              {/* <Text style={styles.faithDescription}>
                          Find the strength {"\n"} through prayer
                        </Text> */}
            </Pressable>
            <Pressable style={[styles.faithItem, styles.worship]}>
              <View style={[styles.faithIcon, styles.worshipIcon]}>
                <FontAwesome5 name="pray" size={24} color="#3D7DA8" />
              </View>

              <Text style={styles.faithText}>Worship</Text>
            </Pressable>

            <Pressable
              style={[styles.faithItem, styles.blog]}
              onPress={() => router.push("/blogs")}
            >
              <View style={[styles.faithIcon, styles.blogIcon]}>
                <MaterialCommunityIcons
                  name="clipboard-edit"
                  size={24}
                  color="#B45D72"
                />
              </View>

              <Text style={styles.faithText}>Blog</Text>
              {/* <Text style={styles.faithDescription}>
                          Explore God's {"\n"}
                          <Text style={styles.faithSubDescription}>
                             World
                          </Text>
                        </Text> */}
            </Pressable>
          </View>
        </View>

        <View style={styles.dailyInspirationSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Inspiration</Text>

            <Pressable style={styles.view}>
              <Text style={styles.viewAllText}>View All</Text>
              <MaterialIcons
                name="navigate-next"
                size={18}
                color={COLORS.secondary}
              />
            </Pressable>
          </View>

          <View style={styles.inspirationCards}>
            <Pressable style={styles.inspirationCard}>
              <Image
                source={require("../../../assets/images/daily-inspiration1.png")}
                style={styles.inspirationImage}
              />
              <View style={styles.inspirationIcon}>
                <MaterialCommunityIcons
                  name="hands-pray"
                  size={24}
                  color="#6B4FA1"
                />
              </View>
              <View style={styles.inspirationTextContainer}>
                <Text style={styles.inspirationText}>Prayer for Today</Text>
                <Text style={styles.inspirationSubText}>
                  Lord guide my heart and steps today.
                </Text>
              </View>
            </Pressable>

            <Pressable style={styles.inspirationCard}>
              <Image
                source={require("../../../assets/images/daily-inspiration2.png")}
                style={styles.inspirationImage}
              />

              <View style={styles.inspirationIcon}>
                <Ionicons
                  name="sparkles-outline"
                  size={18}
                  color={COLORS.primary}
                />
              </View>

              <View style={styles.inspirationTextContainer}>
                <Text style={styles.inspirationText}>Faith Reminder</Text>

                <Text style={styles.inspirationSubText}>
                  Lord guide my heart and steps today.
                </Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.prayerCommunitySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Prayer Community</Text>

            <Pressable style={styles.view}>
              <Text style={styles.viewAllText}>View All</Text>
              <MaterialIcons
                name="navigate-next"
                size={18}
                color={COLORS.secondary}
              />
            </Pressable>
          </View>
          <Pressable style={styles.prayerCard}>
            <View style={styles.prayerUserRow}>
              <View style={styles.profileIcon}>
                <Ionicons name="person" size={22} color="#fff" />
              </View>

              <View>
                <Text style={styles.prayerUserName}>Grace D.</Text>

                <Text style={styles.prayerTime}>2 days ago</Text>
              </View>
            </View>

            <Text style={styles.prayerText}>
              "Please pray for my family and for God's guidance in the decisions
              we are making."
            </Text>

            <View style={styles.prayerCountRow}>
              <MaterialCommunityIcons
                name="hands-pray"
                size={24}
                color="#6B4FA1"
              />

              <Text style={styles.prayerCountText}>18 people prayed</Text>
            </View>
          </Pressable>
        </View>

        <ImageBackground
          source={require("../../../assets/images/quoteimg.png")}
          style={styles.joinCommunitySection}
          imageStyle={styles.joinCommunityBackground}
        >
          <View style={styles.joinCommunityOverlay}>
            <Text style={styles.joinCommunityTitle}>
              Join Our Prayer Community
            </Text>

            <Text style={styles.joinCommunityDescription}>
              Connect with believers, share prayer requests, pray for others and
              grow together in faith.
            </Text>

            <Pressable style={styles.joinCommunityButton}>
              <Text style={styles.joinCommunityButtonText}>Join Community</Text>
            </Pressable>

            <View style={styles.signInRow}>
              <Text style={styles.alreadyAccountText}>
                Already have an account?
              </Text>

              <Pressable onPress={() => router.push("/(auth)/login")}>
                <Text style={styles.signInText}>Sign In</Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f9f7fb",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    marginLeft: 10,
    width: 40,
    height: 40,
    resizeMode: "cover",
  },

  logoText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    color: COLORS.primary,
  },

  welcomeSection: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    minHeight: 155,
  },

  welcomeTextContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 12,
  },

  welcomeTitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "700",
    color: "#222",
  },

  subtitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "700",
    color: COLORS.primary,
  },

  welcomeDescription: {
    marginTop: 9,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "400",
    color: "#646262",
  },

  welcomeImageContainer: {
    width: 170,
    height: 170,
    borderTopLeftRadius: 85,
    borderBottomLeftRadius: 85,
    overflow: "hidden",
  },

  welcomeImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  todaysVerseSection: {
    marginHorizontal: 16,
    marginTop: 22,
    padding: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  verseHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  verseTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  plusIconContainer: {
    width: 28,
    height: 28,
    backgroundColor: COLORS.primary,

    justifyContent: "center",
    alignItems: "center",
  },

  verseTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
    marginLeft: 8,
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  verseDate: {
    fontSize: 13,
    color: COLORS.secondary,
    marginLeft: 2,
    fontWeight: "600",
  },

  verseContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  quoteIcon: {
    alignSelf: "flex-start",
    marginTop: 3,
    marginRight: 8,
  },

  verseTextContainer: {
    flex: 1,
    paddingRight: 10,
  },

  verseText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#444",
  },

  verseReference: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.secondary,
  },

  verseImageContainer: {
    width: 120,
    height: 100,
  },

  verseImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  exploreFaithSection: {
    marginHorizontal: 20,
    marginTop: 30,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: COLORS.primary,
  },

  view: {
    flexDirection: "row",
    alignItems: "center",
  },

  viewAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.secondary,
  },

  faithOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },

  faithItem: {
    width: "31%",
    minHeight: 92,
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 18,
    paddingHorizontal: 6,
    paddingVertical: 14,

    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  prayer: {
    backgroundColor: "#F7F2FC",
  },

  prayerIcon: {
    backgroundColor: "#E9DDF8",
  },

  faithDescription: {
    fontSize: 14,
    color: "#444",
    marginTop: 5,
    //  alignItems: "center",
  },

  faithSubDescription: {
    fontSize: 14,
    alignItems: "center",
  },

  faithIcon: {
    width: 42,
    height: 42,
    borderRadius: 11,

    alignItems: "center",
    justifyContent: "center",
  },

  worship: {
    backgroundColor: "#F1F8FC",
  },

  worshipIcon: {
    backgroundColor: "#DCECF8",
  },

  blog: {
    backgroundColor: "#FFF4F5",
  },

  blogIcon: {
    backgroundColor: "#F8DFE4",
  },

  faithText: {
    marginTop: 9,
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    textAlign: "center",
  },

  dailyInspirationSection: {
    marginHorizontal: 20,
    marginTop: 30,
  },

  inspirationCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },

  inspirationCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    overflow: "hidden",

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },

  inspirationImage: {
    width: "100%",
    height: 125,
    resizeMode: "cover",
  },

  inspirationIcon: {
    position: "absolute",
    top: 107,
    left: 12,

    width: 36,
    height: 36,
    borderRadius: 18,

    backgroundColor: "#f9f7fb",

    alignItems: "center",
    justifyContent: "center",

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

  inspirationTextContainer: {
    paddingHorizontal: 15,
    paddingTop: 27,
    paddingBottom: 15,
  },

  inspirationText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
    lineHeight: 20,
  },

  inspirationSubText: {
    marginTop: 7,
    fontSize: 12.5,
    lineHeight: 18,
    color: "#666",
  },

  prayerCommunitySection: {
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 30,
  },

  prayerCard: {
    marginTop: 14,
    backgroundColor: "#f9f7fb",
    borderRadius: 16,
    padding: 16,

    shadowColor: "#000",
    // Android
    elevation: 3,

    // iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },

  prayerUserRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileIcon: {
    width: 42,
    height: 42,

    // This makes it completely round
    borderRadius: 21,

    backgroundColor: COLORS.secondary,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 11,
  },

  prayerUserName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
  },

  prayerTime: {
    fontSize: 12,
    color: "#888",
    marginTop: 3,
  },

  prayerText: {
    marginTop: 15,
    fontSize: 14,
    lineHeight: 21,
    color: "#444",
  },

  prayerCountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 15,
  },

  prayerCountText: {
    marginLeft: 7,
    fontSize: 13,
    color: "#666",
  },

  joinCommunitySection: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,

    borderRadius: 20,
    overflow: "hidden",
  },

  joinCommunityBackground: {
    // opacity: 0.12,
    resizeMode: "cover",
  },

  joinCommunityOverlay: {
    paddingHorizontal: 22,
    paddingVertical: 22,
    alignItems: "center",
  },

  joinCommunityTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: COLORS.primary,
    textAlign: "center",
  },

  joinCommunityDescription: {
    marginTop: 9,
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
    textAlign: "center",
  },

  joinCommunityButton: {
    marginTop: 17,

    width: "52%",
    paddingVertical: 11,

    backgroundColor: COLORS.primary,
    borderRadius: 10,

    alignItems: "center",
  },

  joinCommunityButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },

  signInRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
  },

  alreadyAccountText: {
    fontSize: 13,
    color: COLORS.secondary,
  },

  signInText: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.secondary,
  },
});
