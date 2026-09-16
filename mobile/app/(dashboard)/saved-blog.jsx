import { EvilIcons, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS } from "../../constants/colors";
import API_URL from "../../services/api";

const SavedBlog = () => {
  const insets = useSafeAreaInsets();

  const [savedBlogs, setSavedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const stripHtml = (html) => {
    if (!html) return "";

    return html
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
  };

  const fetchSavedBlogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(`${API_URL}/blogs/saved`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("SAVED BLOGS RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch saved blogs."
        );
      }

      setSavedBlogs(data.blogs || []);
    } catch (error) {
      console.log("SAVED BLOGS ERROR:", error);

      setError(
        error.message || "Failed to load saved blogs."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async (blogId) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await fetch(
        `${API_URL}/blogs/${blogId}/favorite`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("FAVORITE RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update favorite."
        );
      }

      if (data.is_favorited === false) {
        setSavedBlogs((previousBlogs) =>
          previousBlogs.filter(
            (blog) => Number(blog.id) !== Number(blogId)
          )
        );
      }
    } catch (error) {
      console.log("FAVORITE ERROR:", error);
    }
  };

  useEffect(() => {
    fetchSavedBlogs();
  }, []);

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
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color="#222"
            />
          </TouchableOpacity>

          <Text style={styles.title}>Saved Blogs</Text>

          <View style={styles.headerPlaceholder} />
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="small"
              color={COLORS.secondary}
            />

            <Text style={styles.loadingText}>
              Loading saved blogs...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="alert-circle-outline"
              size={50}
              color={COLORS.primary}
            />

            <Text style={styles.emptyTitle}>
              Something went wrong
            </Text>

            <Text style={styles.emptyText}>
              {error}
            </Text>

            <TouchableOpacity
              style={styles.retryButton}
              onPress={fetchSavedBlogs}
            >
              <Text style={styles.retryText}>
                Try Again
              </Text>
            </TouchableOpacity>
          </View>
        ) : savedBlogs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="bookmark-outline"
              size={50}
              color={COLORS.primary}
            />

            <Text style={styles.emptyTitle}>
              No Saved Blogs
            </Text>

            <Text style={styles.emptyText}>
              Blogs you save will appear here.
            </Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {savedBlogs.map((blog) => (
              <TouchableOpacity
                key={blog.id}
                style={styles.blogCard}
                activeOpacity={0.8}
                onPress={() => {
                  router.push({
                    pathname: "/(dashboard)/blog-detail",
                    params: {
                      id: blog.id,
                    },
                  });
                }}
              >
                <View style={styles.blogContent}>
                  <View style={styles.blogImageContainer}>
                    <Image
                      source={
                        blog.blog_file
                          ? {
                              uri: `${API_URL.replace(
                                "/api",
                                ""
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

                          <Text
                            style={styles.smallCategoryText}
                          >
                            {blog.blog_category
                              ? blog.blog_category
                                  .charAt(0)
                                  .toUpperCase() +
                                blog.blog_category.slice(1)
                              : "Other"}
                          </Text>
                        </View>
                      </View>

                      <Pressable
                        style={styles.saveButton}
                        onPress={(event) => {
                          event.stopPropagation();

                          handleFavorite(
                            Number(blog.id)
                          );
                        }}
                      >
                        <Ionicons
                          name="bookmark"
                          size={17}
                          color={COLORS.primary}
                        />
                      </Pressable>
                    </View>

                    <Text
                      style={styles.blogTitle}
                      numberOfLines={1}
                    >
                      {blog.blog_title}
                    </Text>

                    <Text
                      style={styles.blogDescription}
                      numberOfLines={2}
                    >
                      {stripHtml(blog.blog)}
                    </Text>

                    <View style={styles.bottomRow}>
                    <View style={styles.blogAuthorRow}>
                      <Ionicons
                        name="person-circle-outline"
                        size={19}
                        color={COLORS.primary}
                      />

                      <Text style={styles.blogAuthor}>
                        By {blog.userdetails?.name || "Unknown"}
                      </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.dateContainer}>
                      <EvilIcons name="calendar" size={24} color={COLORS.primary} />

                      <Text style={styles.blogDate}>
                        {new Date(blog.blog_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Text>
                    </View>
                    {/* <Text style={styles.blogDate}>{blog.blog_date}</Text> */}
                  
                  </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SavedBlog;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F8FA",
  },

  content: {
    margin:10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

  headerPlaceholder: {
    width: 44,
  },

  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: "#777",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    paddingHorizontal: 30,
  },

  emptyTitle: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "700",
    color: "#1D1D1F",
  },

  emptyText: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
    color: "#777",
  },

  retryButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 10,
  },

  retryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  listContainer: {
    gap: 12,
    marginTop: 20,
  },

  blogCard: {
    backgroundColor: "#F9F7FB",
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
    borderRadius: 10,
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
    borderRadius: 15,
  },

  categoryContainer: {
    backgroundColor: "#F4E0E0",
    padding:8,
    borderRadius: 10,
    flexDirection: "row",
    gap: 5,
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F2FA",
  },

  blogTitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
    color: "#1D1D1F",
  },

  blogDescription: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 17,
    color: "#666",
  },

  bottomRow:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-evenly",
    marginTop:7,
  },

  blogAuthorRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  blogAuthor: {
    marginLeft: 4,
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: "500",
  },

  divider: {
    width: 1,
    height: 12,
    backgroundColor: "#ccc",
    marginHorizontal: 8,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  blogDate: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: "500",
  },
});
