import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "../../constants/colors";
import API_URL from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const BlogContent = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteStatus, setFavoriteStatus] = useState({});

  const fetchBlogs = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${API_URL}/blogs`, {
        headers: {
          Accept: "application/json",
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
        },
      });

      const data = await response.json();

      console.log("BLOG API RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch blogs");
      }

      const fetchedBlogs = data.blogs?.data || [];

      setBlogs(fetchedBlogs);

      const favoriteMap = {};

      fetchedBlogs.forEach((blog) => {
            favoriteMap[Number(blog.id)] = blog.is_favorited;
      });

      setFavoriteStatus(favoriteMap);
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleFavorite = async (blogId) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Error", "Please login first.");
        return;
      }

      const response = await fetch(
        `${API_URL}/blogs/${blogId}/favorite`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("FAVORITE RESPONSE:", response.status, data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to update favorite");
      }

      setFavoriteStatus((prev) => ({
        ...prev,
        [blogId]: data.is_favorited,
      }));
      Toast.show({
            type: "success",
            text1: data.is_favorited ? "Blog Saved" : "Blog Unsaved",
            position: "top",
          });
    } catch (error) {
      console.error("Favorite error:", error.message);
      Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to update favorite.",
            position: "top",
          });
    }
  };

  // Remove HTML tags from blog content
  const stripHtml = (html) => {
    if (!html) return "";

    return html
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View>
      <ImageBackground
        source={require("../../assets/images/blogs.jpg")}
        style={styles.featuredBlog}
        imageStyle={styles.featuredBlogImage}
      >
        <View style={styles.featuredOverlay}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>Motivation</Text>
          </View>

          <Text style={styles.featuredTitle}>
            Finding Peace in{"\n"}God's Presence
          </Text>

          <Text style={styles.featuredDescription}>
            In every season, God's presence{"\n"}
            is our constant peace.
          </Text>

          <View style={styles.authorRow}>
            <View style={styles.profileIcon}>
              <Ionicons name="person" size={20} color="#fff" />
            </View>

            <View>
              <Text style={styles.authorName}>Sarah Johnson</Text>

              <Text style={styles.authorDate}>Aug 10, 2025</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.blogSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Our Blogs</Text>

          <Pressable style={styles.viewAll}>
            <Text style={styles.viewAllText}>View All</Text>

            <MaterialIcons
              name="navigate-next"
              size={18}
              color={COLORS.secondary}
            />
          </Pressable>
        </View>

        {blogs.length === 0 ? (
          <Text style={styles.emptyText}>No blogs available.</Text>
        ) : (
          blogs.map((blog) => (
            <Pressable
              key={blog.id}
              style={styles.blogCard}
              onPress={() =>
                router.push({
                  pathname: "/blog-detail",
                  params: {
                    id: blog.id,
                  },
                })
              }
            >
              <View style={styles.blogContent}>
                <View style={styles.blogImageContainer}>
                  <Image
                    source={
                      blog.blog_file
                        ? {
                            uri: `${API_URL.replace(
                              "/api",
                              "",
                            )}/frontend/blogs/${blog.blog_file}`,
                          }
                        : require("../../assets/images/blogs.jpg")
                    }
                    style={styles.blogImage}
                  />
                </View>

                <View style={styles.blogDetails}>
                  <View style={styles.blogTopRow}>
                    <View style={styles.smallCategoryBadge}>
                      <View style={styles.categoryContainer}>
                      <Ionicons
                          name="pricetag-outline"
                          size={14}
                          color="#C45A5A"
                        />
                      <Text style={styles.smallCategoryText}>
                        {/* {blog.blog_category || "Other"} */}
                        {blog.blog_category
                        ? blog.blog_category.charAt(0).toUpperCase() +
                          blog.blog_category.slice(1)
                        : ""}
                      </Text>
                      </View>
                    </View>

                    <Pressable
                      style={styles.saveButton}
                      onPress={(event) => {
                        event.stopPropagation();
                        handleFavorite(Number(blog.id));
                      }}
                    >
                      <Ionicons
                        name={
                          favoriteStatus[Number(blog.id)]
                            ? "bookmark"
                            : "bookmark-outline"
                        }
                        size={17}
                        color={COLORS.primary}
                      />
                    </Pressable>
                  </View>

                  <Text style={styles.blogTitle} numberOfLines={1}>
                    {blog.blog_title}
                  </Text>

                  <Text style={styles.blogDescription} numberOfLines={2}>
                    {stripHtml(blog.blog)}
                  </Text>

                  <View style={styles.blogAuthorRow}>
                    <Ionicons
                      name="person-circle-outline"
                      size={19}
                      color={COLORS.primary}
                    />

                    <Text style={styles.blogAuthor}>
                      By {blog.userdetails?.name || "Unknown"}
                    </Text>

                    <View style={styles.divider} />

                    <Text style={styles.blogDate}>
                      {blog.blog_date}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))
        )}
      </View>
    </View>
  );
};



export default BlogContent;

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
    width: 105,
    height: 125,
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
    // backgroundColor: "#F4E0E0",
    // paddingHorizontal: 9,
    // paddingVertical: 4,
    borderRadius: 15,
  },
  categoryContainer: {
    backgroundColor: "#F4E0E0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection:"row" ,
    gap:5,
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
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    color: "#222",
  },

  blogDescription: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 17,
    color: "#666",
  },

  blogAuthorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  blogAuthor: {
    marginLeft: 4,
    fontSize: 11,
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

  loadingContainer: {
  paddingVertical: 30,
  alignItems: "center",
  justifyContent: "center",
},
});
