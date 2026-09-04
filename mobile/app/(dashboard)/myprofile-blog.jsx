import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL from "../..//services/api";

import {
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

const COLORS = {
  primary: "#4D3C78",
  secondary: "#755DB0",
  blog: "#B45D72",
  background: "#F8F7FB",
  card: "#FFFFFF",
  text: "#222222",
  muted: "#777777",
  border: "#E5E2EA",
};
const stripHtml = (html = "") => {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
};

export default function MyProfileBlog() {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState("myBlogs");

    const [myBlogs, setMyBlogs] = useState([]);
    const [savedBlogs, setSavedBlogs] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

  const [blogType, setBlogType] = useState("All");
  const [category, setCategory] = useState("All");
  const [dateFrom, setDateFrom] = useState("");

  const [filterModal, setFilterModal] = useState(null);

  const fetchMyBlogs = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const response = await fetch(`${API_URL}/blogs/my`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch your blogs.");
    }

    const formattedBlogs = (data.blogs || []).map((blog) => ({
      id: String(blog.id),
      title: blog.blog_title,
      description: stripHtml(blog.blog),
      category: blog.blog_category,
      type: blog.blog_type,
      date: blog.blog_date,
      image: blog.blog_file,
      original: blog,
    }));

    setMyBlogs(formattedBlogs);
  } catch (error) {
    console.log("MY BLOGS ERROR:", error);
    setError(error.message || "Failed to load blogs.");
  }
};

const fetchSavedBlogs = async () => {
  try {
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

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch saved blogs.");
    }

    const formattedBlogs = (data.blogs || []).map((blog) => ({
      id: String(blog.id),
      title: blog.blog_title,
      description: stripHtml(blog.blog),
      category: blog.blog_category,
      type: blog.blog_type,
      date: blog.blog_date,
      image: blog.blog_file,
      original: blog,
    }));

    setSavedBlogs(formattedBlogs);
  } catch (error) {
    console.log("SAVED BLOGS ERROR:", error);
    setError(error.message || "Failed to load saved blogs.");
  }
};

useEffect(() => {
  const loadBlogs = async () => {
    setLoading(true);
    setError("");

    await Promise.all([
      fetchMyBlogs(),
      fetchSavedBlogs(),
    ]);

    setLoading(false);
  };

  loadBlogs();
}, []);

