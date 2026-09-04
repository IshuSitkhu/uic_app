import { Fontisto, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS } from "../../constants/colors";
import API_URL from "../../services/api";

const savedBible = () => {
  const [savedBible, setSavedBible] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedBible = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("No authentication token found.");
        return;
      }

      const response = await fetch(`${API_URL}/bible/highlights/saved`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("Saved list:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch saved bible");
      }

      setSavedBible(data.savedVerses || []);
    } catch (error) {
      console.error("Error fetching bible:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedBible();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f7fb" }}>
      <View style={styles.screen}>
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
              <Ionicons name="arrow-back" size={23} color="#222" />
            </TouchableOpacity>

            <Text style={styles.title}>Bible Lists</Text>

            <View style={styles.headerPlaceholder} />
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={COLORS.secondary} />

              <Text style={styles.loadingText}>Loading saved verses...</Text>
            </View>
          ) : savedBible.length === 0 ? (
            /* No saved verses */
            <View style={styles.emptyContainer}>
              <Ionicons name="bookmark-outline" size={50} color="#4D3C78" />

              <Text style={styles.emptyTitle}>No Saved Verses</Text>

              <Text style={styles.emptyText}>
                Verses you save while reading the Bible will appear here.
              </Text>
            </View>
          ) : (
            <View style={styles.listContainer}>
              {savedBible.map((item) => (
                <View key={item.id} style={styles.verseCard}>
                  <View style={styles.verseHeader}>
                    <Text style={styles.reference}>
                      {item.book} {item.chapter}:{item.verse}
                    </Text>

                    <Ionicons name="bookmark" size={22} color="#4D3C78" />
                  </View>

                  <View style={styles.verseTextContainer}>
                    <Fontisto
                      name="quote-a-right"
                      size={14}
                      color={COLORS.secondary}
                      style={styles.quoteIcon}
                    />
                    <View>
                      <Text style={styles.verseText}>{item.text}</Text>
                      <Text style={styles.translation}>
                        {item.translation?.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default savedBible;

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
    paddingTop: 25,
    paddingBottom: 28,
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

  listContainer: {
    gap: 12,
  },

  verseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 2,
  },

  verseHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  reference: {
    marginVertical: 8,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.secondary,
  },

  translation: {
    marginTop: 7,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.secondary,
  },

  verseText: {
    // height:60,
    marginTop: 12,
    fontSize: 17,
    lineHeight: 27,
    color: "#333",
    // backgroundColor:COLORS.primary,
  },

  verseContent: {
    flexDirection: "row",
    alignItems: "center",
    //   marginTop: 18,
  },

  verseTextContainer: {
    flex: 1,
    paddingRight: 10,
    flexDirection: "row",
  },
});
