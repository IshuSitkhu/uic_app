import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { COLORS } from "../../constants/colors";

const QuestionContent = () => {
  return (
    <View>
      <ImageBackground
        source={require("../../assets/images/question.jpg")}
        style={styles.featuredBlog}
        imageStyle={styles.featuredBlogImage}
      >
        <View style={styles.featuredOverlay}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>Featured Question</Text>
          </View>

          <Text style={styles.featuredTitle}>
            How can i grow{"\n"}stronger in my faith?
          </Text>

          <Text style={styles.featuredDescription}>
            Discover practical ways to build a{"\n"}
            deeper relationship with God everyday.
          </Text>

          <Pressable style={styles.readBadge}>
            <Text style={styles.readText}>Read Answers</Text>

            <Feather name="arrow-right" size={18} color={COLORS.primary} />
          </Pressable>
        </View>
      </ImageBackground>

      <View style={styles.blogSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Questions</Text>

          <Pressable style={styles.viewAll}>
            <Text style={styles.viewAllText}>View All</Text>

            <MaterialIcons
              name="navigate-next"
              size={18}
              color={COLORS.secondary}
            />
          </Pressable>
        </View>

        <Pressable style={styles.blogCard}>
          <View style={styles.blogContent}>
            <View style={styles.blogDetails}>
              <View style={styles.blogTopRow}>
                <View style={styles.smallCategoryBadge}>
                  <Text style={styles.smallCategoryText}>Church</Text>
                </View>

                <Pressable style={styles.saveButton}>
                  <Feather name="bookmark" size={17} color={COLORS.primary} />
                </Pressable>
              </View>

              <Text style={styles.blogTitle} numberOfLines={2}>
                How can I understnad the Bible better?
              </Text>

              <Text style={styles.blogDescription} numberOfLines={3}>
                I want to read the Bible and understand it better. Can you give
                me some tips?
              </Text>

              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <View style={styles.authorRow}>
                  <Ionicons
                    name="person-circle-outline"
                    size={32}
                    color={COLORS.primary}
                  />

                  <View>
                    <Text style={styles.blogAuthor}>Sarah Johnson</Text>

                    <Text style={styles.authorDate}>2 days ago</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Pressable>

        <Pressable style={styles.blogCard}>
          <View style={styles.blogContent}>
            <View style={styles.blogDetails}>
              <View style={styles.blogTopRow}>
                <View style={styles.smallCategoryBadge}>
                  <Text style={styles.smallCategoryText}>Church</Text>
                </View>

                <Pressable style={styles.saveButton}>
                  <Feather name="bookmark" size={17} color={COLORS.primary} />
                </Pressable>
              </View>

              <Text style={styles.blogTitle} numberOfLines={2}>
                How can I understnad the Bible better?
              </Text>

              <Text style={styles.blogDescription} numberOfLines={3}>
                I want to read the Bible and understand it better. Can you give
                me some tips?
              </Text>

              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <View style={styles.authorRow}>
                  <Ionicons
                    name="person-circle-outline"
                    size={32}
                    color={COLORS.primary}
                  />

                  <View>
                    <Text style={styles.blogAuthor}>Sarah Johnson</Text>

                    <Text style={styles.authorDate}>2 days ago</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Pressable>

        <Pressable style={styles.blogCard}>
          <View style={styles.blogContent}>
            <View style={styles.blogDetails}>
              <View style={styles.blogTopRow}>
                <View style={styles.smallCategoryBadge}>
                  <Text style={styles.smallCategoryText}>Church</Text>
                </View>

                <Pressable style={styles.saveButton}>
                  <Feather name="bookmark" size={17} color={COLORS.primary} />
                </Pressable>
              </View>

              <Text style={styles.blogTitle} numberOfLines={2}>
                How can I understnad the Bible better?
              </Text>

              <Text style={styles.blogDescription} numberOfLines={3}>
                I want to read the Bible and understand it better. Can you give
                me some tips?
              </Text>

              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <View style={styles.authorRow}>
                  <Ionicons
                    name="person-circle-outline"
                    size={32}
                    color={COLORS.primary}
                  />

                  <View>
                    <Text style={styles.blogAuthor}>Sarah Johnson</Text>

                    <Text style={styles.authorDate}>2 days ago</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </View>

      <View style={styles.AskQuestion}>
        <Text style={styles.QuestionTitle}>Have something on your Heart?</Text>

        <Text style={styles.questionDescription}>
          Share your question and let the community encourage you with
          faith-filled answers.
        </Text>

        <Pressable style={styles.questionBadge}>
          <Text style={styles.questionText}>Ask a Question</Text>
        </Pressable>
      </View>

      <View style={styles.blogSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Questions</Text>

          <Pressable style={styles.viewAll}>
            <Text style={styles.viewAllText}>View All</Text>

            <MaterialIcons
              name="navigate-next"
              size={18}
              color={COLORS.secondary}
            />
          </Pressable>
        </View>

        <Pressable style={styles.blogCard}>
          <View style={styles.blogContent}>
            <View style={styles.blogDetails}>
              <View style={styles.blogTopRow}>
                <View style={styles.smallCategoryBadge}>
                  <Text style={styles.smallCategoryText}>Church</Text>
                </View>

                <Pressable style={styles.saveButton}>
                  <Feather name="bookmark" size={17} color={COLORS.primary} />
                </Pressable>
              </View>

              <Text style={styles.blogTitle} numberOfLines={2}>
                How can I understnad the Bible better?
              </Text>

              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <View style={styles.authorRow}>
                  <Ionicons
                    name="person-circle-outline"
                    size={32}
                    color={COLORS.primary}
                  />

                  <View>
                    <Text style={styles.blogAuthor}>Sarah Johnson</Text>

                    <Text style={styles.authorDate}>2 days ago</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Pressable>

        <Pressable style={styles.blogCard}>
          <View style={styles.blogContent}>
            <View style={styles.blogDetails}>
              <View style={styles.blogTopRow}>
                <View style={styles.smallCategoryBadge}>
                  <Text style={styles.smallCategoryText}>Church</Text>
                </View>

                <Pressable style={styles.saveButton}>
                  <Feather name="bookmark" size={17} color={COLORS.primary} />
                </Pressable>
              </View>

              <Text style={styles.blogTitle} numberOfLines={2}>
                How can I understnad the Bible better?
              </Text>

              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <View style={styles.authorRow}>
                  <Ionicons
                    name="person-circle-outline"
                    size={32}
                    color={COLORS.primary}
                  />

                  <View>
                    <Text style={styles.blogAuthor}>Sarah Johnson</Text>

                    <Text style={styles.authorDate}>2 days ago</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Pressable>

        <Pressable style={styles.blogCard}>
          <View style={styles.blogContent}>
            <View style={styles.blogDetails}>
              <View style={styles.blogTopRow}>
                <View style={styles.smallCategoryBadge}>
                  <Text style={styles.smallCategoryText}>Church</Text>
                </View>

                <Pressable style={styles.saveButton}>
                  <Feather name="bookmark" size={17} color={COLORS.primary} />
                </Pressable>
              </View>

              <Text style={styles.blogTitle} numberOfLines={2}>
                How can I understnad the Bible better?
              </Text>

              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <View style={styles.authorRow}>
                  <Ionicons
                    name="person-circle-outline"
                    size={32}
                    color={COLORS.primary}
                  />

                  <View>
                    <Text style={styles.blogAuthor}>Sarah Johnson</Text>

                    <Text style={styles.authorDate}>2 days ago</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default QuestionContent;

const styles = StyleSheet.create({
  featuredBlog: {
    width: "100%",
    minHeight: 230,
    borderRadius: 20,
    overflow: "hidden",
  },

  featuredBlogImage: {
    resizeMode: "cover",
    // opacity: 0.8,
  },

  featuredOverlay: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 28,
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
    backgroundColor: "#f9f7fb",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  readText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.primary,
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
    marginTop: 5,
  },

  authorDate: {
    marginTop: 2,
    marginLeft: 2,
    fontSize: 11,
    color: "#424141",
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

  blogCard: {
    marginTop: 14,
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
    height: 145,
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
    // marginLeft: 12,
  },

  blogTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  smallCategoryBadge: {
    backgroundColor: "#bcd8e9",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 15,
  },

  smallCategoryText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#49718a",
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
    fontSize: 12,
    lineHeight: 18,
    color: "#666",
    marginBottom: 10,
    marginTop: 10,
  },

  blogAuthorRow: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 10,
  },

  blogAuthor: {
    marginLeft: 2,
    fontSize: 12,
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

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginVertical: 10,
  },

  commentButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  commentCount: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "500",
  },

  AskQuestion: {
    height: 180,
    backgroundColor: COLORS.primary,
    // paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: -15,
  },

  QuestionTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "600",
    color: "#fff",
    margin: 15,
  },

  questionDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 10,
  },

  questionBadge: {
    backgroundColor: "#f9f7fb",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    margin: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  questionText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },
});