const filteredBlogs = useMemo(() => {
  return myBlogs.filter((blog) => {
    const typeMatch =
      blogType === "All" || blog.type === blogType;

    const categoryMatch =
      category === "All" || blog.category === category;

    const dateMatch =
      !dateFrom || blog.date >= dateFrom;

    return typeMatch && categoryMatch && dateMatch;
  });
}, [myBlogs, blogType, category, dateFrom]);

  const clearFilters = () => {
    setBlogType("All");
    setCategory("All");
    setDateFrom("");
  };

  return (
    <View
        style={{
          flex: 1,
          backgroundColor: "#f9f7fb",
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            style={styles.headerButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={COLORS.text}
            />
          </Pressable>

          <Text style={styles.headerTitle}>
            My Blogs
          </Text>

          <Pressable
            style={styles.addButton}
            onPress={() => router.push("/add-blog")}
          >
            <Ionicons
              name="add"
              size={22}
              color="#FFFFFF"
            />

            <Text style={styles.addButtonText}>
              Add Blog
            </Text>
          </Pressable>
        </View>

        {/* TAB SWITCHER */}
        <View style={styles.tabContainer}>
          <Pressable
            style={[
              styles.tab,
              activeTab === "myBlogs" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("myBlogs")}
          >
            <MaterialCommunityIcons
              name="clipboard-edit-outline"
              size={20}
              color={
                activeTab === "myBlogs"
                  ? "#FFFFFF"
                  : COLORS.muted
              }
            />

            <Text
              style={[
                styles.tabText,
                activeTab === "myBlogs" &&
                  styles.activeTabText,
              ]}
            >
              My Blogs
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.tab,
              activeTab === "saved" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("saved")}
          >
            <Ionicons
              name={
                activeTab === "saved"
                  ? "bookmark"
                  : "bookmark-outline"
              }
              size={20}
              color={
                activeTab === "saved"
                  ? "#FFFFFF"
                  : COLORS.muted
              }
            />

            <Text
              style={[
                styles.tabText,
                activeTab === "saved" &&
                  styles.activeTabText,
              ]}
            >
              Saved
            </Text>
          </Pressable>
        </View>

        {activeTab === "myBlogs" && (
          <>
            {/* FILTERS */}
            <View style={styles.filterSection}>
              <View style={styles.filterHeader}>
                <Text style={styles.sectionTitle}>
                  Your Blogs
                </Text>

                {(blogType !== "All" ||
                  category !== "All" ||
                  dateFrom) && (
                  <Pressable onPress={clearFilters}>
                    <Text style={styles.clearText}>
                      Clear
                    </Text>
                  </Pressable>
                )}
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterScroll}
              >
                <FilterButton
                  icon="lock-open-outline"
                  label="Type"
                  value={blogType}
                  onPress={() =>
                    setFilterModal("type")
                  }
                />

                <FilterButton
                  icon="pricetags-outline"
                  label="Category"
                  value={category}
                  onPress={() =>
                    setFilterModal("category")
                  }
                />

                {/* <FilterButton
                  icon="calendar-outline"
                  label="Date"
                  value={dateFrom || "Any date"}
                  onPress={() =>
                    setFilterModal("date")
                  }
                /> */}
              </ScrollView>
            </View>

            {/* BLOG LIST */}
            <FlatList
              data={filteredBlogs}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <BlogCard blog={item} editable />
              )}
              ListEmptyComponent={
                <EmptyState
                  title="No blogs found"
                  message="Try changing your filters."
                />
              }
            />
          </>
        )}

        {/* SAVED BLOGS */}
        {activeTab === "saved" && (
          <FlatList
            data={savedBlogs}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <BlogCard
                blog={item}
                saved
              />
            )}
            ListEmptyComponent={
              <EmptyState
                title="No saved blogs"
                message="Blogs you save will appear here."
              />
            }
          />
        )}

        {/* FILTER MODAL */}
        <Modal
          visible={filterModal !== null}
          transparent
          animationType="slide"
          onRequestClose={() => setFilterModal(null)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setFilterModal(null)}
          >
            <Pressable
              style={styles.bottomSheet}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={styles.sheetHandle} />

              <Text style={styles.sheetTitle}>
                {filterModal === "type" &&
                  "Blog Type"}

                {filterModal === "category" &&
                  "Category"}

                {filterModal === "date" &&
                  "Date"}
              </Text>

              {filterModal === "type" && (
                <>
                  <Option
                    label="All"
                    selected={blogType === "All"}
                    onPress={() => {
                      setBlogType("All");
                      setFilterModal(null);
                    }}
                  />

                  <Option
                    label="Public"
                    selected={blogType === "public"}
                    onPress={() => {
                      setBlogType("public");
                      setFilterModal(null);
                    }}
                  />

                  <Option
                    label="Private"
                    selected={blogType === "personal"}
                    onPress={() => {
                      setBlogType("personal");
                      setFilterModal(null);
                    }}
                  />
                </>
              )}

              {filterModal === "category" && (
                <>
                  <Option
                    label="All"
                    selected={category === "All"}
                    onPress={() => {
                      setCategory("All");
                      setFilterModal(null);
                    }}
                  />

                  <Option
                    label="Gospel"
                    selected={category === "gospel"}
                    onPress={() => {
                      setCategory("gospel");
                      setFilterModal(null);
                    }}
                  />

                  <Option
                    label="Motivation"
                    selected={category === "motivation"}
                    onPress={() => {
                      setCategory("motivation");
                      setFilterModal(null);
                    }}
                  />

                  <Option
                    label="Devotional"
                    selected={category === "devotional"}
                    onPress={() => {
                      setCategory("devotional");
                      setFilterModal(null);
                    }}
                  />

                  <Option
                    label="Faith"
                    selected={category === "faith"}
                    onPress={() => {
                        setCategory("faith");
                        setFilterModal(null);
                    }}
                    />

                    <Option
                    label="Relationship"
                    selected={category === "relationship"}
                    onPress={() => {
                        setCategory("relationship");
                        setFilterModal(null);
                    }}
                    />
                </>
              )}

              {filterModal === "date" && (
                <>
                  <Text style={styles.dateInfo}>
                    Date filtering will use the
                    date picker here.
                  </Text>

                  <Pressable
                    style={styles.dateOption}
                    onPress={() => {
                      setDateFrom("2026-08-25");
                      setFilterModal(null);
                    }}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={22}
                      color={COLORS.primary}
                    />

                    <Text style={styles.dateOptionText}>
                      From Aug 25, 2026
                    </Text>
                  </Pressable>

                  <Pressable
                    style={styles.dateOption}
                    onPress={() => {
                      setDateFrom("");
                      setFilterModal(null);
                    }}
                  >
                    <Ionicons
                      name="close-circle-outline"
                      size={22}
                      color={COLORS.muted}
                    />

                    <Text style={styles.dateOptionText}>
                      Any date
                    </Text>
                  </Pressable>
                </>
              )}
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    </View>
  );
}


