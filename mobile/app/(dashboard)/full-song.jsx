import { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import {
    EvilIcons,
    Ionicons
} from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";

const FullSong = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("lyrics");

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
              source={require("../../assets/images/popularSongs2.jpg")}
              style={styles.songImage}
            />
          </View>
          <View style={styles.songDetails}>
            <View style={styles.TopRow}>
              <View style={styles.smallCategoryBadge}>
                <View style={styles.categoryContainer}>
                  <Text style={styles.smallCategoryText}>Hymn/Chorus</Text>
                </View>
                <View style={styles.languageContainer}>
                  <Text style={styles.smalllanguageText}>English</Text>
                </View>
              </View>
            </View>

            <Text style={styles.songTitle} numberOfLines={1}>
              I Love You Lord
            </Text>

            <View style={styles.recentLyricsAuthorRow}>
              <Ionicons
                name="person-circle-outline"
                size={19}
                color={COLORS.primary}
              />
              <Text style={styles.recentLyricsAuthor}>By Laurie Kliein</Text>
            </View>

            <View style={styles.BottomRow}>
              <View style={styles.smallCategoryBadge}>
                <View style={styles.categoryContainer}>
                  <EvilIcons name="like" size={19} color={COLORS.primary} />
                  <Text style={styles.smallCategoryText}>03</Text>
                </View>
                <View style={styles.languageContainer}>
                  <Ionicons
                    name="heart-outline"
                    size={17}
                    color={COLORS.primary}
                  />
                  <Text style={styles.smalllanguageText}>03</Text>
                </View>
                <View style={styles.languageContainer}>
                  <AntDesign name="download" size={17} color={COLORS.primary} />
                  <Text style={styles.smalllanguageText}>PDF</Text>
                </View>
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
            // horizontal
            showsVerticalScrollIndicator={false}>
            {activeTab === "lyrics" ? (
              <Text style={styles.lyricsText}>
                Verse 1{"\n"}I love You Lord{"\n"}
                Oh Your mercy never fails me{"\n"}
                All my days{"\n"}
                I’ve been held in Your hands{"\n"}
                From the moment that I wake up{"\n"}
                Until I lay my head{"\n"}I will sing of the goodness of God
                {"\n"}
                {"\n"}
                Chorus{"\n"}
                All my life You have been faithful{"\n"}
                All my life You have been so, so good{"\n"}
                With every breath that I am able{"\n"}I will sing of the
                goodness of God{"\n"}
                {"\n"}
                Verse 2{"\n"}I love Your voice{"\n"}
                You have led me through the fire{"\n"}
                In darkest nights{"\n"}
                You are close like no other{"\n"}
                I’ve known You as a father{"\n"}
                I’ve known You as a friend{"\n"}I have lived in the goodness of
                God{"\n"}
                {"\n"}
                Bridge Your goodness is running after, it’s running after me
                Your goodness is running after, it’s running after me With my
                life laid down, I’m surrendered now, I give You everything Your
                goodness is running after, it’s running after me
              </Text>
            ) : (
              <Text style={styles.lyricsText}>chords here...</Text>
            )}
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
