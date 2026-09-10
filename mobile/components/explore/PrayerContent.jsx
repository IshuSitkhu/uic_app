import {
  EvilIcons,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS } from "../../constants/colors";

const PrayerContent = () => {
  return (
    <View>
      <ImageBackground
        source={require("../../assets/images/pray.jpg")}
        style={styles.featuredBlog}
        imageStyle={styles.featuredBlogImage}
      >
        <View style={styles.featuredOverlay}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>PRAYER OF THE DAY</Text>
          </View>

          <Text style={styles.featuredTitle}>Finding Peace in{"\n"}God</Text>

          <Text style={styles.featuredDescription}>
            Rest your heart in His presence{"\n"}
            and trust Him in today.
          </Text>

          <Pressable style={styles.readBadge}>
            <Text style={styles.readText}>Read Prayer</Text>

            <Feather name="arrow-right" size={18} color={COLORS.primary} />
          </Pressable>
        </View>
      </ImageBackground>

      <View style={styles.blogSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Our Prayers</Text>

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
          style={styles.blogCard}
          onPress={() => router.push("/prayer-detail")}
        >
          <View style={styles.blogContent}>
            <View style={styles.blogDetails}>
              <View style={styles.blogTopRow}>
                <View style={styles.smallCategoryBadge}>
                  <Ionicons
                    name="pricetag-outline"
                    size={14}
                    color={COLORS.primary}
                  />
                  <Text style={styles.blogDate}>Motivation</Text>
                </View>

                <View style={styles.dateContainer}>
                  <EvilIcons name="calendar" size={20} color={COLORS.primary} />

                  <Text style={styles.blogDate}>Aug 10, 2025</Text>
                </View>

                <Pressable style={styles.saveButton}>
                  <Feather name="bookmark" size={14} color={COLORS.primary} />
                  <Text style={styles.blogDate}>Save</Text>
                </Pressable>
              </View>

              <View style={{ paddingHorizontal: 12 }}>
                <Text style={styles.blogTitle} numberOfLines={2}>
                  Pray for World Due to War
                </Text>

                <Text style={styles.blogDescription} numberOfLines={2}>
                  Lord guide my heart and steps today. Give me peace and
                  strength.
                </Text>

                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginVertical: 10,
                  }}
                >
                  <View style={styles.blogAuthorRow}>
                    <Ionicons
                      name="person-circle-outline"
                      size={32}
                      color={COLORS.primary}
                    />

                    <Text style={styles.blogAuthor}>By Willam</Text>
                  </View>

                  <Pressable style={styles.readFullBadge}>
                    <Text style={styles.readFullText}>Read Full Prayer</Text>

                    <Feather name="arrow-right" size={18} color="#fff" />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
        <Pressable
          style={styles.blogCard}
          onPress={() => router.push("/prayer-detail")}
        >
          <View style={styles.blogContent}>
            <View style={styles.blogDetails}>
              <View style={styles.blogTopRow}>
                <View style={styles.smallCategoryBadge}>
                  <Ionicons
                    name="pricetag-outline"
                    size={14}
                    color={COLORS.primary}
                  />
                  <Text style={styles.blogDate}>Motivation</Text>
                </View>

                <View style={styles.dateContainer}>
                  <EvilIcons name="calendar" size={20} color={COLORS.primary} />

                  <Text style={styles.blogDate}>Aug 10, 2025</Text>
                </View>

                <Pressable style={styles.saveButton}>
                  <Feather name="bookmark" size={14} color={COLORS.primary} />
                  <Text style={styles.blogDate}>Save</Text>
                </Pressable>
              </View>

              <View style={{ paddingHorizontal: 12 }}>
                <Text style={styles.blogTitle} numberOfLines={2}>
                  Pray for World Due to War
                </Text>

                <Text style={styles.blogDescription} numberOfLines={2}>
                  Lord guide my heart and steps today. Give me peace and
                  strength.
                </Text>

                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginVertical: 10,
                  }}
                >
                  <View style={styles.blogAuthorRow}>
                    <Ionicons
                      name="person-circle-outline"
                      size={32}
                      color={COLORS.primary}
                    />

                    <Text style={styles.blogAuthor}>By Willam</Text>
                  </View>

                  <Pressable style={styles.readFullBadge}>
                    <Text style={styles.readFullText}>Read Full Prayer</Text>

                    <Feather name="arrow-right" size={18} color="#fff" />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
        <Pressable
          style={styles.blogCard}
          onPress={() => router.push("/prayer-detail")}
        >
          <View style={styles.blogContent}>
            <View style={styles.blogDetails}>
              <View style={styles.blogTopRow}>
                <View style={styles.smallCategoryBadge}>
                  <Ionicons
                    name="pricetag-outline"
                    size={14}
                    color={COLORS.primary}
                  />
                  <Text style={styles.blogDate}>Motivation</Text>
                </View>

                <View style={styles.dateContainer}>
                  <EvilIcons name="calendar" size={20} color={COLORS.primary} />

                  <Text style={styles.blogDate}>Aug 10, 2025</Text>
                </View>

                <Pressable style={styles.saveButton}>
                  <Feather name="bookmark" size={14} color={COLORS.primary} />
                  <Text style={styles.blogDate}>Save</Text>
                </Pressable>
              </View>

              <View style={{ paddingHorizontal: 12 }}>
                <Text style={styles.blogTitle} numberOfLines={2}>
                  Pray for World Due to War
                </Text>

                <Text style={styles.blogDescription} numberOfLines={2}>
                  Lord guide my heart and steps today. Give me peace and
                  strength.
                </Text>

                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginVertical: 10,
                  }}
                >
                  <View style={styles.blogAuthorRow}>
                    <Ionicons
                      name="person-circle-outline"
                      size={32}
                      color={COLORS.primary}
                    />

                    <Text style={styles.blogAuthor}>By Willam</Text>
                  </View>

                  <Pressable style={styles.readFullBadge}>
                    <Text style={styles.readFullText}>Read Full Prayer</Text>

                    <Feather name="arrow-right" size={18} color="#fff" />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
        <Pressable
          style={styles.blogCard}
          onPress={() => router.push("/prayer-detail")}
        >
          <View style={styles.blogContent}>
            <View style={styles.blogDetails}>
              <View style={styles.blogTopRow}>
                <View style={styles.smallCategoryBadge}>
                  <Ionicons
                    name="pricetag-outline"
                    size={14}
                    color={COLORS.primary}
                  />
                  <Text style={styles.blogDate}>Motivation</Text>
                </View>

                <View style={styles.dateContainer}>
                  <EvilIcons name="calendar" size={20} color={COLORS.primary} />

                  <Text style={styles.blogDate}>Aug 10, 2025</Text>
                </View>

                <Pressable style={styles.saveButton}>
                  <Feather name="bookmark" size={14} color={COLORS.primary} />
                  <Text style={styles.blogDate}>Save</Text>
                </Pressable>
              </View>

              <View style={{ paddingHorizontal: 12 }}>
                <Text style={styles.blogTitle} numberOfLines={2}>
                  Pray for World Due to War
                </Text>

                <Text style={styles.blogDescription} numberOfLines={2}>
                  Lord guide my heart and steps today. Give me peace and
                  strength.
                </Text>

                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginVertical: 10,
                  }}
                >
                  <View style={styles.blogAuthorRow}>
                    <Ionicons
                      name="person-circle-outline"
                      size={32}
                      color={COLORS.primary}
                    />

                    <Text style={styles.blogAuthor}>By Willam</Text>
                  </View>

                  <Pressable style={styles.readFullBadge}>
                    <Text style={styles.readFullText}>Read Full Prayer</Text>

                    <Feather name="arrow-right" size={18} color="#fff" />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default PrayerContent;

