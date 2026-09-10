import {
  EvilIcons,
  Feather,
  Ionicons,
  MaterialIcons,
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
import { COLORS } from "../../constants/colors";

const SongContent = () => {
  return (
    <View>
      <ImageBackground
        source={require("../../assets/images/popularSongs4.jpg")}
        style={styles.featuredBlog}
        imageStyle={styles.featuredBlogImage}
      >
        <View style={styles.featuredOverlay}>
          <Text style={styles.featuredTitle}>
            Let Every Song{"\n"}Become a Prayer
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.songScrollSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Worship in Your Language</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 18,
            paddingRight: 18,
          }}
          style={{ marginTop: 14 }}
        >
          <Pressable onPress={() => router.push("/song-category")}>
            <ImageBackground
              source={require("../../assets/images/popularSongs3.jpg")}
              style={styles.songlist}
              imageStyle={styles.songImage}
            >
              <View style={styles.songOverlay}>
                <View style={styles.faithIcon}>
                  <Ionicons
                    name="musical-notes-outline"
                    size={28}
                    color="#fff"
                  />
                </View>

                <Pressable style={styles.readBadge}>
                  <View>
                    <Text style={styles.readText}>English</Text>

                    <Text style={styles.readSubText}>Praise & Worship</Text>
                  </View>

                  <TouchableOpacity style={styles.nextButton}>
                    <Feather name="arrow-right" size={24} color="#fff" />
                  </TouchableOpacity>
                </Pressable>
              </View>
            </ImageBackground>
          </Pressable>

          <ImageBackground
            source={require("../../assets/images/popularSongs3.jpg")}
            style={styles.songlist}
            imageStyle={styles.songImage}
          >
            <View style={styles.songOverlay}>
              <View style={styles.faithIcon}>
                <Ionicons name="musical-notes-outline" size={28} color="#fff" />
              </View>

              <Pressable style={styles.readBadge}>
                <View>
                  <Text style={styles.readText}>Nepali</Text>

                  <Text style={styles.readSubText}>Praise & Worship</Text>
                </View>

                <TouchableOpacity style={styles.nextButton}>
                  <Feather name="arrow-right" size={24} color="#fff" />
                </TouchableOpacity>
              </Pressable>
            </View>
          </ImageBackground>

          <ImageBackground
            source={require("../../assets/images/song.jpg")}
            style={styles.songlist}
            imageStyle={styles.songImage}
          >
            <View style={styles.songOverlay}>
              <View style={styles.faithIcon}>
                <Ionicons name="musical-notes-outline" size={28} color="#fff" />
              </View>

              <Pressable style={styles.readBadge}>
                <View>
                  <Text style={styles.readText}>Hindi</Text>

                  <Text style={styles.readSubText}>Praise & Worship</Text>
                </View>

                <TouchableOpacity style={styles.nextButton}>
                  <Feather name="arrow-right" size={24} color="#fff" />
                </TouchableOpacity>
              </Pressable>
            </View>
          </ImageBackground>
        </ScrollView>
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
    </View>
  );
};

export default SongContent;

const styles = StyleSheet.create({
  songlist: {
    width: 220,
    borderRadius: 15,
    overflow: "hidden",

    elevation: 4,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 20,
  },

  songImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    // opacity: 0.8,
  },

  songOverlay: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 18,
    gap: 60,
    backgroundColor: "rgba(40, 25, 70, 0.32)",

    // justifyContent: "flex-end",
  },

  faithIcon: {
    width: 45,
    height: 45,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    padding: 5,
  },

  featuredBlog: {
    width: "100%",
    minHeight: 230,
    borderRadius: 20,
    overflow: "hidden",
  },

  featuredBlogImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    // opacity: 0.8,
  },

  featuredOverlay: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 18,
    justifyContent: "flex-end",
  },

  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 8,
  },

  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },

  readBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F9F7FB",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 40,
  },

  readFullBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 5,
  },

  readFullText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },

  readText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 2,
  },

  readSubText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#777",
  },

  featuredTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
    color: "#fff",
  },

  featuredDescription: {
    marginTop: 7,
    fontSize: 13,
    lineHeight: 19,
    color: "#fff",
  },

  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  profileIcon: {
    width: 38,
    height: 38,
    borderRadius: 50,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 9,
  },

  authorName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },

  authorDate: {
    marginTop: 2,
    fontSize: 11,
    color: "#eee",
  },

  songScrollSection: {
    marginTop: 28,
  },

  blogSection: {
    marginTop: 28,
    marginBottom: 30,
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

  nextButton: {
    width: 32,
    height: 32,
    borderRadius: 21,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