function FilterButton({
  icon,
  label,
  value,
  onPress,
}) {
  const active = value !== "All" && value !== "Any date";

  return (
    <Pressable
      style={[
        styles.filterButton,
        active && styles.activeFilterButton,
      ]}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={18}
        color={
          active ? COLORS.primary : COLORS.muted
        }
      />

      <View>
        <Text style={styles.filterLabel}>
          {label}
        </Text>

        <Text
          style={[
            styles.filterValue,
            active && styles.activeFilterValue,
          ]}
        >
          {value}
        </Text>
      </View>

      <Ionicons
        name="chevron-down"
        size={16}
        color={COLORS.muted}
      />
    </Pressable>
  );
}


function BlogCard({ blog, saved, editable }) {
  return (
    <Pressable
      style={styles.blogCardContainer}
      onPress={() =>
        router.push({
          pathname: "/blog-detail",
          params: {
            id: blog.id,
          },
        })
      }
    >

      <View style={styles.blogMainRow}>

        <View style={styles.blogImageBox}>
          <Image
            source={
              blog.image
                ? {
                    uri: `${API_URL.replace(
                      "/api",
                      "",
                    )}/frontend/blogs/${blog.image}`,
                  }
                : require("../../assets/images/blogs.jpg")
            }
            style={styles.blogImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.blogContent}>

          <Text
            style={styles.blogTitle}
            numberOfLines={1}
          >
            {blog.title}
          </Text>

          <Text
            style={styles.blogDescription}
            numberOfLines={3}
          >
            {blog.description}
          </Text>

        </View>

        <View style={styles.blogCardActions}>

          {saved && (
            <Ionicons
              name="bookmark"
              size={20}
              color={COLORS.primary}
            />
          )}

          {editable && (
            <Pressable
              style={styles.moreButton}
              onPress={() => {
                // open action menu
              }}
            >
              <Ionicons
                name="ellipsis-vertical"
                size={20}
                color={COLORS.text}
              />
            </Pressable>
          )}

        </View>
      </View>


      <View style={styles.blogMetaRow}>
          
        <View style={styles.categoryContainer}>
          <Ionicons
            name="pricetag-outline"
            size={14}
            color="#C45A5A"
          />

          <Text style={styles.categoryText}>
            {blog.category
              ? blog.category.charAt(0).toUpperCase() +
                blog.category.slice(1)
              : ""}
          </Text>
        </View>
        

        {!saved && (
          <View
            style={[
              styles.typeBadge,
              blog.type === "personal" &&
                styles.privateBadge,
            ]}
          >
            <Ionicons
              name={
                blog.type === "personal"
                  ? "lock-closed-outline"
                  : "globe-outline"
              }
              size={13}
              color={COLORS.primary}
            />

            <Text style={styles.typeBadgeText}>
              {blog.type === "personal"
                ? "Personal"
                : "Public"}
            </Text>
          </View>
        )}

        {/* DATE */}
        <View style={styles.dateContainer}>
          <Ionicons
            name="calendar-outline"
            size={14}
            color={COLORS.muted}
          />

          <Text style={styles.blogDate}>
            {formatDate(blog.date)}
          </Text>
        </View>

      </View>
    </Pressable>
  );
}


function Option({
  label,
  selected,
  onPress,
}) {
  return (
    <Pressable
      style={styles.option}
      onPress={onPress}
    >
      <Text
        style={[
          styles.optionText,
          selected && styles.selectedOptionText,
        ]}
      >
        {label}
      </Text>

      {selected && (
        <Ionicons
          name="checkmark-circle"
          size={23}
          color={COLORS.primary}
        />
      )}
    </Pressable>
  );
}


