import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { COLORS } from "../../constants/colors";
import API_URL from "../../services/api";

const BlogDetail = () => {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();

  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  //FavoriteBlog
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");

        const response = await fetch(`${API_URL}/blogs/${id}`, {
          headers: {
            Accept: "application/json",
            ...(token && {
              Authorization: `Bearer ${token}`,
            }),
          },
        });

        const data = await response.json();

        console.log("BLOG DETAIL RESPONSE:", data);

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch blog");
        }

        setBlog(data.blog);
        setIsFavorited(data.is_favorited);
      } catch (error) {
        console.error("Error fetching blog:", error.message);
      } finally {
        setLoading(false);
      }
    };

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

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch blogs");
        }

        const fetchedBlogs = data.blogs?.data || [];
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      }
    };

    if (id) {
      fetchBlog();
      fetchBlogs();
    }
  }, [id]);

    const handleFavorite = async (blogId) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert(
          "Login Required",
          "Please login first to save this Blog.",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => router.push("/(auth)/login"),
            },
          ]
        );
        return;
      }

      const response = await fetch(`${API_URL}/blogs/${blogId}/favorite`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("FAVORITE Blog detail RESPONSE:", response.status, data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to update favorite");
      }

      setBlogs((previousBlogs) =>
        previousBlogs.map((blog) =>
          Number(blog.id) === Number(blogId)
            ? {
                ...blog,
                is_favorited: data.is_favorited,
              }
            : blog
        )
      );

      if (Number(blogId) === Number(id)) {
        setIsFavorited(data.is_favorited);
      }

      Toast.show({
        type: "success",
        text1: data.is_favorited ? "Blog Saved" : "Blog Unsaved",
        position: "top",
      });
    } catch (error) {
      console.error("Favorite blog detail error:", error.message);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update favorite.",
        position: "top",
      });
    }
  };

  const popularBlogs = blogs
    .filter((item) => item.id !== Number(id))
    .slice(0, 3);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F9F7FB",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  }

  if (!blog) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F9F7FB",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Blog not found.</Text>
      </View>
    );
  }

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
          backgroundColor: "#F9F7FB",
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
              <ImageBackground
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
                    <Text style={styles.smallCategoryText}>
                      {blog.blog_category || "Other"}
                    </Text>
                  </View>

                  <View style={styles.smallTypeBadge}>
                    <Text style={styles.smallTypeText}>
                      {blog.blog_type || "Public"}
                    </Text>
                  </View>
                </View>

                <Pressable
                  style={styles.saveButton}
                  onPress={() => handleFavorite(Number(id))}
                >
                  <Ionicons
                    name={isFavorited ? "bookmark" : "bookmark-outline"}
                    size={22}
                    color="#4D3C78"
                  />
                </Pressable>
              </View>

              <Text style={styles.blogTitle}>{blog.blog_title}</Text>

              <View style={styles.blogAuthorRow}>
                <Pressable
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    router.push({
                      pathname: "/user-profile",
                      params: {
                        userId: blog.userdetails.id,
                      },
                    });
                  }}
                >
                  <Ionicons
                    name="person-circle-outline"
                    size={34}
                    color={COLORS.primary}
                  />

                  <Text style={styles.blogAuthor}>
                    By {blog.userdetails?.name || "Unknown"}
                  </Text>
                </Pressable>

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
              </View>

              <Text style={styles.blogDescription}>{stripHtml(blog.blog)}</Text>
            </View>

            <View style={styles.popularBlogsContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Popular Blogs</Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.popularBlogsScroll}
                style={styles.popularBlogsScrollView}
              >
                {popularBlogs.map((item) => (
                  <Pressable
                    key={item.id}
                    style={styles.inspirationCard}
                    onPress={() =>
                      router.push({
                        pathname: "/blog-detail",
                        params: {
                          id: item.id,
                        },
                      })
                    }
                  >
                    <ImageBackground
                      source={
                        item.blog_file
                          ? {
                              uri: `${API_URL.replace(
                                "/api",
                                "",
                              )}/frontend/blogs/${item.blog_file}`,
                            }
                          : require("../../assets/images/blogs.jpg")
                      }
                      style={styles.inspirationImage}
                      imageStyle={styles.featuredBlogImage}
                    >
                      <View style={styles.featuredOverlay}>
                        <View style={styles.categoryBadge}>
                          <Text style={styles.categoryText}>
                            {item.blog_category || "Other"}
                          </Text>
                        </View>
                      </View>
                    </ImageBackground>

                    <View style={styles.inspirationTextContainer}>
                      <View style={styles.blogTopRow}>
                        <Text style={styles.PopularBlogTitle} numberOfLines={1}>
                          {item.blog_title}
                        </Text>

                        <Pressable
                          style={styles.saveButton}
                          onPress={(event) => {
                            event.stopPropagation();
                            handleFavorite(item.id);
                          }}
                        >
                          <Ionicons
                            name={item.is_favorited ? "bookmark" : "bookmark-outline"}
                            size={22}
                            color="#4D3C78"
                          />
                        </Pressable>
                      </View>

                      <Text style={styles.inspirationSubText} numberOfLines={2}>
                        {stripHtml(item.blog)}
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

                          <Text style={styles.blogAuthor}>
                            By {item.userdetails?.name || "Unknown"}
                          </Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.dateContainer}>
                          <EvilIcons name="calendar" size={19} color={COLORS.primary} />

                          <Text style={styles.blogDate}>
                            {new Date(item.blog_date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                ))}
                {popularBlogs.length === 0 && (
                  <Text style={styles.emptyText}>
                    No other blogs available.
                  </Text>
                )}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default BlogDetail;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // paddingTop: 10,
    // paddingBottom: 50,
    backgroundColor: "#F9F7FB",
  },

  header: {
    width: "100%",
  },

  arrowTop: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
    padding:10,
    gap: 60,
  },

  blogContent: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    marginTop: -20,
  },

  blogTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  smallCategoryBadge: {
    backgroundColor: "#F4E0E0",
    borderRadius: 15,
    // padding :6,
  },

  smallCategoryText: {
    paddingHorizontal :10,
    paddingVertical:4,
    fontSize: 12,
    fontWeight: "600",
    color: "#C45A5A",
  },

  smallTypeBadge: {
    backgroundColor: "#d2f5df",
    borderRadius: 15,
    // padding:5,
  },

  smallTypeText: {
    paddingHorizontal :10,
    paddingVertical:4,
    fontSize: 12,
    fontWeight: "600",
    color: "#0a963e",
  },

  saveButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3eff8",
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

  popularBlogsScrollView: {
    marginTop: 14,
  },

  popularBlogsScroll: {
    gap: 18,
    paddingRight: 18,
    paddingLeft: 2,
    paddingBottom: 8,
  },

  inspirationCard: {
    width: 220,
    borderRadius: 20,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 2,
  },

  inspirationImage: {
    width: "100%",
    height: 155,
  },

  inspirationTextContainer: {
    padding:10,
  },

  inspirationText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
  },

  inspirationSubText: {

    fontSize: 12,
    lineHeight: 17,
    // color: "#646262",
  },

  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F4E0E0",
    padding:4,
    borderRadius: 20,
  },

  categoryText: {
    paddingHorizontal:5,
    fontSize: 10,
    fontWeight: "600",
    color: "#C45A5A",
  },

  PopularBlogTitle: {
    fontSize: 14,
    fontWeight: "700",
    flex: 1,
  },
});
