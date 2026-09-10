import {
    EvilIcons,
    Feather,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";

const PrayerDetail = () => {
  const insets = useSafeAreaInsets();

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

          <Text style={styles.title}>Prayer</Text>

          <View style={styles.headerPlaceholder} />
        </View>

        <View style={styles.prayerSection}>
          <View style={styles.prayerHeader}>
            <View style={styles.smallCategoryBadge}>
              <Text style={styles.smallCategoryText}>Friend</Text>
            </View>

            <View style={styles.dateContainer}>
              <EvilIcons name="calendar" size={19} color={COLORS.secondary} />

              <Text style={styles.prayerDate}>Aug 10, 2025</Text>
            </View>
          </View>

          <Text style={styles.prayerTitle}>
            Trusting God in Uncertain Times and Resurrection in your Life
          </Text>

          <View style={styles.divider} />

          <Text style={styles.prayerDescription}>
            And it came to pass, when all the people were clean passed over
            Jordan, that the Lord spake unto Joshua, saying,
          </Text>

          <View style={styles.authorActionRow}>
            <View style={styles.blogAuthorRow}>
              <Ionicons
                name="person-circle-outline"
                size={31}
                color={COLORS.primary}
              />

              <Text style={styles.blogAuthor}>By William</Text>
            </View>

            <Pressable
              style={styles.saveButton}
              //   android_ripple={{ color: "#ddd" }}
            >
              <Feather name="bookmark" size={17} color={COLORS.primary} />
              <Text style={styles.saveText}>Save</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.actionRow}>
          <Pressable style={styles.readBadge}>
            <MaterialCommunityIcons name="hands-pray" size={21} color="#fff" />

            <Text style={styles.prayerText}>Pray for This</Text>
          </Pressable>

          <Pressable style={styles.shareBadge}>
            <EvilIcons name="share-google" size={24} color={COLORS.primary} />

            <Text style={styles.shareText}>Share Prayer</Text>
          </Pressable>
        </View>

        <View style={styles.prayerContinueSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continue in Prayer</Text>

            <Pressable style={styles.viewAll}>
              <Text style={styles.viewAllText}>See All</Text>

              <MaterialIcons
                name="navigate-next"
                size={19}
                color={COLORS.secondary}
              />
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalCards}
          >
            <Pressable style={styles.prayerCard}>
              <View style={styles.prayerDetails}>
                <View style={styles.prayerTopRow}>
                  <View style={styles.smallCategoryBadge}>
                    <Text style={styles.smallCategoryText}>Motivation</Text>
                  </View>

                  <Pressable style={styles.cardSaveButton}>
                    <Feather name="bookmark" size={17} color={COLORS.primary} />
                  </Pressable>
                </View>

                <Text style={styles.cardTitle} numberOfLines={2}>
                  Pray for World Due to War
                </Text>

                <View style={styles.cardDateContainer}>
                  <EvilIcons
                    name="calendar"
                    size={19}
                    color={COLORS.secondary}
                  />

                  <Text style={styles.prayerDate}>Aug 10, 2025</Text>
                </View>

                <Text style={styles.cardDescription} numberOfLines={2}>
                  Lord guide my heart and steps today. Give me peace and
                  strength.
                </Text>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.blogAuthorRow}>
                  <Ionicons
                    name="person-circle-outline"
                    size={30}
                    color={COLORS.primary}
                  />

                  <Text style={styles.blogAuthor}>By William</Text>
                </View>

                <Pressable style={styles.readFullBadge}>
                  <Text style={styles.readFullText}>Read Full Prayer</Text>

                  <Feather name="arrow-right" size={16} color="#fff" />
                </Pressable>
              </View>
            </Pressable>
            <Pressable style={styles.prayerCard}>
              <View style={styles.prayerDetails}>
                <View style={styles.prayerTopRow}>
                  <View style={styles.smallCategoryBadge}>
                    <Text style={styles.smallCategoryText}>Motivation</Text>
                  </View>

                  <Pressable style={styles.cardSaveButton}>
                    <Feather name="bookmark" size={17} color={COLORS.primary} />
                  </Pressable>
                </View>

                <Text style={styles.cardTitle} numberOfLines={2}>
                  Pray for World Due to War
                </Text>

                <View style={styles.cardDateContainer}>
                  <EvilIcons
                    name="calendar"
                    size={19}
                    color={COLORS.secondary}
                  />

                  <Text style={styles.prayerDate}>Aug 10, 2025</Text>
                </View>

                <Text style={styles.cardDescription} numberOfLines={2}>
                  Lord guide my heart and steps today. Give me peace and
                  strength.
                </Text>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.blogAuthorRow}>
                  <Ionicons
                    name="person-circle-outline"
                    size={30}
                    color={COLORS.primary}
                  />

                  <Text style={styles.blogAuthor}>By William</Text>
                </View>

                <Pressable style={styles.readFullBadge}>
                  <Text style={styles.readFullText}>Read Full Prayer</Text>

                  <Feather name="arrow-right" size={16} color="#fff" />
                </Pressable>
              </View>
            </Pressable>
            <Pressable style={styles.prayerCard}>
              <View style={styles.prayerDetails}>
                <View style={styles.prayerTopRow}>
                  <View style={styles.smallCategoryBadge}>
                    <Text style={styles.smallCategoryText}>Motivation</Text>
                  </View>

                  <Pressable style={styles.cardSaveButton}>
                    <Feather name="bookmark" size={17} color={COLORS.primary} />
                  </Pressable>
                </View>

                <Text style={styles.cardTitle} numberOfLines={2}>
                  Pray for World Due to War
                </Text>

                <View style={styles.cardDateContainer}>
                  <EvilIcons
                    name="calendar"
                    size={19}
                    color={COLORS.secondary}
                  />

                  <Text style={styles.prayerDate}>Aug 10, 2025</Text>
                </View>

                <Text style={styles.cardDescription} numberOfLines={2}>
                  Lord guide my heart and steps today. Give me peace and
                  strength.
                </Text>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.blogAuthorRow}>
                  <Ionicons
                    name="person-circle-outline"
                    size={30}
                    color={COLORS.primary}
                  />

                  <Text style={styles.blogAuthor}>By William</Text>
                </View>

                <Pressable style={styles.readFullBadge}>
                  <Text style={styles.readFullText}>Read Full Prayer</Text>

                  <Feather name="arrow-right" size={16} color="#fff" />
                </Pressable>
              </View>
            </Pressable>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrayerDetail;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F9F7FB",
  },

  content: {
    paddingHorizontal: 18,
  },

  header: {
    height: 52,
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

  prayerSection: {
    marginTop: 18,
    padding: 19,

    backgroundColor: "#EDE8F7",
    borderRadius: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,

    elevation: 3,
  },

  prayerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  smallCategoryBadge: {
    backgroundColor: "#F4E0E0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },

  smallCategoryText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#C45A5A",
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  prayerDate: {
    fontSize: 11,
    color: COLORS.secondary,
    marginLeft: 3,
    fontWeight: "600",
  },

  prayerTitle: {
    marginTop: 17,

    fontSize: 19,
    lineHeight: 25,
    fontWeight: "700",
    color: "#222",
  },

  divider: {
    width: 52,
    height: 2,
    borderRadius: 2,

    backgroundColor: COLORS.secondary,

    marginTop: 10,
  },

  prayerDescription: {
    color: "#646262",
    fontSize: 14,
    lineHeight: 21,

    marginTop: 12,
  },

  authorActionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginTop: 17,
  },

  blogAuthorRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  blogAuthor: {
    marginLeft: 5,

    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "600",
  },

  saveButton: {
    minWidth: 62,
    height: 34,

    paddingHorizontal: 9,

    borderRadius: 17,

    // backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",
  },

  saveText: {
    fontSize: 12,
    color: COLORS.secondary,
    marginLeft: 4,
    fontWeight: "600",
  },

  actionRow: {
    flexDirection: "row",

    gap: 10,

    marginTop: 14,
    paddingHorizontal: 2,
  },

  readBadge: {
    flex: 1,

    minHeight: 44,

    backgroundColor: COLORS.secondary,

    borderRadius: 12,

    paddingHorizontal: 12,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 7,
  },

  shareBadge: {
    flex: 1,

    minHeight: 44,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: COLORS.primary,

    borderRadius: 12,

    paddingHorizontal: 12,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 7,
  },

  prayerText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  shareText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primary,
  },

  prayerContinueSection: {
    marginTop: 30,
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

    paddingVertical: 5,
  },

  viewAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.secondary,
  },

  horizontalCards: {
    paddingTop: 14,
    paddingRight: 18,
    gap: 20,
  },

  prayerCard: {
    width: 290,

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    overflow: "hidden",

    // shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.09,
    shadowRadius: 7,

    elevation: 1,
  },

  prayerDetails: {
    padding: 15,
    paddingBottom: 17,
  },

  prayerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardSaveButton: {
    width: 34,
    height: 34,

    borderRadius: 17,

    backgroundColor: "#F6F3FA",

    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: {
    marginTop: 13,

    fontSize: 17,
    lineHeight: 22,
    fontWeight: "700",
    color: "#222",
  },

  cardDateContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 9,
  },

  cardDescription: {
    color: "#646262",

    fontSize: 12,
    lineHeight: 18,

    marginTop: 9,
  },

  cardFooter: {
    minHeight: 58,

    backgroundColor: "#EDE8F7",

    paddingHorizontal: 13,
    paddingVertical: 10,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  readFullBadge: {
    backgroundColor: COLORS.primary,

    minHeight: 34,

    paddingHorizontal: 10,

    borderRadius: 17,

    flexDirection: "row",
    alignItems: "center",

    gap: 5,
  },

  readFullText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
