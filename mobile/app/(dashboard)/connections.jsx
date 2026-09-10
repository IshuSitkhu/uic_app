import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";

import API_URL from "../../services/api";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
const { width } = Dimensions.get("window");

export default function Connections() {
  const insets = useSafeAreaInsets();
  const { tab } = useLocalSearchParams();

  const [activeTab, setActiveTab] = useState(tab || "friends");

  const [friends, setFriends] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  const listRef = useRef(null);

  const tabs = [
    {
      key: "friends",
      label: "Friends",
    },
    {
      key: "followers",
      label: "Followers",
    },
    {
      key: "following",
      label: "Following",
    },
  ];

  useEffect(() => {
    fetchConnections();
  }, []);

  useEffect(() => {
    const index = tabs.findIndex((item) => item.key === activeTab);

    if (index !== -1 && listRef.current) {
      listRef.current.scrollToIndex({
        index,
        animated: true,
      });
    }
  }, [activeTab]);

  const fetchConnections = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };

      const [friendsRes, followersRes, followingRes, requestsRes] =
        await Promise.all([
          fetch(`${API_URL}/user/friends`, { headers }),
          fetch(`${API_URL}/user/followers`, { headers }),
          fetch(`${API_URL}/user/following`, { headers }),
          fetch(`${API_URL}/user/friend-requests`, { headers }),
        ]);

      const friendsData = await friendsRes.json();
      const followersData = await followersRes.json();
      const followingData = await followingRes.json();
      const requestsData = await requestsRes.json();

      if (friendsData.success) {
        setFriends(friendsData.friends || []);
      }

      if (followersData.success) {
        setFollowers(followersData.followers || []);
      }

      if (followingData.success) {
        setFollowing(followingData.following || []);
      }
      if (requestsData.success) {
        setRequests(requestsData.requests || []);
      }
    } catch (error) {
      console.log("Error fetching connections:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabPress = (tabKey) => {
    setActiveTab(tabKey);
  };

  const handleSwipe = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(
      offsetX / event.nativeEvent.layoutMeasurement.width,
    );

    if (tabs[index]) {
      setActiveTab(tabs[index].key);
    }
  };

  const getUsers = (tabKey) => {
    if (tabKey === "friends") {
      return friends;
    }

    if (tabKey === "followers") {
      return followers;
    }

    return following;
  };

  const renderUser = ({ item }) => {
    const user = item.userdetails;

    if (!user) {
      return null;
    }

    return (
      <Pressable
        style={({ pressed }) => [styles.userCard, pressed && styles.pressed]}
        onPress={() => {
          router.push({
            pathname: "/user-profile",
            params: {
              userId: user.id,
            },
          });
        }}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.name?.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>

          <Text style={styles.username}>@{user.username}</Text>
        </View>

        <Ionicons name="chevron-forward-outline" size={20} color="#999" />
      </Pressable>
    );
  };

  const renderTabList = (tabKey) => {
    const users = getUsers(tabKey);

    return (
      <View style={styles.page}>
        <FlatList
          data={users}
          keyExtractor={(item) => String(item.user_id || item.userdetails?.id)}
          renderItem={renderUser}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            users.length === 0 ? styles.emptyContainer : styles.listContent
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No {tabKey} yet.</Text>
          }
        />
      </View>
    );
  };

  const renderFriendsPage = () => {
    return (
      <View style={styles.page}>
        <FlatList
          data={friends}
          keyExtractor={(item) => String(item.user_id || item.userdetails?.id)}
          renderItem={renderUser}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            friends.length === 0 && requests.length === 0
              ? styles.emptyContainer
              : styles.listContent
          }
          ListHeaderComponent={
            requests.length > 0 ? (
              <View>
                <Text style={styles.sectionTitle}>Friend Requests</Text>

                {requests.slice(0, 2).map((request) => {
                  const requester = request.userdetails;

                  if (!requester) {
                    return null;
                  }

                  return (
                    <View key={request.id} style={styles.requestCard}>
                      {/* USER INFO */}
                      <Pressable
                        style={styles.requestUser}
                        onPress={() =>
                          router.push({
                            pathname: "/user-profile",
                            params: {
                              userId: requester.id,
                            },
                          })
                        }
                      >
                        <View style={styles.avatar}>
                          <Text style={styles.avatarText}>
                            {requester.name?.charAt(0).toUpperCase()}
                          </Text>
                        </View>

                        <View style={styles.userInfo}>
                          <Text style={styles.userName}>{requester.name}</Text>

                          <Text style={styles.username}>
                            @{requester.username}
                          </Text>
                        </View>
                      </Pressable>

                      {/* ACCEPT / REJECT */}
                      <View style={styles.requestButtons}>
                        <Pressable
                          style={styles.acceptButton}
                          onPress={() => handleAcceptRequest(request.id)}
                        >
                          <Text style={styles.acceptText}>Accept</Text>
                        </Pressable>

                        <Pressable
                          style={styles.rejectButton}
                          onPress={() => handleRejectRequest(request.id)}
                        >
                          <Text style={styles.rejectText}>Reject</Text>
                        </Pressable>
                      </View>
                    </View>
                  );
                })}

                {/* SEE ALL */}
                {requests.length > 2 && (
                  <Pressable
                    style={styles.seeAllButton}
                    onPress={() => router.push("/friend-requests")}
                  >
                    <Text style={styles.seeAllText}>See All</Text>
                  </Pressable>
                )}

                {/* FRIENDS TITLE */}
                <Text style={styles.sectionTitle}>Friends</Text>
              </View>
            ) : null
          }
          ListEmptyComponent={
            requests.length === 0 ? (
              <Text style={styles.emptyText}>No friends yet.</Text>
            ) : null
          }
        />
      </View>
    );
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/user/friend-requests/${requestId}/accept`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const data = await response.json();

      if (!data.success) {
        console.log("Accept request failed:", data);
        return;
      }

      // Remove the accepted request from the request list
      setRequests((prev) => prev.filter((request) => request.id !== requestId));

      // Refresh friends list
      const friendsResponse = await fetch(`${API_URL}/user/friends`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const friendsData = await friendsResponse.json();

      if (friendsData.success) {
        setFriends(friendsData.friends || []);
      }
    } catch (error) {
      console.log("Accept request error:", error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/user/friend-requests/${requestId}/reject`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const data = await response.json();

      if (!data.success) {
        console.log("Reject request failed:", data);
        return;
      }

      // Remove the rejected request from the screen
      setRequests((prev) => prev.filter((request) => request.id !== requestId));
    } catch (error) {
      console.log("Reject request error:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F9F7FB",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>

        <Text style={styles.title}>Connections</Text>

        <View style={styles.headerSpacer} />
      </View>

      {/* TABS */}
      <View style={styles.tabsContainer}>
        {tabs.map((item) => (
          <Pressable
            key={item.key}
            style={styles.tabButton}
            onPress={() => handleTabPress(item.key)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === item.key && styles.activeTabText,
              ]}
            >
              {item.label}
            </Text>

            {activeTab === item.key && <View style={styles.activeIndicator} />}
          </Pressable>
        ))}
      </View>

      {/* CONTENT */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          ref={listRef}
          data={tabs}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) =>
            item.key === "friends"
              ? renderFriendsPage()
              : renderTabList(item.key)
          }
          onMomentumScrollEnd={handleSwipe}
          initialScrollIndex={Math.max(
            0,
            tabs.findIndex((item) => item.key === activeTab),
          )}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  backButton: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  title: {
    fontSize: 19,
    fontWeight: "700",
    color: "#000",
  },

  headerSpacer: {
    width: 40,
  },

  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    position: "relative",
  },

  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888",
  },

  activeTabText: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  activeIndicator: {
    position: "absolute",
    bottom: 0,
    height: 2,
    width: "60%",
    backgroundColor: COLORS.primary,
  },

  page: {
    width: width,
    flex: 1,
  },

  listContent: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 30,
  },

  userCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  pressed: {
    opacity: 0.7,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 19,
    fontWeight: "700",
    color: COLORS.primary,
  },

  userInfo: {
    flex: 1,
    marginLeft: 13,
  },

  userName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },

  username: {
    fontSize: 13,
    color: "#888",
    marginTop: 3,
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    color: "#888",
    fontSize: 14,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  requestCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },

  requestUser: {
    flexDirection: "row",
    alignItems: "center",
  },

  requestButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },

  acceptButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  acceptText: {
    color: "#fff",
    fontWeight: "600",
  },

  rejectButton: {
    flex: 1,
    backgroundColor: "#eee",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  rejectText: {
    color: "#333",
    fontWeight: "600",
  },

  seeAllButton: {
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 16,
  },

  seeAllText: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 15,
  },
});
