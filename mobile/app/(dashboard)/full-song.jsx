import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  EvilIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { COLORS } from "../../constants/colors";
import API_URL from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { File, Paths } from "expo-file-system";

import * as Sharing from "expo-sharing";

const FullSong = () => {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const { width } = useWindowDimensions();

  const [activeTab, setActiveTab] = useState("lyrics");
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
      const fetchSong = async () => {
        try {
          setLoading(true);
  
          const token = await AsyncStorage.getItem("token");

          const response = await fetch(
            `${API_URL}/songs/detail/${id}`,
            {
              headers: {
                Accept: "application/json",
                ...(token && {
                  Authorization: `Bearer ${token}`,
                }),
              },
            }
          );
  
          const data = await response.json();
  
          console.log("FULL SONG API RESPONSE:", data);
  
          setSong(data);
        } catch (error) {
          console.error("FULL SONG ERROR:", error);
        } finally {
          setLoading(false);
        }
      };
  
      if (id) {
        fetchSong();
      }
    }, [id]);

 const handleFavoriteSong = async () => {
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
            song_id: id,
          }),
        }
      );

      const data = await response.json();

      console.log("FULL SONG FAVORITE RESPONSE:", data);

      if (response.ok) {
        setSong((previousSong) => {
          const newFavoriteCount = data.is_favorited
            ? previousSong.favorite_count + 1
            : previousSong.favorite_count - 1;

          return {
            ...previousSong,
            is_favorited: data.is_favorited,
            favorite_count: Math.max(0, newFavoriteCount),
          };
        });
      }
    } catch (error) {
      console.log("Favorite song error:", error);
    }
  };

  const handleLikeSOng = async () => {
    try{
      const token = await AsyncStorage.getItem("token");

      if(!token){
        Alert.alert(
          "Login Required",
          "Please login first to like this song.",
          [
            {
              text:"Cancel",
              style:"cancel",
            },
            {
              text:"OK",
              onPress: () => router.push("/(auth)/login"),
            },
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
            song_id: id,
          }),
        }
      );

      const data = await response.json();

      console.log("FULL SONG LIKED:", data);

      if(response.ok) {
        setSong((previousSong) => {
          const newLikeCount = data.is_liked
            ? previousSong.like_count + 1
            : previousSong.like_count - 1;

          return {
            ...previousSong,
            is_liked: data.is_liked,
            like_count: Math.max(0, newLikeCount),
          };
        });
      }

    }catch(error){
       console.log("Like song error:", error);
    }
  }

