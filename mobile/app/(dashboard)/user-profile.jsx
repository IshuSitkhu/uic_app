import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { COLORS } from "../../constants/colors";
import API_URL from "../../services/api";

export default function UserProfile() {
  const insets = useSafeAreaInsets();
  const { userId } = useLocalSearchParams();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    friends: 0,
    followers: 0,
    following: 0,
  });

  const [relationship, setRelationship] = useState({
    is_following: false,
    is_followed_by: false,
    is_friend: false,
    friend_request_sent: false,
    friend_request_received: false,
    sent_request_id: null,
    received_request_id: null,
  });

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${API_URL}/user/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        setStats(data.stats);
        setRelationship(data.relationship);
      }
    } catch (error) {
      console.log("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleFollow = async () => {
  //   try {
  //     setActionLoading(true);

  //     const token = await AsyncStorage.getItem("token");

  //     const method = relationship.is_following ? "DELETE" : "POST";

  //     const response = await fetch(
  //       `${API_URL}/user/follow/${userId}`,
  //       {
  //         method,
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           Accept: "application/json",
  //         },
  //       }
  //     );

  //     const data = await response.json();

  //     if (response.ok) {
  //       const nowFollowing = !relationship.is_following;

  //       setRelationship((prev) => ({
  //         ...prev,
  //         is_following: nowFollowing,
  //       }));

  //       setStats((prev) => ({
  //         ...prev,
  //         followers: prev.followers + (nowFollowing ? 1 : -1),
  //       }));

  //       Toast.show({
  //         type: "success",
  //         text1: nowFollowing
  //           ? "Followed successfully"
  //           : "Unfollowed successfully",
  //       });
  //     } else {
  //       Toast.show({
  //         type: "error",
  //         text1: data.message || "Something went wrong",
  //       });
  //     }
  //   } catch (error) {
  //     console.log("Follow request failed:", error);

  //     Toast.show({
  //       type: "error",
  //       text1: "Unable to complete request",
  //     });
  //   } finally {
  //     setActionLoading(false);
  //   }
  // };
  // const handleFollow = async () => {
  //   if (actionLoading) return;

  //   try {
  //     setActionLoading(true);

  //     const token = await AsyncStorage.getItem("token");

  //     const response = await fetch(
  //          `${API_URL}/user/follow/${userId}`,
  //       {
  //         method: relationship.is_following ? "DELETE" : "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           Accept: "application/json",
  //         },
  //       }
  //     );

  //     const data = await response.json();

  //     if (!response.ok) {
  //       Toast.show({
  //         type: "error",
  //         text1: "Error",
  //         text2: data.message || "Something went wrong.",
  //       });
  //       return;
  //     }

  //     setRelationship((prev) => ({
  //       ...prev,
  //       is_following: data.is_followed,
  //     }));

  //     setStats((prev) => ({
  //       ...prev,
  //       followers: prev.followers + (data.is_followed ? 1 : -1),
  //     }));

  //     Toast.show({
  //       type: "success",
  //       text1: data.is_followed ? "Following" : "Unfollowed",
  //       text2: data.message,
  //     });
  //   } catch (error) {
  //     console.log("Follow error:", error);

  //     Toast.show({
  //       type: "error",
  //       text1: "Error",
  //       text2: "Unable to complete action.",
  //     });
  //   } finally {
  //     setActionLoading(false);
  //   }
  // };

  const unfollowUser = async () => {
    if (actionLoading) return;

    try {
      setActionLoading(true);

      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${API_URL}/user/follow/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: data.message || "Something went wrong.",
        });
        return;
      }

      setRelationship((prev) => ({
        ...prev,
        is_following: false,
      }));

      setStats((prev) => ({
        ...prev,
        followers: Math.max(0, prev.followers - 1),
      }));

      Toast.show({
        type: "success",
        text1: "Unfollowed",
        text2: data.message,
      });
    } catch (error) {
      console.log("Unfollow error:", error);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Unable to unfollow this user.",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleFollow = async () => {
    if (actionLoading) return;

    // Already following → ask for confirmation
    if (relationship.is_following) {
      Alert.alert(
        "Unfollow User",
        "Are you sure you want to unfollow this user?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Unfollow",
            style: "destructive",
            onPress: unfollowUser,
          },
        ],
      );

      return;
    }

    try {
      setActionLoading(true);

      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${API_URL}/user/follow/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: data.message || "Something went wrong.",
        });
        return;
      }

      setRelationship((prev) => ({
        ...prev,
        is_following: true,
      }));

      setStats((prev) => ({
        ...prev,
        followers: prev.followers + 1,
      }));

      Toast.show({
        type: "success",
        text1: data.is_followed ? "Following" : "Following",
        text2: data.message,
      });
    } catch (error) {
      console.log("Follow error:", error);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Unable to follow this user.",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const unfriendUser = async () => {
    if (actionLoading) return;

    try {
      setActionLoading(true);

      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`${API_URL}/user/friends/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: data.message || "Something went wrong.",
        });
        return;
      }

      // Update relationship
      setRelationship((prev) => ({
        ...prev,
        is_friend: false,
      }));

      // Update friend count immediately
      setStats((prev) => ({
        ...prev,
        friends: Math.max(0, prev.friends - 1),
      }));

      Toast.show({
        type: "success",
        text1: "Unfriended",
        text2: data.message,
      });
    } catch (error) {
      console.log("Unfriend error:", error);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Unable to unfriend this user.",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleFriend = async () => {
    if (actionLoading) return;

    if (relationship.is_friend) {
      Alert.alert("Unfriend User", "Do you want to unfriend this user?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Unfriend",
          style: "destructive",
          onPress: unfriendUser,
        },
      ]);

      return;
    }

    try {
      setActionLoading(true);

      const token = await AsyncStorage.getItem("token");

      let url;
      let method;

      // if (relationship.is_friend) {
      //   // Remove friend
      //   url = `${API_URL}/user/friends/${userId}`;
      //   method = "DELETE";
      // } else if (relationship.friend_request_sent) {
      if (relationship.friend_request_sent) {
        // Cancel sent request
        url = `${API_URL}/user/friend-requests/${relationship.sent_request_id}`;
        method = "DELETE";
      } else if (relationship.friend_request_received) {
        // Accept received request
        url = `${API_URL}/user/friend-requests/${relationship.received_request_id}/accept`;
        method = "POST";
      } else {
        // Send new request
        url = `${API_URL}/user/friend-requests/${userId}`;
        method = "POST";
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: data.message || "Something went wrong.",
        });
        return;
      }

      if (relationship.is_friend) {
        setRelationship((prev) => ({
          ...prev,
          is_friend: false,
        }));

        setStats((prev) => ({
          ...prev,
          friends: Math.max(0, prev.friends - 1),
        }));
      } else if (relationship.friend_request_sent) {
        setRelationship((prev) => ({
          ...prev,
          friend_request_sent: false,
          sent_request_id: null,
        }));
      } else if (relationship.friend_request_received) {
        setRelationship((prev) => ({
          ...prev,
          friend_request_received: false,
          received_request_id: null,
          is_friend: true,
        }));

        setStats((prev) => ({
          ...prev,
          friends: prev.friends + 1,
        }));
      } else {
        setRelationship((prev) => ({
          ...prev,
          friend_request_sent: true,
          sent_request_id: data.request?.id ?? null,
        }));
      }

      Toast.show({
        type: "success",
        text1: "Success",
        text2: data.message,
      });
    } catch (error) {
      console.log("Friend action error:", error);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Unable to complete action.",
      });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F9F7FB",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="arrow-back" size={24} color="#222" />
          </Pressable>

          <Text style={styles.headerTitle}>Profile</Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* PROFILE */}
        <View style={styles.profileSection}>
          {/* AVATAR */}
          <View style={styles.avatarOuter}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>

          {/* USER INFO */}
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user.name}</Text>

            <Text style={styles.username}>@{user.username}</Text>

            <Pressable
              style={({ pressed }) => [
                styles.shareButton,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons
                name="share-social-outline"
                size={17}
                color={COLORS.primary}
              />

              <Text style={styles.shareText}>Share</Text>
            </Pressable>
          </View>
        </View>

        {/* STATS */}
        <View style={styles.statsContainer}>
          <Pressable style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.friends}</Text>

            <Text style={styles.statLabel}>Friends</Text>
          </Pressable>

          <View style={styles.divider} />

          <Pressable style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.followers}</Text>

            <Text style={styles.statLabel}>Followers</Text>
          </Pressable>

          <View style={styles.divider} />

          <Pressable style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.following}</Text>

            <Text style={styles.statLabel}>Following</Text>
          </Pressable>
        </View>

        {/* ACTION BUTTONS */}
        <View style={styles.actionsContainer}>
          <Pressable
            onPress={handleFollow}
            disabled={actionLoading}
            style={({ pressed }) => [
              styles.followButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.followButtonText}>
              {relationship.is_following
                ? "Following"
                : relationship.is_followed_by
                  ? "Follow Back"
                  : "Follow"}
            </Text>
          </Pressable>

          <Pressable
            onPress={handleFriend}
            disabled={actionLoading}
            style={({ pressed }) => [
              styles.friendButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.friendButtonText}>
              {relationship.is_friend
                ? "Friends"
                : relationship.friend_request_sent
                  ? "Request Sent"
                  : relationship.friend_request_received
                    ? "Accept Request"
                    : "Add Friend"}
            </Text>
          </Pressable>
        </View>

        {/* CONTENT */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Posts</Text>

          <Text style={styles.sectionDescription}>
            {user.name}'s posts and activity
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F7FB",
  },

  contentContainer: {
    paddingBottom: 40,
    paddingHorizontal: 10,
  },

  /* HEADER */

  header: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#222",
  },

  headerSpacer: {
    width: 40,
  },

  /* PROFILE */

  profileSection: {
    flexDirection: "row",
    alignItems: "center",

    paddingTop: 8,
    paddingBottom: 20,

    paddingHorizontal: 4,
  },

  avatarOuter: {
    width: 126,
    height: 126,

    borderRadius: 63,

    backgroundColor: "#EEE8F5",

    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: 108,
    height: 108,

    borderRadius: 54,

    backgroundColor: COLORS.primary,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 4,
    borderColor: "#FFFFFF",

    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,

    elevation: 5,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "700",
  },

  profileInfo: {
    flex: 1,
    marginLeft: 18,
  },

  name: {
    fontSize: 23,
    fontWeight: "700",
    color: "#29232F",
  },

  username: {
    marginTop: 4,
    fontSize: 14,
    color: "#89838F",
  },

  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",

    marginTop: 12,

    paddingHorizontal: 16,
    paddingVertical: 8,

    borderRadius: 20,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#DDD5E8",
  },

  shareText: {
    marginLeft: 7,

    fontSize: 13,
    fontWeight: "600",

    color: COLORS.primary,
  },
  /* STATS */

  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: "#fff",
    borderRadius: 18,
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  statNumber: {
    fontSize: 19,
    fontWeight: "700",
    color: "#222",
  },

  statLabel: {
    fontSize: 13,
    color: "#888",
    marginTop: 4,
  },

  divider: {
    width: 1,
    height: 32,
    backgroundColor: "#e5e5e5",
  },

  /* ACTIONS */

  actionsContainer: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 20,
    marginTop: 18,
  },

  followButton: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  followButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  friendButton: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  disabledButton: {
    opacity: 0.6,
  },

  friendButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "700",
  },

  /* CONTENT */

  sectionHeader: {
    marginHorizontal: 20,
    marginTop: 32,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  sectionDescription: {
    fontSize: 13,
    color: "#888",
    marginTop: 4,
  },

  pressed: {
    opacity: 0.7,
  },
});
