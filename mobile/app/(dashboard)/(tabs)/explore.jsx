import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRef, useState } from "react";
import {
    Dimensions,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../constants/colors";

import BlogContent from "../../../components/explore/BlogContent";
import PrayerContent from "../../../components/explore/PrayerContent";
import QuestionContent from "../../../components/explore/QuestionContent";
import SongContent from "../../../components/explore/SongContent";

const screenWidth = Dimensions.get("window").width;

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("blogs");

  // const renderContent = () => {
  //     switch (selectedCategory) {
  //         case "blogs":
  //             return <BlogContent />;

  //         case "prayers":
  //             return <PrayerContent />;

  //         case "songs":
  //             return <SongContent />;

  //         case "questions":
  //             return <QuestionContent />;

  //         default:
  //             return <BlogContent />;
  //     }
  // };

  const contentScrollRef = useRef(null);

  const categories = ["blogs", "prayers", "songs", "questions"];

  const handleCategoryPress = (category) => {
    const index = categories.indexOf(category);

    setSelectedCategory(category);

    contentScrollRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 50 : 5,
        }}
      >
        {/* <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>

                    

                </View> */}
        <View style={styles.exploreTitle}>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>
            Growth in faith. Be inspired. Walk with God.
          </Text>
        </View>

        <View style={styles.categoryContainer}>
          <CategoryButton
            icon="clipboard-list"
            title="Blogs"
            active={selectedCategory === "blogs"}
            // onPress={() => setSelectedCategory("blogs")}
            onPress={() => handleCategoryPress("blogs")}
          />

          <CategoryButton
            icon="praying-hands"
            title="Prayers"
            active={selectedCategory === "prayers"}
            onPress={() => handleCategoryPress("prayers")}
          />

          <CategoryButton
            icon="music"
            title="Songs"
            active={selectedCategory === "songs"}
            onPress={() => handleCategoryPress("songs")}
          />

          <CategoryButton
            icon="question"
            title="Questions"
            active={selectedCategory === "questions"}
            onPress={() => handleCategoryPress("questions")}
          />
        </View>

        {/* SELECTED CONTENT */}
        {/* <View style={styles.content}>
                    {renderContent()}
                </View> */}

        <View style={styles.content}>
          <ScrollView
            ref={contentScrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / screenWidth,
              );

              setSelectedCategory(categories[index]);
            }}
          >
            <View style={styles.page}>
              <BlogContent />
            </View>

            <View style={styles.page}>
              <PrayerContent />
            </View>

            <View style={styles.page}>
              <SongContent />
            </View>

            <View style={styles.page}>
              <QuestionContent />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const CategoryButton = ({ icon, title, active, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.categoryButton, active && styles.categoryButtonActive]}
    >
      <FontAwesome5
        name={icon}
        size={14}
        color={active ? "#fff" : COLORS.primary}
      />

      <Text style={[styles.categoryText, active && styles.categoryTextActive]}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f9f7fb",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },

  // exploreTitle:{
  //   margin:25,
  // },

  title: {
    marginHorizontal: 25,
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    marginTop: 15,
  },

  subtitle: {
    marginHorizontal: 25,
    fontSize: 14,
    color: "#777",
    marginVertical: 10,
  },

  categoryContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    // gap: 2,
    backgroundColor: "#f9f7fb",
    paddingVertical: 10,
    //
    borderRadius: 50,
    marginHorizontal: 8,
  },

  categoryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    paddingVertical: 8,
    // paddingHorizontal: 12,
    borderRadius: 25,

    // backgroundColor: "#F3F0F8",
  },

  categoryButtonActive: {
    backgroundColor: COLORS.primary,
  },

  categoryText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.primary,
  },

  categoryTextActive: {
    color: "#fff",
  },

  content: {
    paddingTop: 20,
  },

  page: {
    width: screenWidth,
    paddingHorizontal: 25,
  },

  backButton: {
    position: "absolute",
    top: 20,
    left: 25,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,

    // Android shadow
    elevation: 2,
  },
});
