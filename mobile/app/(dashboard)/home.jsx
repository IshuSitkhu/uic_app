import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Home = () => {
    const insets = useSafeAreaInsets();
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Platform.OS === "ios" ? 50 : 5, }} >

            <View style={styles.header}>
                <View style={styles.logoContainer}>
                  <Image  source={require("../../assets/images/icon.png")} style={styles.logo} />

                  <Text style={styles.logoText}>
                      United in Christ
                  </Text>

                </View>
                <Pressable>
                  <Ionicons name="search" size={18}color={COLORS.primary} />
              </Pressable>
            </View>

            <View style={styles.welcomeSection}>
                <View style={styles.welcomeTextContainer} >
                    <Text style={styles.welcomeTitle}>
                        Welcome to {"\n"}
                        <Text style={styles.subtitle}>
                          United in Christ
                        </Text>
                    </Text>
                    <Text style={styles.welcomeDescription}>
                        A place to grow in faith, find encouragement, pray, worship, and connect with Christian community.
                    </Text>
                </View>

                <View style={styles.welcomeImageContainer}>
                    <Image source={require("../../assets/images/icon.png")} style={styles.welcomeImage} />
                </View>
            </View>

            <View style={styles.todaysVerseSection}>
              <View style={styles.verseHeader}>
                <View style={styles.verseTitleContainer}>
                  <View style={styles.plusIconContainer}>
                    <FontAwesome name="plus" size={14} color="white" />
                  </View>

                  <Text style={styles.verseTitle}>
                    Today's Verse
                  </Text>
                </View>

                <View style={styles.dateContainer}>
                  <EvilIcons name="calendar" size={26} color={COLORS.secondary} />

                  <Text style={styles.verseDate}>
                    May 22
                  </Text>
                </View>

              </View>

              <View style={styles.verseContent}>

                <Fontisto name="quote-a-right" size={20} color={COLORS.secondary} style={styles.quoteIcon} />

                <View style={styles.verseTextContainer}>
                  <Text style={styles.verseText}>
                    {/* And it came to pass, when the priests that bare the ark of the covenant of the Lord were come up out of the midst of Jordan, and the soles of the priests\u2019 feet were lifted up unto the dry land, that the waters of Jordan returned unto their place, and flowed over all his banks, as they did before. */}
                    And it came to pass, when all the people were clean passed over Jordan, that the Lord spake unto Joshua, saying,
                  </Text>
                  <Text style={styles.verseReference}>
                    Genesis 1:1
                  </Text>
                </View>

                <View style={styles.verseImageContainer}>
                  <Image
                    source={require("../../assets/images/icon.png")}
                    style={styles.verseImage}
                  />
                </View>
              </View>
            </View>

            <View style={styles.exploreFaithSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle} >
                        Explore Your Faith
                    </Text>

                    <Pressable style={styles.view}>
                        <Text style={styles.viewAllText} >
                            View All  
                        </Text>
                        <MaterialIcons name="navigate-next" size={18} color={COLORS.secondary}  />
                    </Pressable>
                </View>

                <View style={styles.faithOptions}>
                    <Pressable style={styles.faithItem}>
                        <View style={styles.faithIcon}>
                            <Ionicons name="heart-outline" size={28} color={COLORS.primary} />
                        </View>

                        <Text style={styles.faithText} >
                            Prayers
                        </Text>

                        {/* <Text style={styles.faithDescription}>
                          Find the strength {"\n"} through prayer
                        </Text> */}
                    </Pressable>
                    <Pressable style={styles.faithItem}>

                        <View style={styles.faithIcon}>
                            <Ionicons name="musical-notes-outline" size={28} color={COLORS.primary} />
                        </View>

                        <Text style={styles.faithText} >
                            Worship
                        </Text>
                        {/* <Text style={styles.faithDescription}>
                          Listen and {"\n"} 
                          <Text style={styles.faithSubDescription}>
                            worship
                          </Text>
                        </Text> */}

                    </Pressable>

                    <Pressable style={styles.faithItem}>

                        <View style={styles.faithIcon}>
                            <Ionicons  name="book-outline" size={28} color={COLORS.primary} />
                        </View>

                        <Text style={styles.faithText}>
                            Bible
                        </Text>
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

                    <Text style={styles.sectionTitle}>
                        Daily Inspiration
                    </Text>

                    <Pressable style={styles.view}>
                        <Text style={styles.viewAllText} >
                            View All  
                        </Text>
                        <MaterialIcons name="navigate-next" size={18} color={COLORS.secondary} />
                    </Pressable>

                </View>

                <View style={styles.inspirationCards}>
                    <Pressable style={styles.inspirationCard}>
                        <Image
                            source={require("../../assets/images/icon.png")}
                            style={styles.inspirationImage}
                        />
                        <View style={styles.inspirationIcon}>
                            <Ionicons
                                name="heart-outline"
                                size={18}
                                color={COLORS.primary}
                            />
                        </View>
                        <View style={styles.inspirationTextContainer}>
                            <Text style={styles.inspirationText}>
                                Prayer for Today
                            </Text>
                            <Text style={styles.inspirationSubText}>
                                Lord guide my heart and steps today. Give me peace, and strength.
                            </Text>
                        </View>
                    </Pressable>

                    <Pressable style={styles.inspirationCard}>
                        <Image
                            source={require("../../assets/images/icon.png")}
                            style={styles.inspirationImage}
                        />

                        <View style={styles.inspirationIcon}>
                            <Ionicons
                                name="book-outline"
                                size={18}
                                color={COLORS.primary}
                            />
                        </View>

                        <View style={styles.inspirationTextContainer}>
                            <Text style={styles.inspirationText}>
                                Bible
                            </Text>

                            <Text style={styles.inspirationSubText}>
                                Lord guide my heart and steps today. Give me peace, and strength.
                            </Text>
                        </View>

                    </Pressable>

                </View>

            </View>

          <View style={styles.prayerCommunitySection}>
              <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                      Prayer Community
                  </Text>

                  <Pressable style={styles.view}>
                        <Text style={styles.viewAllText} >
                            View All  
                        </Text>
                        <MaterialIcons name="navigate-next" size={18} color={COLORS.secondary}  />
                    </Pressable>

              </View>
              <Pressable style={styles.prayerCard}>
                  <View style={styles.prayerUserRow}>

                      <View style={styles.profileIcon}>
                          <Ionicons
                              name="person"
                              size={22}
                              color="#fff"
                          />
                      </View>


                      <View>
                          <Text style={styles.prayerUserName}>
                              Grace D.
                          </Text>

                          <Text style={styles.prayerTime}>
                              2 days ago
                          </Text>
                      </View>

                  </View>

                  <Text style={styles.prayerText}>
                      "Please pray for my family and for God's guidance in
                      the decisions we are making."
                  </Text>

                  <View style={styles.prayerCountRow}>

                      <FontAwesome5 name="praying-hands" size={18} color={COLORS.primary} />

                      <Text style={styles.prayerCountText}>
                           18 people prayed
                      </Text>

                  </View>

              </Pressable>

          </View>

          <ImageBackground
              source={require("../../assets/images/icon.png")}
              style={styles.joinCommunitySection}
              imageStyle={styles.joinCommunityBackground}
          >
              <View style={styles.joinCommunityOverlay}>

                  <Text style={styles.joinCommunityTitle}>
                      Join Our Prayer Community
                  </Text>

                  <Text style={styles.joinCommunityDescription}>
                      Connect with believers, share prayer requests, pray for
                      others and grow together in faith.
                  </Text>

                  <Pressable style={styles.joinCommunityButton}>
                      <Text style={styles.joinCommunityButtonText}>
                          Join Community
                      </Text>
                  </Pressable>

                  <View style={styles.signInRow}>
                      <Text style={styles.alreadyAccountText}>
                          Already have an account?
                      </Text>

                      <Pressable onPress={() => router.push("/(auth)/login")}>
                          <Text style={styles.signInText}>
                              Sign In
                          </Text>
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
        backgroundColor: "#fff",
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
        marginLeft:10,
        width: 40,
        height: 40,
        resizeMode: "contain",
    },

    logoText: {
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 8,
        color:COLORS.primary,
    },

    welcomeSection: {
        flexDirection: "row",
        alignItems: "center",
        // marginTop: 5,
    },

    welcomeTextContainer: {
        flex: 1,
        paddingRight: 20,
        paddingLeft:30,
    },

    welcomeTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "black",
    },
    subtitle: {
      fontSize: 20,
      color: COLORS.primary,
      fontWeight: "700",
    },

    welcomeDescription: {
        fontSize: 14,
        lineHeight: 20,
        marginTop: 8,
        color: "#646262",
        fontWeight:40,
    },

    welcomeImageContainer: {
        width: 180,
        height: 180,
        borderTopLeftRadius: 90,
        borderBottomLeftRadius: 90,
        overflow: "hidden", 
    },

    welcomeImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
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

    view:{
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
        marginTop: 15,
    },

    faithItem: {
        width: "30%",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        paddingHorizontal:5,
        paddingVertical:20,
        

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        // Android
        elevation: 3,
    },

    faithDescription: {
      fontSize: 14,
      color: "#444",
      marginTop:5,
      //  alignItems: "center",
    },

    faithSubDescription:{
      fontSize: 14,
       alignItems: "center",
    },

    faithIcon: {
        width: 65,
        height: 65,
        borderRadius: 100,
        backgroundColor: "#F3F0F8",
        alignItems: "center",
        justifyContent: "center",
    },

    faithText: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: "600",
        color: "#444",
    },

    dailyInspirationSection: {
        marginHorizontal: 20,
        marginTop: 30,
    },

    inspirationCards: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },

    inspirationCard: {
        width: "47%",
        backgroundColor: "#fff",
        borderRadius: 15,
        overflow: "hidden",

        elevation: 3,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.12,
        shadowRadius: 5,
    },

    inspirationImage: {
        width: "100%",
        height: 130,
        resizeMode: "cover",
    },

    inspirationIcon: {
      position: "absolute",
      top: 112,
      left: 12,

      width: 36,
      height: 36,
      borderRadius: 18,

      backgroundColor: "#fff",

      alignItems: "center",
      justifyContent: "center",

      elevation: 4,

      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 4,
  },

    inspirationTextContainer: {
        paddingHorizontal: 15,
        paddingTop: 28,
        paddingBottom: 15,
    },

    inspirationText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#333",
    },

    inspirationSubText: {
        marginTop: 8,
        fontSize: 13,
        lineHeight: 19,
        color: "#666",
    },

    prayerCommunitySection: {
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 30,
    },

    prayerCard: {
        marginTop: 15,
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,

        // Android
        elevation: 3,

        // iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.12,
        shadowRadius: 5,
    },

    prayerUserRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    profileIcon: {
        width: 42,
        height: 42,

        // This makes it completely round
        borderRadius: 99,

        backgroundColor: COLORS.secondary,

        justifyContent: "center",
        alignItems: "center",

        marginRight: 10,
    },

    prayerUserName: {
        fontSize: 15,
        fontWeight: "700",
        color: "#333",
    },

    prayerTime: {
        fontSize: 12,
        color: "#888",
        marginTop: 2,
    },

    prayerText: {
        marginTop: 15,
        fontSize: 14,
        lineHeight: 21,
        color: "#444",
    },

    prayerCountRow: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginTop: 15,
    },

    prayerCountText: {
        marginLeft: 7,
        fontSize: 13,
        color: "#666",
    },

    joinCommunitySection: {
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 30,

        borderRadius: 20,
        overflow: "hidden",
    },

    joinCommunityBackground: {
        opacity: 0.12,
        resizeMode: "cover",
    },

    joinCommunityOverlay: {
        paddingHorizontal: 25,
        paddingVertical: 30,
        alignItems: "center",

    
    },

    joinCommunityTitle: {
        fontSize: 21,
        fontWeight: "700",
        color: COLORS.primary,
        textAlign: "center",
    },

    joinCommunityDescription: {
        marginTop: 12,
        fontSize: 14,
        lineHeight: 21,
        color: "#555",
        textAlign: "center",
    },

    joinCommunityButton: {
        marginTop: 22,

        width: "50%",
        paddingVertical: 13,

        backgroundColor: COLORS.primary,
        borderRadius: 10,

        alignItems: "center",
    },

    joinCommunityButtonText: {
      
        fontSize: 15,
        fontWeight: "700",
        color: "#fff",
    },

    signInRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 18,
    },

    alreadyAccountText: {
        fontSize: 13,
        color:COLORS.secondary,
    },

    signInText: {
        marginLeft: 5,
        fontSize: 13,
        fontWeight: "700",
        color: COLORS.secondary,
    },
})