const styles = StyleSheet.create({
  featuredBlog: {
    width: "100%",
    minHeight: 230,
    borderRadius: 20,
    overflow: "hidden",
  },

  featuredBlogImage: {
    resizeMode: "cover",
    // opacity: 0.8,
  },

  featuredOverlay: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 28,
    justifyContent: "flex-end",
    ...StyleSheet.absoluteFillObject,

    backgroundColor: "rgba(40, 25, 70, 0.32)",
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
    gap: 5,
  },

  readFullBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",

    gap: 5,
  },

  readFullText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },

  readText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.primary,
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

  blogSection: {
    marginTop: 28,
    // marginBottom: 30,
    gap: 20,
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

  blogCard: {
    backgroundColor: "#F9F7FB",
    borderRadius: 16,

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
    width: 105,
    height: 145,
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
    // marginLeft: 12,
  },

  blogTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EDE8F7",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  smallCategoryBadge: {
    flexDirection: "row",
    gap: 6,
  },

  smallCategoryText: {
    fontSize: 12,
    fontWeight: "600",
    // color: "#C45A5A",
  },

  saveButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },

  blogTitle: {
    marginVertical: 7,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    color: "#222",
  },

  blogDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: "#666",
    // marginBottom: 10,
  },

  blogAuthorRow: {
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: 12,
    // color: COLORS.primary,
    fontWeight: "500",
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginVertical: 10,
  },
});
