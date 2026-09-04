import { EvilIcons, Fontisto, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    ImageBackground,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS } from "../../constants/colors";

const BlogDetail = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // const fetchBlogId = async () => {
  //     try {
  //         const response = await fetch(`${API_URL}/blogs/{id}`, {
  //             headers: {
  //                 Accept: "application/json",
  //             },
  //         });

  //         const data = await response.json();

  //         console.log("BLOG RESPONSE:", data);

  //         if (!response.ok) {
  //             throw new Error(data.message || "Failed to fetch blogs");
  //         }

  //         setBlogs(data.blogs?.data || []);
  //     } catch (error) {
  //         console.error("Error fetching blogs:", error.message);
  //     } finally {
  //         setLoading(false);
  //     }
  // };

  // useEffect(() => {
  //     fetchBlogId();
  // }, []);
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f7fb" }}>
        <View style={styles.screen}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
          >
            <View style={styles.header}>
              <ImageBackground
                source={require("../../assets/images/blogs.jpg")}
                style={styles.featuredBlog}
                imageStyle={styles.featuredBlogImage}
              >
                <View style={styles.arrowTop}>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="arrow-back" size={23} color="#222" />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.blogContent}>
              <View style={styles.blogTopRow}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View style={styles.smallCategoryBadge}>
                    <Text style={styles.smallCategoryText}>Motivation</Text>
                  </View>

                  <View style={styles.smallTypeBadge}>
                    <Text style={styles.smallTypeText}>Public</Text>
                  </View>
                </View>

                <Pressable style={styles.saveButton}>
                  <Fontisto name="favorite" size={17} color={COLORS.primary} />
                  <Text style={styles.saveText}>Save</Text>
                </Pressable>
              </View>

              <Text style={styles.blogTitle}>
                Trusting God in Uncertain Times
              </Text>

              <View style={styles.blogAuthorRow}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="person-circle-outline"
                    size={34}
                    color={COLORS.primary}
                  />

                  <Text style={styles.blogAuthor}>By William</Text>
                </View>

                <View style={styles.dateContainer}>
                  <EvilIcons
                    name="calendar"
                    size={22}
                    color={COLORS.secondary}
                  />

                  <Text style={styles.blogDate}>Aug 10, 2025</Text>
                </View>
              </View>

              <Text style={styles.blogDescription}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </View>

            <View style={styles.popularBlogsContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Popular Blogs</Text>
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
                <Pressable style={styles.inspirationCard}>
                  <ImageBackground
                    source={require("../../assets/images/blogs.jpg")}
                    style={styles.inspirationImage}
                    imageStyle={styles.featuredBlogImage}
                  >
                    <View style={styles.featuredOverlay}>
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>Motivation</Text>
                      </View>
                    </View>
                  </ImageBackground>

                  <View style={styles.inspirationTextContainer}>
                    <View style={styles.blogTopRow}>
                      <Text style={styles.PopularBlogTitle} numberOfLines={1}>
                        These are the days of Elijah
                      </Text>

                      <Pressable style={styles.saveButton}>
                        <Fontisto
                          name="favorite"
                          size={18}
                          color={COLORS.primary}
                        />
                      </Pressable>
                    </View>

                    <Text style={styles.inspirationSubText}>
                      Lord guide my heart and steps today. Give me peace, and
                      strength.
                    </Text>

                    <View style={styles.blogAuthorRow}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Ionicons
                          name="person-circle-outline"
                          size={19}
                          color={COLORS.primary}
                        />

                        <Text style={styles.blogAuthor}>By William</Text>
                      </View>

                      <View style={styles.divider} />

                      <Text style={styles.blogDate}>Aug 10, 2025</Text>
                    </View>
                  </View>
                </Pressable>
                <Pressable style={styles.inspirationCard}>
                  <ImageBackground
                    source={require("../../assets/images/blogs.jpg")}
                    style={styles.inspirationImage}
                    imageStyle={styles.featuredBlogImage}
                  >
                    <View style={styles.featuredOverlay}>
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>Motivation</Text>
                      </View>
                    </View>
                  </ImageBackground>

                  <View style={styles.inspirationTextContainer}>
                    <View style={styles.blogTopRow}>
                      <Text style={styles.PopularBlogTitle} numberOfLines={1}>
                        These are the days of Elijah
                      </Text>

                      <Pressable style={styles.saveButton}>
                        <Fontisto
                          name="favorite"
                          size={18}
                          color={COLORS.primary}
                        />
                      </Pressable>
                    </View>

                    <Text style={styles.inspirationSubText}>
                      Lord guide my heart and steps today. Give me peace, and
                      strength.
                    </Text>

                    <View style={styles.blogAuthorRow}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Ionicons
                          name="person-circle-outline"
                          size={19}
                          color={COLORS.primary}
                        />

                        <Text style={styles.blogAuthor}>By William</Text>
                      </View>

                      <View style={styles.divider} />

                      <Text style={styles.blogDate}>Aug 10, 2025</Text>
                    </View>
                  </View>
                </Pressable>
                <Pressable style={styles.inspirationCard}>
                  <ImageBackground
                    source={require("../../assets/images/blogs.jpg")}
                    style={styles.inspirationImage}
                    imageStyle={styles.featuredBlogImage}
                  >
                    <View style={styles.featuredOverlay}>
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>Motivation</Text>
                      </View>
                    </View>
                  </ImageBackground>

                  <View style={styles.inspirationTextContainer}>
                    <View style={styles.blogTopRow}>
                      <Text style={styles.PopularBlogTitle} numberOfLines={1}>
                        These are the days of Elijah
                      </Text>

                      <Pressable style={styles.saveButton}>
                        <Fontisto
                          name="favorite"
                          size={18}
                          color={COLORS.primary}
                        />
                      </Pressable>
                    </View>

                    <Text style={styles.inspirationSubText}>
                      Lord guide my heart and steps today. Give me peace, and
                      strength.
                    </Text>

                    <View style={styles.blogAuthorRow}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Ionicons
                          name="person-circle-outline"
                          size={19}
                          color={COLORS.primary}
                        />

                        <Text style={styles.blogAuthor}>By William</Text>
                      </View>

                      <View style={styles.divider} />

                      <Text style={styles.blogDate}>Aug 10, 2025</Text>
                    </View>
                  </View>
                </Pressable>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default BlogDetail;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // paddingTop: 10,
    // paddingBottom: 50,
  },

  header: {
    width: "100%",
  },

  arrowTop: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },

  backButton: {
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

  title: {
    fontSize: 21,
    fontWeight: "700",
    color: "#1D1D1F",
  },

  loader: {
    marginTop: 30,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 15,
    color: "#777",
  },

  featuredBlog: {
    width: "100%",
    height: 250,
    overflow: "hidden",
  },

  featuredBlogImage: {
    resizeMode: "cover",
    // opacity: 0.8,
  },

  featuredOverlay: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 18,
    gap: 60,
  },

  blogContent: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 25,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    marginTop: -20,
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

  smallTypeBadge: {
    backgroundColor: "#d2f5df",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 15,
  },

  smallTypeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#0a963e",
  },

  saveButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },

  saveText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "600",
  },

  blogTitle: {
    marginTop: 7,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
    color: "#222",
  },

  blogAuthorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
  },

  divider: {
    width: 1,
    height: 14,
    backgroundColor: "#ccc",
    marginHorizontal: 8,
  },

  blogAuthor: {
    marginLeft: 4,
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "500",
  },

  blogDate: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "500",
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginVertical: 10,
  },

  blogDescription: {
    color: "#646262",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },

  popularBlogsContainer: {
    marginTop: 25,
    paddingLeft: 20,
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

  inspirationCard: {
    width: 220,

    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    overflow: "hidden",
  },

  inspirationImage: {
    width: "100%",
    height: 130,
  },

  inspirationTextContainer: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  inspirationText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
  },

  inspirationSubText: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 18,
    color: "#646262",
  },

  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F4E0E0",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 8,
  },

  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#C45A5A",
  },

  PopularBlogTitle: {
    fontSize: 14,
    fontWeight: "700",
    flex: 1,
  },
});
