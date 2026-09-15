import {
  EvilIcons,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Alert,
} from "react-native";
import { COLORS } from "../../constants/colors";
import React, { useCallback, useEffect, useRef, useState } from "react";
import API_URL from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SongContent = () => {
  const [recentSongs, setRecentSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const arrowAnimation = useRef(new Animated.Value(0)).current;
  
  useFocusEffect(
    useCallback(() => {
      const fetchRecentSongs = async () => {
        try {
          setLoading(true);

          const token = await AsyncStorage.getItem("token");

          const response = await fetch(`${API_URL}/songs`, {
            headers: {
              Accept: "application/json",
              ...(token && {
                Authorization: `Bearer ${token}`,
              }),
            },
          });

          const data = await response.json();

          console.log("RECENT SONGS RESPONSE:", data);

          if (!response.ok) {
            throw new Error(
              data.message || "Failed to fetch recent songs."
            );
          }

          setRecentSongs(data.songs || []);
        } catch (error) {
          console.log("RECENT SONGS ERROR:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchRecentSongs();
    }, [])
  );
  
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(arrowAnimation, {
          toValue: 8,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(arrowAnimation, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleFavoriteSong = async (songId) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert(
          "Login Required",
          "Please login first to save this song.",
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

      const response = await fetch(
        `${API_URL}/songs/favorite`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            song_id: songId,
          }),
        }
      );

      const data = await response.json();

      console.log("FAVORITE SONG RESPONSE:", data);

      if (response.ok) {
        setRecentSongs((previousSongs) =>
          previousSongs.map((song) =>
            song.id === songId
              ? {
                  ...song,
                  is_favorited: data.is_favorited,
                }
              : song
          )
        );
      }
    } catch (error) {
      console.log("Favorite song error:", error);
    }
  };

  const handleLikeSong = async (songId) =>{
    try{
      const token = await AsyncStorage.getItem("token");

      if(!token){
        Alert.alert(
          "Login Required",
          "Please login first to like this song,",
          [
            {
              text: "Cancel",
              style:"cancel",              
            },{
              text:"OK",
              onPress: () => router.push("/(auth)/login"),
            }
          ]
        );
        return;
      }
      
      const response = await fetch(
        `${API_URL}/songs/like`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            song_id: songId,
          }),
        }
      );

      const data = await response.json();

      console.log("LIKED SONG RESPONSE:", data);

      if(response.ok) {
        setRecentSongs((previousSongs) =>
          previousSongs.map((song) =>
            song.id === songId
              ? {
                  ...song,
                  is_liked: data.is_liked,
                  like_count: data.is_liked
                    ? (song.like_count ?? 0) + 1
                    : Math.max(0, (song.like_count ?? 0) - 1),
                }
              : song
          )
        );
      }

    }catch(error){
      console.log("Like song error:", error);
    }
  }

  return (
    <View>
      <ImageBackground
        source={require("../../assets/images/popularSongs4.jpg")}
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
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 18,
            paddingRight: 18,
          }}
          style={{ marginTop: 14 }}
        >

            <ImageBackground
              source={require("../../assets/images/popularSongs3.jpg")}
              style={styles.songlist}
              imageStyle={styles.songImage}
            >
              <View style={styles.songOverlay}>
                <View style={styles.faithIcon}>
                  <Ionicons
                    name="musical-notes-outline"
                    size={28}
                    color="#fff"
                  />
                </View>

                <Pressable 
                  style={styles.readBadge}
                  onPress={() =>
                    router.push({
                      pathname: "/song-category",
                      params: { language: "english" },
                    })
                  }
                >
                  <View>
                    <Text style={styles.readText}>English</Text>

                    <Text style={styles.readSubText}>Praise & Worship</Text>
                  </View>

                  <Animated.View
                    style={{
                      transform: [{ translateX: arrowAnimation }],
                    }}
                  >
                    <Feather
                      name="arrow-right"
                      size={24}
                      color={COLORS.primary}
                    />
                  </Animated.View>
                </Pressable>
              </View>
            </ImageBackground>

          <ImageBackground
            source={require("../../assets/images/popularSongs3.jpg")}
            style={styles.songlist}
            imageStyle={styles.songImage}
          >
            <View style={styles.songOverlay}>
              <View style={styles.faithIcon}>
                <Ionicons name="musical-notes-outline" size={28} color="#fff" />
              </View>

              <Pressable 
                  style={styles.readBadge}
                  onPress={() =>
                    router.push({
                      pathname: "/song-category",
                      params: { language: "nepali" },
                    })
                  }
                >
                <View>
                  <Text style={styles.readText}>Nepali</Text>

                  <Text style={styles.readSubText}>Praise & Worship</Text>
                </View>

                <Animated.View
                    style={{
                      transform: [{ translateX: arrowAnimation }],
                    }}
                  >
                    <Feather
                      name="arrow-right"
                      size={24}
                      color={COLORS.primary}
                    />
                  </Animated.View>
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

              <Pressable 
                  style={styles.readBadge}
                  onPress={() =>
                    router.push({
                      pathname: "/song-category",
                      params: { language: "hindi" },
                    })
                  }
                >
                <View>
                  <Text style={styles.readText}>Hindi</Text>

                  <Text style={styles.readSubText}>Praise & Worship</Text>
                </View>

                <Animated.View
                    style={{
                      transform: [{ translateX: arrowAnimation }],
                    }}
                  >
                    <Feather
                      name="arrow-right"
                      size={24}
                      color={COLORS.primary}
                    />
                  </Animated.View>
              </Pressable>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>

      <View style={styles.blogSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Songs</Text>

          <Pressable style={styles.viewAll}>
            <Text style={styles.viewAllText}>View All</Text>

            <MaterialIcons
              name="navigate-next"
              size={18}
              color={COLORS.secondary}
            />
          </Pressable>
        </View>
        
        <ScrollView>
          {recentSongs.map((song) => (
            <Pressable
              key={song.id}
              style={styles.prayerCard}
              onPress={() =>
                router.push({
                  pathname: "/full-song",
                  params: {
                    id: String(song.id),
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
                        : require("../../assets/images/popularSongs4.jpg")
                    }
                    style={styles.prayerImage}
                  />
                </View>

                <View style={styles.prayerDetails}>
                  <View style={styles.prayerTopRow}>
                    <Text
                      style={styles.prayerTitle}
                      numberOfLines={2}
                    >
                      {song.song_title}
                    </Text>

                    <Pressable style={styles.saveButton}
                      onPress={() => handleFavoriteSong(song.id)}
                    >
                      <Ionicons
                        name={
                          song.is_favorited
                            ? "heart"
                            : "heart-outline"
                        }
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

                    <Text style={styles.prayerAuthor}>
                      By {song.song_author}
                    </Text>

                    <View style={styles.divider} />

                      <Pressable
                        style={styles.like}
                        onPress={() => handleLikeSong(song.id)}
                      >
                        <FontAwesome
                          name={
                            song.is_liked
                              ? "thumbs-up"
                              : "thumbs-o-up"
                          }
                          size={17}
                          color={COLORS.primary}
                        />

                        <Text style={styles.likes}>
                          {song.like_count ?? 0}{" "}
                          {/* {song.is_liked ? "Liked" : "Like"} */}
                        </Text>
                      </Pressable>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>

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
    backgroundColor: "rgba(40, 25, 70, 0.32)",

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
    backgroundColor: "#F9F7FB",
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

  viewAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.secondary,
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
    color: COLORS.primary,
  },

  likes: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
    color: COLORS.primary,
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