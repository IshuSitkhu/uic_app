import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
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

const SavedPrayer = () => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedPrayers, setSavedPrayers] = useState([]);

  const fetchSavedPrayers = async () => {
      try {
          setLoading(true);
          setError(null);

          const token = await AsyncStorage.getItem("token");

          if (!token) {
              throw new Error("Authentication token not found.");
          }
          console.log("API_URL:", API_URL);
          console.log("SAVED PRAYER URL:", `${API_URL}/prayers/saved`);

          const response = await fetch(`${API_URL}/prayers/saved`, {
              method: "GET",
              headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
              },
          });

          const data = await response.json();

          console.log("SAVED PRAYERS RESPONSE:", data);

          if (!response.ok) {
              throw new Error(
                  data.message || "Failed to fetch saved prayers."
              );
          }

          setSavedPrayers(data.prayers || []);
      } catch (error) {
          console.log("SAVED PRAYERS ERROR:", error);

          setError(
              error.message || "Failed to load saved prayers."
          );
      } finally {
          setLoading(false);
      }
  };

  const handleFavoritePrayer = async (prayerId) => {
    try{
      const token = await AsyncStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found.");
          }

          const response = await fetch(`${API_URL}/prayers/${prayerId}/favorite`, {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        console.log("FAVORITE prayer RESPONSE:", data);

        if (!response.ok) {
        throw new Error(
            data.message || "Failed to update favorite."
        );
        }

        // Since this is the Saved Prayers page,
        // removing favorite should remove the pryaer from this list.
        if (!data.is_favorited) {
        setSavedPrayers((previousPrayers) =>
            previousPrayers.filter((prayer) => Number(prayer.id)!== Number(prayerId))
        );
        }
    }catch(error){
      console.log("FAVORITE SONG ERROR:", error);
    }
  }

  useEffect(() => {
    fetchSavedPrayers();
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

          <Text style={styles.title}>Saved prayers</Text>

          <View style={styles.headerPlaceholder} />
        </View>
        {loading ? (
                <View style={styles.loadingContainer}>
                <ActivityIndicator
                    size="small"
                    color={COLORS.secondary}
                />

                <Text style={styles.loadingText}>
                    Loading saved prayers...
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
                    onPress={fetchSavedPrayers}
                >
                    <Text style={styles.retryText}>
                    Try Again
                    </Text>
                </TouchableOpacity>
                </View>
            ) : savedPrayers.length === 0 ? (
                <View style={styles.emptyContainer}>
                <Ionicons
                    name="bookmark-outline"
                    size={50}
                    color={COLORS.primary}
                />

                <Text style={styles.emptyTitle}>
                    No Saved Prayers
                </Text>

                <Text style={styles.emptyText}>
                    Prayers you save will appear here.
                </Text>
                </View>
            ) : (
                <View style={styles.listContainer}>
                {savedPrayers.map((prayer) => (
                    <TouchableOpacity
                    key={prayer.id}
                    style={styles.blogCard}
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
                            <Text style={styles.blogDate}>
                                {prayer.prayer_category &&
                                prayer.prayer_category.charAt(0).toUpperCase() +
                                    prayer.prayer_category.slice(1)}
                            </Text>
                            </View>

                            <View style={styles.dateContainer}>
                            <EvilIcons name="calendar" size={20} color={COLORS.primary} />

                            <Text style={styles.blogDate}>
                                {new Date(prayer.prayer_start_date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                })}
                            </Text>
                            </View>

                            <Pressable
                              style={styles.saveButton}
                              onPress={() => handleFavoritePrayer(prayer.id)}
                              >
                              <Ionicons
                                name={
                                  prayer.is_favorited
                                    ? "bookmark"
                                    : "bookmark-outline"
                                }
                                size={17}
                                color={COLORS.primary}
                              />

                              <Text style={styles.blogDate}>
                                  {prayer.is_favorited ? "Saved" : "Save"}
                              </Text>
                            </Pressable>
                        </View>

                        <View style={{ margin:10, }}>
                            <Text style={styles.blogTitle} numberOfLines={2}>
                                {prayer.prayer_title}
                            </Text>

                            <Text style={styles.blogDescription} numberOfLines={2}>
                            {prayer.prayer}
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

                                <Text style={styles.blogAuthor}>By Admin</Text>
                            </View>

                            <Pressable 
                                style={styles.readFullBadge} 
                                onPress={() =>
                                router.push({
                                    pathname: "/prayer-detail",
                                    params: { id: prayer.id },
                                })
                                }
                            >
                                <Text style={styles.readFullText}>Read Full Prayer</Text>

                                <Feather name="arrow-right" size={18} color="#fff" />
                            </Pressable>
                            </View>
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

export default SavedPrayer;

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
    justifyContent: "space-evenly",
    backgroundColor: "#EDE8F7",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  smallCategoryBadge: {
    flexDirection: "row",
    gap: 6,
    padding: 10,
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
    padding: 10,
  },

  blogTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    color: "#222",
  },

  blogDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: "#666",
    marginVertical:5,
  },

  blogAuthorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap:4,
  },

  blogAuthor: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "500",
  },

  
  readFullBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    padding:8,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  readFullText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
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
    padding:10,
  },
});