function EmptyState({
  title,
  message,
}) {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <MaterialCommunityIcons
          name="book-open-page-variant-outline"
          size={35}
          color={COLORS.muted}
        />
      </View>

      <Text style={styles.emptyTitle}>
        {title}
      </Text>

      <Text style={styles.emptyMessage}>
        {message}
      </Text>
    </View>
  );
}


function formatDate(date) {
  const d = new Date(date);

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
  },

  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    justifyContent: "space-between",
  },

  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  headerTitle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 21,
    fontWeight: "700",
    color: COLORS.text,
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 20,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  /* TABS */

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#EDEAF2",
    marginHorizontal: 18,
    marginTop: 8,
    padding: 4,
    borderRadius: 16,
  },

  tab: {
    flex: 1,
    minHeight: 48,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  activeTab: {
    backgroundColor: COLORS.primary,
  },

  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.muted,
  },

  activeTabText: {
    color: "#FFFFFF",
  },

  /* FILTER */

  filterSection: {
    marginTop: 22,
  },

  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  clearText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary,
  },

  filterScroll: {
    paddingHorizontal: 18,
    gap: 10,
    paddingTop: 12,
    paddingBottom: 4,
  },

  filterButton: {
    minWidth: 118,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  activeFilterButton: {
    borderColor: COLORS.primary,
    backgroundColor: "#FFF7F9",
  },

  filterLabel: {
    fontSize: 10,
    color: COLORS.muted,
  },

  filterValue: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },

  activeFilterValue: {
    color: COLORS.primary,
  },

  /* LIST */

  listContent: {
    padding: 18,
    paddingTop: 16,
    paddingBottom: 40,
  },

  /* BLOG CARD */

  blogCardContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 17,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#ECE9EF",
  },

  blogCardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 5,
    },

    blogAuthor: {
    fontSize: 12,
    color: COLORS.muted,
    },

  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFF5F7",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },

  privateBadge: {
    backgroundColor: "#F1EEF6",
  },

  typeBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.primary,
  },

  dateContainer: {
  flexDirection: "row",
  alignItems: "center",
  gap: 5,
  marginLeft: "auto",
},

  blogCardActions: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
},

editButton: {
  width: 34,
  height: 34,
  borderRadius: 17,
  backgroundColor: "#FFF5F7",
  alignItems: "center",
  justifyContent: "center",
},

blogMainRow: {
  flexDirection: "row",
  alignItems: "flex-start",
},

blogImageBox: {
  width: 122,
  height: 102,
  borderRadius: 16,
  overflow: "hidden",
  backgroundColor: "#F1EDF6",
},

blogImage: {
  width: "100%",
  height: "100%",
},

blogContent: {
  flex: 1,
  marginLeft: 14,
  paddingRight: 6,
},

blogCardActions: {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
},

moreButton: {
  width: 32,
  height: 32,
  alignItems: "center",
  justifyContent: "center",
},

  blogTitle: {
    marginTop: 13,
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.text,
  },

  blogDescription: {
    marginTop: 7,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.muted,
  },

  blogBottom: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  categoryContainer: {
    backgroundColor: "#F3F0F7",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#C45A5A",
  },

  blogMetaRow: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 14,
  paddingTop: 11,
  borderTopWidth: 1,
  borderTopColor: COLORS.border,
  gap: 10,
},

categoryContainer: {
  flexDirection: "row",
  alignItems: "center",
  gap: 5,
  backgroundColor: "#F8EFF2",
  paddingHorizontal: 9,
  paddingVertical: 5,
  borderRadius: 8,
},

  blogDate: {
    fontSize: 12,
    color: COLORS.muted,
    fontWeight: "500",
    },

  /* EMPTY */

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 70,
  },

  emptyIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ECE9EF",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    marginTop: 15,
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.text,
  },

  emptyMessage: {
    marginTop: 5,
    fontSize: 13,
    color: COLORS.muted,
    textAlign: "center",
  },

  /* MODAL */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },

  bottomSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 35,
  },

  sheetHandle: {
    width: 42,
    height: 4,
    borderRadius: 3,
    backgroundColor: "#D5D1D9",
    alignSelf: "center",
    marginBottom: 20,
  },

  sheetTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 10,
  },

  option: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F0EEF2",
  },

  optionText: {
    fontSize: 15,
    color: COLORS.text,
  },

  selectedOptionText: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  dateInfo: {
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.muted,
    marginBottom: 10,
  },

  dateOption: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0EEF2",
  },

  dateOptionText: {
    fontSize: 15,
    color: COLORS.text,
  },
});