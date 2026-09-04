import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useState } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import API_URL from "../../services/api";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Blogs = () => {
  const insets = useSafeAreaInsets();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_URL}/blogs`, {
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      console.log("BLOG RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch blogs");
      }

      setBlogs(data.blogs?.data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBlogs();
    }, []),
  );

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

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "#f9f7fb",
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <View style={styles.screen}>
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
                <Ionicons name="arrow-back" size={23} color="#222" />
              </TouchableOpacity>

              <Text style={styles.title}>Our Blogs</Text>

              <View style={styles.headerPlaceholder} />
            </View>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={COLORS.secondary} />

                <Text style={styles.loadingText}>Loading saved verses...</Text>
              </View>
            ) : blogs.length === 0 ? (
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
                          <Text style={styles.smallCategoryText}>
                            {blog.blog_category || "Other"}
                          </Text>
                        </View>

                        <Pressable
                          style={styles.saveButton}
                          onPress={(event) => {
                            event.stopPropagation();
                          }}
                        >
                          <Ionicons
                            name="bookmark-outline"
                            size={20}
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

                        <Text style={styles.blogDate}>{blog.blog_date}</Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Blogs;

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    backgroundColor: "#F8F8FA",
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 45,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 28,
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

  loader: {
    marginTop: 30,
    color: COLORS.secondary,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 15,
    color: "#777",
  },

  blogCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 2,
  },

  blogTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },

  blogContent: {
    fontSize: 14,
    lineHeight: 21,
    color: "#666",
    marginBottom: 10,
  },

  blogCategory: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ac0a0a",
    textTransform: "capitalize",
  },

  addBlog: {
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    height: 38,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    width: "30%",
    marginBottom: 10,
  },

  addBlogText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },

  blogCard: {
    marginTop: 10,
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
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
});
