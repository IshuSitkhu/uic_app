import {
  EvilIcons,
  Ionicons,
  MaterialIcons
} from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";

const SongList = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.screen,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: insets.bottom + 35,
          },
        ]}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color="#222" />
          </TouchableOpacity>

          <Text style={styles.title}>Hymn/Chorus</Text>

          <View style={styles.headerPlaceholder} />
        </View>
        <Text style={styles.featuredDescription}>2 Songs</Text>

        <ImageBackground
          source={require("../../assets/images/quoteCard.jpeg")}
          style={styles.quoteContainer}
          imageStyle={styles.quoteImage}
        >
          <View style={styles.Content}>
            <View style={styles.textContainer}>
              <Text style={styles.quoteText}>
                Timeless hymns of faith, {"\n"}
                hope and devotion.
              </Text>

              <Text style={styles.reference}>
                Lift your heart through timeless {"\n"}
                songs of worship and devotion.
              </Text>
            </View>

            <View style={styles.iconContainer}>
              <Ionicons
                name="musical-notes-outline"
                size={60}
                color={COLORS.primary}
              />
            </View>
          </View>
        </ImageBackground>

        <View style={styles.blogSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Song Lists</Text>

            <Pressable style={styles.langugagebutton}>
              <AntDesign name="global" size={17} color="#fff" />
              <Text style={styles.languageText}>EN</Text>
            </Pressable>
          </View>
          <Pressable
            style={styles.prayerCard}
            onPress={() => router.push("/full-song")}
          >
            <View style={styles.prayerContent}>
              <View style={styles.prayerImageContainer}>
                <Image
                  source={require("../../assets/images/popularSongs2.jpg")}
                  style={styles.prayerImage}
                />
              </View>

              <View style={styles.prayerDetails}>
                <View style={styles.prayerTopRow}>
                  <Text style={styles.prayerTitle} numberOfLines={2}>
                    These are the days of Elijah
                  </Text>

                  <Pressable style={styles.saveButton}>
                    <Ionicons
                      name="heart-outline"
                      size={18}
                      color={COLORS.primary}
                    />
                  </Pressable>
                </View>

                <View style={styles.prayerAuthorRow}>
                  <Ionicons
                    name="person-circle-outline"
                    size={19}
                    color={COLORS.primary}
                  />

                  <Text style={styles.prayerAuthor}>By Willam</Text>

                  <View style={styles.divider} />

                  <Pressable style={styles.like}>
                    <EvilIcons name="like" size={19} color={COLORS.primary} />

                    <Text style={styles.likes}>Likes</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Pressable>
          <Pressable
            style={styles.prayerCard}
            onPress={() => router.push("/full-song")}
          >
            <View style={styles.prayerContent}>
              <View style={styles.prayerImageContainer}>
                <Image
                  source={require("../../assets/images/popularSongs2.jpg")}
                  style={styles.prayerImage}
                />
              </View>

              <View style={styles.prayerDetails}>
                <View style={styles.prayerTopRow}>
                  <Text style={styles.prayerTitle} numberOfLines={2}>
                    These are the days of Elijah
                  </Text>

                  <Pressable style={styles.saveButton}>
                    <Ionicons
                      name="heart-outline"
                      size={18}
                      color={COLORS.primary}
                    />
                  </Pressable>
                </View>

                <View style={styles.prayerAuthorRow}>
                  <Ionicons
                    name="person-circle-outline"
                    size={19}
                    color={COLORS.primary}
                  />

                  <Text style={styles.prayerAuthor}>By Willam</Text>

                  <View style={styles.divider} />

                  <Pressable style={styles.like}>
                    <EvilIcons name="like" size={19} color={COLORS.primary} />

                    <Text style={styles.likes}>Likes</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Pressable>
          <Pressable
            style={styles.prayerCard}
            onPress={() => router.push("/full-song")}
          >
            <View style={styles.prayerContent}>
              <View style={styles.prayerImageContainer}>
                <Image
                  source={require("../../assets/images/popularSongs2.jpg")}
                  style={styles.prayerImage}
                />
              </View>

              <View style={styles.prayerDetails}>
                <View style={styles.prayerTopRow}>
                  <Text style={styles.prayerTitle} numberOfLines={2}>
                    These are the days of Elijah
                  </Text>

                  <Pressable style={styles.saveButton}>
                    <Ionicons
                      name="heart-outline"
                      size={18}
                      color={COLORS.primary}
                    />
                  </Pressable>
                </View>

                <View style={styles.prayerAuthorRow}>
                  <Ionicons
                    name="person-circle-outline"
                    size={19}
                    color={COLORS.primary}
                  />

                  <Text style={styles.prayerAuthor}>By Willam</Text>

                  <View style={styles.divider} />

                  <Pressable style={styles.like}>
                    <EvilIcons name="like" size={19} color={COLORS.primary} />

                    <Text style={styles.likes}>Likes</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Pressable>
        </View>

        <View style={styles.blogSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recently Added Lyrics</Text>

            <Pressable style={styles.viewAll}>
              <Text style={styles.viewAllText}>View All</Text>

              <MaterialIcons
                name="navigate-next"
                size={18}
                color={COLORS.secondary}
              />
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalCards}
          >
            <Pressable style={styles.recentCard}>
              <Image
                source={require("../../assets/images/popularSongs.jpg")}
                style={styles.recentImage}
              />
              <View style={styles.inspirationTextContainer}>
                <View style={styles.popularDetails}>
                  <Text style={styles.recentTitle} numberOfLines={1}>
                    Jirey
                  </Text>

                  <View style={styles.recentLyricsAuthorRow}>
                    <Ionicons
                      name="person-circle-outline"
                      size={19}
                      color={COLORS.primary}
                    />

                    <Text style={styles.recentLyricsAuthor}>
                      By Laurie Kliein
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
            <Pressable style={styles.recentCard}>
              <Image
                source={require("../../assets/images/popularSongs.jpg")}
                style={styles.recentImage}
              />
              <View style={styles.inspirationTextContainer}>
                <View style={styles.popularDetails}>
                  <Text style={styles.recentTitle} numberOfLines={1}>
                    Jirey
                  </Text>

                  <View style={styles.recentLyricsAuthorRow}>
                    <Ionicons
                      name="person-circle-outline"
                      size={19}
                      color={COLORS.primary}
                    />

                    <Text style={styles.recentLyricsAuthor}>
                      By Laurie Kliein
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
            <Pressable style={styles.recentCard}>
              <Image
                source={require("../../assets/images/popularSongs.jpg")}
                style={styles.recentImage}
              />
              <View style={styles.inspirationTextContainer}>
                <View style={styles.popularDetails}>
                  <Text style={styles.recentTitle} numberOfLines={1}>
                    Jirey
                  </Text>

                  <View style={styles.recentLyricsAuthorRow}>
                    <Ionicons
                      name="person-circle-outline"
                      size={19}
                      color={COLORS.primary}
                    />

                    <Text style={styles.recentLyricsAuthor}>
                      By Laurie Kliein
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default SongList;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F9F7FB",
  },

  content: {
    paddingHorizontal: 18,
  },

  header: {
    height: 56,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

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

  title: {
    fontSize: 21,
    fontWeight: "700",
    color: "#1D1D1F",
  },

  headerPlaceholder: {
    width: 42,
  },
  categoryTitle: {
    marginTop: 18,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
  },

  featuredDescription: {
    textAlign: "center",

    fontSize: 12,

    fontWeight: "600",
  },

  quoteContainer: {
    marginTop: 18,
    width: "100%",

    overflow: "hidden",
    // backgroundColor: "#EDE8F7",
    borderRadius: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,

    elevation: 3,
  },

  quoteImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  Content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 20,
    paddingVertical: 18,
  },

  textContainer: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 12,
  },

  quoteText: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 8,
  },

  reference: {
    fontSize: 12,
    lineHeight: 18,
    color: "#555",
  },

  iconContainer: {
    width: 80,
    height: 80,

    alignItems: "center",
    justifyContent: "center",

    marginLeft: 8,
  },

  blogSection: {
    marginTop: 28,
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

  langugagebutton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    gap: 8,
    padding: 8,
    borderRadius: 8,
  },

  languageText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
  },

  viewAll: {
    flexDirection: "row",
    alignItems: "center",
  },

  viewAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.secondary,
  },

  prayerCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    // marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 12,
    padding: 12,
  },

  prayerContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  prayerImageContainer: {
    width: 82,
    height: 82,
    borderRadius: 14,
    overflow: "hidden",
  },

  prayerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  prayerDetails: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
    minWidth: 0,
  },

  prayerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  prayerTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    marginRight: 10,
  },

  saveButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  prayerAuthorRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  prayerAuthor: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
    color: COLORS.primary,
  },

  divider: {
    width: 1,
    height: 16,
    backgroundColor: "#ddd",
    marginHorizontal: 10,
  },

  like: {
    flexDirection: "row",
    alignItems: "center",
    color: COLORS.primary,
  },

  likes: {
    fontSize: 12,
    color: "#666",
    marginLeft: 3,
    color: COLORS.primary,
  },

  popularDetails: {
    flex: 1,
    justifyContent: "space-between",
  },

  popularTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    // marginBottom:5,
  },

  smallCategoryBadge: {
    backgroundColor: "#e0e1f4",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },

  smallCategoryText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#685ac4",
  },

  prayerAuthorRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  divider: {
    width: 1,
    height: 14,

    backgroundColor: "#D0CCD6",

    marginHorizontal: 9,
  },

  //popular
  horizontalCards: {
    // paddingHorizontal: 16,
    marginTop: 10,
    gap: 12,
  },

  recentCard: {
    width: 180,
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
  },

  recentImage: {
    width: "100%",
    height: 115,
    resizeMode: "cover",
  },

  inspirationTextContainer: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
  },

  recentTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    marginBottom: 6,
  },

  recentLyricsAuthorRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  recentLyricsAuthor: {
    flex: 1,
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
});
