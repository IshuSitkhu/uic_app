import { EvilIcons, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
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

const SavedSong = () => {
    const insets = useSafeAreaInsets();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [savedSongs, setSavedSongs] = useState([]);

    const fetchSavedSongs = async () => {
    try {
        setLoading(true);
        setError(null);

        const token = await AsyncStorage.getItem("token");

        if (!token) {
        throw new Error("Authentication token not found.");
        }

        console.log("API_URL:", API_URL);
        console.log("SAVED SONGS URL:", `${API_URL}/songs/saved`);

        const response = await fetch(`${API_URL}/songs/saved`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        });

        const data = await response.json();

        console.log("SAVED SONGS RESPONSE:", data);

        if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch saved songs."
        );
        }

        setSavedSongs(data.songs || []);
    } catch (error) {
        console.log("SAVED SONGS ERROR:", error);

        setError(
        error.message || "Failed to load saved songs."
        );
    } finally {
        setLoading(false);
    }
    };

    const handleFavoriteSong = async (songId) => {
        try {
            const token = await AsyncStorage.getItem("token");

            if (!token) {
            throw new Error("Authentication token not found.");
            }

            const response = await fetch(`${API_URL}/songs/favorite`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                song_id: songId,
            }),
            });

            const data = await response.json();

            console.log("FAVORITE SONG RESPONSE:", data);

            if (!response.ok) {
            throw new Error(
                data.message || "Failed to update favorite."
            );
            }

            // Since this is the Saved Songs page,
            // removing favorite should remove the song from this list.
            if (!data.is_favorited) {
            setSavedSongs((previousSongs) =>
                previousSongs.filter((song) => song.id !== songId)
            );
            }
        } catch (error) {
            console.log("FAVORITE SONG ERROR:", error);
        }
    };

    const handleLikeSong = async (songId) => {
    try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
        throw new Error("Authentication token not found.");
        }

        const response = await fetch(`${API_URL}/songs/like`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            song_id: songId,
        }),
        });

        const data = await response.json();

        console.log("LIKE SONG RESPONSE:", data);

        if (!response.ok) {
        throw new Error(
            data.message || "Failed to update like."
        );
        }

        // Update only the liked state of this song
        setSavedSongs((previousSongs) =>
        previousSongs.map((song) =>
            song.id === songId
            ? {
                ...song,
                is_liked: data.is_liked,
                }
            : song
        )
        );
    } catch (error) {
        console.log("LIKE SONG ERROR:", error);
    }
    };

  useEffect(() => {
    fetchSavedSongs();
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

          <Text style={styles.title}>Saved songs</Text>

          <View style={styles.headerPlaceholder} />
        </View>
        {loading ? (
                <View style={styles.loadingContainer}>
                <ActivityIndicator
                    size="small"
                    color={COLORS.secondary}
                />

                <Text style={styles.loadingText}>
                    Loading saved songs...
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
                    onPress={fetchSavedSongs}
                >
                    <Text style={styles.retryText}>
                    Try Again
                    </Text>
                </TouchableOpacity>
                </View>
            ) : savedSongs.length === 0 ? (
                <View style={styles.emptyContainer}>
                <Ionicons
                    name="bookmark-outline"
                    size={50}
                    color={COLORS.primary}
                />

                <Text style={styles.emptyTitle}>
                    No Saved Songs
                </Text>

                <Text style={styles.emptyText}>
                    Songs you save will appear here.
                </Text>
                </View>
            ) : (
                <View style={styles.listContainer}>
                {savedSongs.map((song) => (
                    <Pressable
                key={song.id}
                style={styles.prayerCard}
                onPress={() => 
                  router.push({
                    pathname: "/full-song",
                    params:{
                      id:String(song.id),
                    },
                  })
                }
              >
                <View style={styles.prayerContent}>
                  <View style={styles.prayerImageContainer}>
                    <Image
                      source={
                        song.song_cover
                          ? { uri: song.song_cover }
                          : require("../../assets/images/popularSongs2.jpg")
                      }
                      style={styles.prayerImage}
                    />
                  </View>

                  <View style={styles.prayerDetails}>
                    <View style={styles.prayerTopRow}>
                      <Text style={styles.prayerTitle} numberOfLines={2}>
                        {song.song_title}
                      </Text>

                      <Pressable
                        style={styles.saveButton}
                        onPress={() => handleFavoriteSong(song.id)}
                      >
                        <Ionicons
                            name="heart"
                            size={20}
                            color={COLORS.primary}
                        />
                    
                      </Pressable>
                    </View>

                    <View style={styles.prayerAuthorRow}>
                      <Ionicons
                        name="person-circle-outline"
                        size={22}
                        color={COLORS.primary}
                      />

                      <Text style={styles.prayerAuthor}>By {song.song_author}</Text>

                      <View style={styles.divider} />

                      <Pressable
                          style={styles.like}
                          onPress={() => handleLikeSong(song.id)}
                        >
                        <FontAwesome 
                          name={
                            song.is_liked ? "thumbs-up" :"thumbs-o-up" 
                           } size={17} color={COLORS.primary} />

                        <Text style={styles.likes}>{song.is_liked ? "Liked" : "Like" }</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Pressable>
                ))}
                </View>
        )}

      </ScrollView>
    </View>
  );
};

export default SavedSong;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
    marginBottom: 20,
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
    paddingTop: 5,
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
    justifyContent: "center",

    paddingRight: 20,
    paddingVertical: 10,

    minHeight: 44,
    minWidth: 70,

    borderRadius: 8,
  },

  likes: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
    color: COLORS.primary,
  },
});

