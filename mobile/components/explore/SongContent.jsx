import {
    EvilIcons,
    Feather,
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons";
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
        source={require("../../assets/images/song.jpg")}
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
                  <Text style={styles.readText}>English</Text>

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

        <Pressable style={styles.blogCard}>
          <View style={styles.blogContent}>
            <View style={styles.blogImageContainer}>
              <Image
                source={require("../../assets/images/blogs.jpg")}
                style={styles.blogImage}
              />
            </View>

            <View style={styles.blogDetails}>
              <View style={styles.blogTopRow}>
                <Text style={styles.blogTitle}>
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

              <View style={styles.blogAuthorRow}>
                <Ionicons
                  name="person-circle-outline"
                  size={19}
                  color={COLORS.primary}
                />

                <Text style={styles.blogAuthor}>By Willam</Text>

                <View style={styles.divider} />
                <Pressable style={styles.like}>
                  <EvilIcons name="like" size={19} color={COLORS.primary} />
                  <Text style={styles.blogDate}>Likes</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Pressable>
        <Pressable style={styles.blogCard}>
          <View style={styles.blogContent}>
            <View style={styles.blogImageContainer}>
              <Image
                source={require("../../assets/images/blogs.jpg")}
                style={styles.blogImage}
              />
            </View>

            <View style={styles.blogDetails}>
              <View style={styles.blogTopRow}>
                <Text style={styles.blogTitle}>
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

              <View style={styles.blogAuthorRow}>
                <Ionicons
                  name="person-circle-outline"
                  size={19}
                  color={COLORS.primary}
                />

                <Text style={styles.blogAuthor}>By Willam</Text>

                <View style={styles.divider} />
                <Pressable style={styles.like}>
                  <EvilIcons name="like" size={19} color={COLORS.primary} />
                  <Text style={styles.blogDate}>Likes</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Pressable>
        <Pressable style={styles.blogCard}>
          <View style={styles.blogContent}>
            <View style={styles.blogImageContainer}>
              <Image
                source={require("../../assets/images/blogs.jpg")}
                style={styles.blogImage}
              />
            </View>

            <View style={styles.blogDetails}>
              <View style={styles.blogTopRow}>
                <Text style={styles.blogTitle}>
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

              <View style={styles.blogAuthorRow}>
                <Ionicons
                  name="person-circle-outline"
                  size={19}
                  color={COLORS.primary}
                />

                <Text style={styles.blogAuthor}>By Willam</Text>

                <View style={styles.divider} />
                <Pressable style={styles.like}>
                  <EvilIcons name="like" size={19} color={COLORS.primary} />
                  <Text style={styles.blogDate}>Likes</Text>
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
    backgroundColor: "#f9f7fb",
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

  like: {
    flexDirection: "row",
    alignItems: "center",
  },

  viewAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.secondary,
  },

  blogCard: {
    marginTop: 14,
    backgroundColor: "#f9f7fb",
    borderRadius: 16,
    padding: 12,

    elevation: 3,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowColor: "#000",
  },

  blogContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  blogImageContainer: {
    width: 75,
    height: 75,
    borderRadius: 12,
    overflow: "hidden",
  },

  blogImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  blogDetails: {
    flex: 1,
    marginLeft: 12,
  },

  blogTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  smallCategoryBadge: {
    backgroundColor: "#F4E0E0",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 15,
  },

  smallCategoryText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#C45A5A",
  },

  saveButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  blogTitle: {
    marginTop: 7,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: "#222",
  },

  blogDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: "#666",
    marginBottom: 10,
  },

  blogAuthorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  blogAuthor: {
    marginLeft: 4,
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "500",
  },

  divider: {
    width: 1,
    height: 14,
    backgroundColor: "#ccc",
    marginHorizontal: 8,
  },

  blogDate: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: "500",
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginVertical: 10,
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