const handleDownloadPdf = async () => {
  try {
    const pdfUrl =
      activeTab === "lyrics"
        ? `${API_URL}/songs/${id}/download`
        : `${API_URL}/songs/${id}/download-chords`;

    console.log("ACTIVE TAB:", activeTab);
    console.log("PDF URL:", pdfUrl);

    //gives the current time as a number.
    const timestamp = Date.now();
    const songTitle = song?.song_title || "song";
    const cleanTitle = songTitle.replace(/[^a-zA-Z0-9-_ ]/g, "");

    const fileName =
      activeTab === "lyrics"
        ? `${cleanTitle}_lyrics_${timestamp}.pdf`
        : `${cleanTitle}_chords_${timestamp}.pdf`;

    const destinationFile = new File(
      Paths.document,
      fileName
    );

    const file = await File.downloadFileAsync(
      pdfUrl,
      destinationFile
    );

    console.log("PDF SAVED:", file.uri);

    const isAvailable = await Sharing.isAvailableAsync();

    if (isAvailable) {
      await Sharing.shareAsync(file.uri, {
        mimeType: "application/pdf",
        dialogTitle: "Save PDF",
      });
    } else {
      Alert.alert("Download Complete", "PDF has been saved.");
    }
  } catch (error) {
    console.log("PDF DOWNLOAD ERROR:", error);
    Alert.alert("Download Failed", "Could not download the PDF.");
  }
};


  const getCategoryName = (type) => {
    if (type === "hymn" || type === "chorus") {
      return "Hymn/Chorus";
    }

    return "Others";
  };

  const getLanguageName = (language) => {
    if (language === "english") {
      return "English";
    }

    if (language === "nepali") {
      return "Nepali";
    }

    if (language === "hindi") {
      return "Hindi";
    }

    return language;
  };

  if (loading) {
      return (
        <View
          style={[
            styles.screen,
            {
              paddingTop: insets.top,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text style={styles.loadingText}>
            Loading song...
          </Text>
        </View>
      );
    }
  
    if (!song) {
      return (
        <View
          style={[
            styles.screen,
            {
              paddingTop: insets.top,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text style={styles.loadingText}>
            Song not found.
          </Text>
        </View>
      );
    }
  
    const lyricsHtml = song.description || "";
    const chordsHtml = song.description_chords || "";
    console.log("LYRICS HTML:", lyricsHtml);
    console.log("CHORDS HTML:", chordsHtml);

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
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: insets.bottom + 35,
          },
        ]}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color="#222" />
          </TouchableOpacity>
          <View style={styles.headerPlaceholder} />
        </View>
        <View style={styles.SongHeader}>
          <View style={styles.songImageContainer}>
            <Image
              source={
                song.song_cover
                  ? { uri: song.song_cover }
                  : require("../../assets/images/popularSongs4.jpg")
              }
              style={styles.songImage}
            />
          </View>
          <View style={styles.songDetails}>
            <View style={styles.TopRow}>
              <View style={styles.smallCategoryBadge}>
                <View style={styles.categoryContainer}>
                  <Text style={styles.smallCategoryText}>{getCategoryName(song.song_type)}</Text>
                </View>
                <View style={styles.languageContainer}>
                  <Text style={styles.smalllanguageText}>{getLanguageName(song.song_language)}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.songTitle} numberOfLines={1}>
              {song.song_title}
            </Text>

            <View style={styles.recentLyricsAuthorRow}>
              <Ionicons
                name="person-circle-outline"
                size={19}
                color={COLORS.primary}
              />
              <Text style={styles.recentLyricsAuthor}>By {song.song_author} </Text>
            </View>

            <View style={styles.BottomRow}>
              <View style={styles.smallCategoryBadge}>
                <Pressable style={styles.languageContainer} onPress={handleLikeSOng}>
                  <FontAwesome 
                    name={
                      song.is_liked ? "thumbs-up" :"thumbs-o-up" 
                      } size={17} color={COLORS.primary} />
                  <Text style={styles.smalllanguageText}>{song.like_count ?? 0}</Text>
                </Pressable>
                <Pressable style={styles.languageContainer} onPress={handleFavoriteSong}>
                  <Ionicons
                    name={
                      song.is_favorited
                        ? "heart"
                        : "heart-outline"
                    }
                    size={17}
                    color={COLORS.primary}
                  />
                  <Text style={styles.smalllanguageText}>{song.favorite_count ?? 0}</Text>
                </Pressable>
                <Pressable style={styles.languageContainer} onPress={handleDownloadPdf}>
                  <AntDesign name="download" size={17} color={COLORS.primary} />
                  <Text style={styles.smalllanguageText}>PDF</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actionRow}>
          <Pressable onPress={() => setActiveTab("lyrics")}>
            <Text style={styles.actionText}>Lyrics</Text>

            {activeTab === "lyrics" && <View style={styles.activeIndicator} />}
          </Pressable>

          <Pressable onPress={() => setActiveTab("chords")}>
            <Text style={styles.actionText}>Chords</Text>

            {activeTab === "chords" && <View style={styles.activeIndicator} />}
          </Pressable>
        </View>
        <View style={styles.divider} />
        <View style={styles.songContent}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          >
            <RenderHtml
              contentWidth={width - 36}
              source={{
                html:
                  activeTab === "lyrics"
                    ? lyricsHtml
                    : chordsHtml,
              }}
              tagsStyles={{
                table: {
                  width: "100%",
                },

                td: {
                  fontSize: 15,
                  lineHeight: 25,
                  color: "#333",
                },

                p: {
                  fontSize: 15,
                  lineHeight: 25,
                  color: "#333",
                },
              }}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
export default FullSong;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F9F7FB",
  },

  content: {
    paddingHorizontal: 18,
  },

  header: {
    height: 56,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

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
    width: 42,
  },

  SongHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 2,
    marginTop: 20,
  },

  songImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 16,
    overflow: "hidden",
  },

  songImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  songDetails: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
    minWidth: 0,
  },

  TopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },

  BottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  smallCategoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "#F0ECF7",
  },

  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "#F0ECF7",
  },

  smallCategoryText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.primary,
  },

  smalllanguageText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.primary,
    marginLeft: 4,
  },

  songTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
  },

  recentLyricsAuthorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },

  recentLyricsAuthor: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  actionRow: {
    flexDirection: "row",

    gap: 20,

    marginTop: 24,
    paddingHorizontal: 2,
  },

  actionText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
  },

  //   divider: {
  //     width:"100%",
  //     height: 3,
  //     borderRadius: 3,
  //     backgroundColor: "#e8e6eb",
  //     alignSelf: "center",
  //     marginVertical:5,

  //   },

  songContent: {
    padding: 5,
  },

  lyricsText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6F7480",
  },
  activeIndicator: {
    height: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
});