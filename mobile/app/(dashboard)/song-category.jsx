import {
  EvilIcons,
  Ionicons,
  MaterialIcons
} from "@expo/vector-icons";
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

const SongCategory = () => {
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

          <Text style={styles.title}>Song Category</Text>

          <View style={styles.headerPlaceholder} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.categoryTitle}>CHOOSE A CATEGORY</Text>
        </View>

        <View style={styles.inspirationCards}>
          <Pressable
            style={({ pressed }) => [
              styles.inspirationCard,
              pressed && styles.cardPressed,
            ]}
            onPress={() => router.push("/song-list")}
          >
            <ImageBackground
              source={require("../../assets/images/popularSongs.jpg")}
              style={styles.inspirationImage}
              imageStyle={styles.inspirationImageStyle}
            >
              <View style={styles.cardOverlay} />

              <View style={styles.cardContent}>
                <View style={styles.inspirationIcon}>
                  <Ionicons
                    name="musical-notes-outline"
                    size={25}
                    color={COLORS.primary}
                  />
                </View>

                <Text style={styles.featuredTitle}>
                  HYMN/
                  {"\n"}
                  CHORUS
                </Text>

                <Text style={styles.featuredDescription}>2 Songs</Text>
              </View>
            </ImageBackground>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.inspirationCard,
              pressed && styles.cardPressed,
            ]}
          >
            <ImageBackground
              source={require("../../assets/images/popularSongs2.jpg")}
              style={styles.inspirationImage}
              imageStyle={styles.inspirationImageStyle}
            >
              <View style={styles.cardOverlay} />

              <View style={styles.cardContent}>
                <View style={styles.inspirationIcon}>
                  <Ionicons
                    name="musical-notes-outline"
                    size={25}
                    color={COLORS.primary}
                  />
                </View>

                <Text style={styles.featuredTitle}>OTHERS</Text>

                <Text style={styles.featuredDescription}>2 Songs</Text>
              </View>
            </ImageBackground>
          </Pressable>
        </View>

        <View style={styles.blogSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Songs</Text>

            <Pressable style={styles.viewAll}>
              <Text style={styles.viewAllText}>View All</Text>

              <MaterialIcons
                name="navigate-next"
                size={18}
                color={COLORS.secondary}
              />
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

        <View style={styles.popularSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Songs</Text>

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
            <Pressable style={styles.popularCard}>
              <Image
                source={require("../../assets/images/popularSongs.jpg")}
                style={styles.popularImage}
              />

              <View style={styles.inspirationTextContainer}>
                <View style={styles.popularDetails}>
                  {/* Category + Save */}
                  <View style={styles.popularTopRow}>
                    <View style={styles.smallCategoryBadge}>
                      <Text style={styles.smallCategoryText}>Worship</Text>
                    </View>

                    <Pressable style={styles.save} hitSlop={8}>
                      <Ionicons
                        name="heart-outline"
                        size={18}
                        color={COLORS.primary}
                      />
                    </Pressable>
                  </View>

                  {/* Title */}
                  <Text style={styles.prayerTitle} numberOfLines={1}>
                    These are the days of Elijah
                  </Text>

                  {/* Author + Likes */}
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

            {/* Second card */}
            <Pressable style={styles.popularCard}>
              <Image
                source={require("../../assets/images/popularSongs.jpg")}
                style={styles.popularImage}
              />

              <View style={styles.inspirationTextContainer}>
                <View style={styles.popularDetails}>
                  <View style={styles.popularTopRow}>
                    <View style={styles.smallCategoryBadge}>
                      <Text style={styles.smallCategoryText}>Worship</Text>
                    </View>

                    <Pressable style={styles.save} hitSlop={8}>
                      <Ionicons
                        name="heart-outline"
                        size={18}
                        color={COLORS.primary}
                      />
                    </Pressable>
                  </View>

                  <Text style={styles.prayerTitle} numberOfLines={1}>
                    These are the days of Elijah
                  </Text>

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
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default SongCategory;

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

  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,

    color: COLORS.secondary,
  },

  inspirationCards: {
    flexDirection: "row",

    gap: 12,

    marginTop: 14,
  },

  inspirationCard: {
    flex: 1,

    height: 205,

    borderRadius: 18,

    overflow: "hidden",

    backgroundColor: COLORS.primary,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,

    elevation: 4,
  },

  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },

  inspirationImage: {
    width: "100%",
    height: "100%",
  },

  inspirationImageStyle: {
    resizeMode: "cover",
  },

  cardOverlay: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: "rgba(40, 25, 70, 0.32)",
  },

  cardContent: {
    flex: 1,

    padding: 15,

    justifyContent: "flex-end",
  },

  inspirationIcon: {
    position: "absolute",

    top: 15,
    left: 15,

    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: "#fff",

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },

  featuredTitle: {
    fontSize: 19,
    lineHeight: 22,

    fontWeight: "800",

    color: "#FFFFFF",

    letterSpacing: 0.3,
  },

  featuredDescription: {
    marginTop: 5,

    fontSize: 12,

    fontWeight: "600",

    color: "rgba(255,255,255,0.82)",
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

  popularSection: {
    marginTop: 10,
  },

  //popular
  horizontalCards: {
    // paddingHorizontal: 16,
    marginTop: 10,
    gap: 12,
  },

  popularCard: {
    width: 245,
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
  },

  popularImage: {
    width: "100%",
    height: 135,
    resizeMode: "cover",
  },

  inspirationTextContainer: {
    paddingHorizontal: 12,
    paddingVertical: 11,
  },

  popularDetails: {
    width: "100%",
  },

  popularTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 7,
  },

  smallCategoryBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#F0ECF7",
  },

  smallCategoryText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.primary,
  },

  save: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  prayerTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    marginBottom: 7,
  },

  prayerAuthorRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  prayerAuthor: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },

  divider: {
    width: 1,
    height: 15,
    backgroundColor: "#DDD",
    marginHorizontal: 9,
  },

  like: {
    flexDirection: "row",
    alignItems: "center",
  },

  likes: {
    fontSize: 12,
    color: "#666",
    marginLeft: 2,
  },
});
