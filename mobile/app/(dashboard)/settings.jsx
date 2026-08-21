import { StyleSheet, Text, View, ScrollView, Pressable,Alert, TouchableOpacity, } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import API_URL from "../../services/api";

const Settings = () => {

    const handleLogout = async () => {
        try {
            const token = await AsyncStorage.getItem("token");

            if (token) {
                await fetch(`${API_URL}/auth/logout`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            //removes the token from the device.
            await AsyncStorage.removeItem("token");

            router.replace("/(dashboard)/you");

        } catch (error) {
            console.log("Logout error:", error);

            // Even if API logout fails, remove local token
            await AsyncStorage.removeItem("token");

            router.replace("/(dashboard)/you");
        }
    };

    const confirmLogout = () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Sign Out",
                    style: "destructive",
                    onPress: handleLogout,
                },
            ]
        );
    };

    return (
        <View style={styles.screen}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <TouchableOpacity  style={styles.backButton} onPress={() => router.push("/you")} activeOpacity={0.7}  >
                        <Ionicons name="arrow-back" size={23} color="#222" />
                    </TouchableOpacity>

                    <Text style={styles.title}>
                        Settings
                    </Text>

                    <View style={styles.headerPlaceholder} />
                </View>

                <Text style={styles.sectionTitle}>
                    ACCOUNT
                </Text>

                <View style={styles.section}>

                    <Pressable
                        style={({ pressed }) => [
                            styles.row,
                            pressed && styles.rowPressed,
                        ]}
                        onPress={() => router.push("/edit-profile")}
                    >
                        <View style={styles.rowLeft}>
                            <View style={styles.iconBox}>
                                <Ionicons  name="person-outline" size={21} color="#ac0a0a"  />
                            </View>

                            <View>
                                <Text style={styles.rowText}>
                                    Edit Profile
                                </Text>

                                <Text style={styles.rowSubText}>
                                    Update your personal information
                                </Text>
                            </View>
                        </View>

                        <Ionicons name="chevron-forward" size={20} color="#AAA" />
                    </Pressable>

                    <View style={styles.separator} />

                    {/* NOTIFICATIONS */}

                    <Pressable
                        style={({ pressed }) => [
                            styles.row,
                            pressed && styles.rowPressed,
                        ]}
                    >
                        <View style={styles.rowLeft}>
                            <View style={styles.iconBox}>
                                <Ionicons
                                    name="notifications-outline"
                                    size={21}
                                    color="#ac0a0a"
                                />
                            </View>

                            <View>
                                <Text style={styles.rowText}>
                                    Notifications
                                </Text>

                                <Text style={styles.rowSubText}>
                                    Manage notification preferences
                                </Text>
                            </View>
                        </View>

                        <Ionicons  name="chevron-forward"  size={20} color="#AAA"/>
                    </Pressable>

                </View>

{/* 
                <Text style={styles.sectionTitle}>
                    SUPPORT
                </Text>

                <View style={styles.section}>

                    <Pressable
                        style={({ pressed }) => [
                            styles.row,
                            pressed && styles.rowPressed,
                        ]}
                    >
                        <View style={styles.rowLeft}>
                            <View style={styles.iconBox}>
                                <Ionicons
                                    name="help-circle-outline"
                                    size={21}
                                    color="#ac0a0a"
                                />
                            </View>

                            <View>
                                <Text style={styles.rowText}>
                                    Help & Support
                                </Text>

                                <Text style={styles.rowSubText}>
                                    Get help with your account
                                </Text>
                            </View>
                        </View>

                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#AAA"
                        />
                    </Pressable>

                    <View style={styles.separator} />

                    <Pressable
                        style={({ pressed }) => [
                            styles.row,
                            pressed && styles.rowPressed,
                        ]}
                    >
                        <View style={styles.rowLeft}>
                            <View style={styles.iconBox}>
                                <Ionicons
                                    name="information-circle-outline"
                                    size={21}
                                    color="#ac0a0a"
                                />
                            </View>

                            <View>
                                <Text style={styles.rowText}>
                                    About
                                </Text>

                                <Text style={styles.rowSubText}>
                                    App information and version
                                </Text>
                            </View>
                        </View>

                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color="#AAA"
                        />
                    </Pressable>

                </View> */}


                <Text style={styles.sectionTitle}>
                    ACCOUNT ACTION
                </Text>

                <Pressable
                    style={({ pressed }) => [
                        styles.signOutButton,
                        pressed && styles.signOutPressed,
                    ]}
                    onPress={confirmLogout}
                >
                    <View style={styles.signOutLeft}>
                        <View style={styles.signOutIcon}>
                            <Ionicons name="log-out-outline"  size={22} color="#ac0a0a"  />
                        </View>

                        <View>
                            <Text style={styles.signOut}>
                                Sign Out
                            </Text>

                            <Text style={styles.signOutSubText}>
                                Sign out from this device
                            </Text>
                        </View>
                    </View>

                    <Ionicons name="chevron-forward"  size={20}  color="#ac0a0a"  />
                </Pressable>

            </ScrollView>
        </View>
    );
};

export default Settings;


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
        paddingTop: 58,
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


    introContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 18,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 26,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.04,
        shadowRadius: 10,

        elevation: 2,
    },

    introIcon: {
        width: 55,
        height: 55,
        borderRadius: 18,
        backgroundColor: "#F9E8E8",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },

    introTextContainer: {
        flex: 1,
    },

    introTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#222",
        marginBottom: 4,
    },

    introSubtitle: {
        fontSize: 13,
        color: "#8A8A8F",
        lineHeight: 19,
    },


    sectionTitle: {
        fontSize: 12,
        fontWeight: "700",
        color: "#929297",
        letterSpacing: 0.8,
        marginLeft: 5,
        marginBottom: 9,
        marginTop: 4,
    },

    section: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 25,

        borderWidth: 1,
        borderColor: "#F0F0F2",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.04,
        shadowRadius: 10,

        elevation: 2,
    },

    row: {
        minHeight: 82,
        paddingHorizontal: 16,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    rowPressed: {
        backgroundColor: "#FAFAFA",
    },

    rowLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
        // backgroundColor: "#F9E8E8",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 13,
    },

    rowText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
    },

    rowSubText: {
        fontSize: 12,
        color: "#929297",
        marginTop: 4,
    },

    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "#EDEDEF",
        marginLeft: 73,
    },

    signOutButton: {
        minHeight: 78,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingHorizontal: 16,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        borderWidth: 1,
        borderColor: "#F3DADA",
    },

    signOutPressed: {
        opacity: 0.8,
        transform: [
            {
                scale: 0.99,
            },
        ],
    },

    signOutLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    signOutIcon: {
        width: 44,
        height: 44,
        borderRadius: 14,
        // backgroundColor: "#FCECEC",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 13,
    },

    signOut: {
        fontSize: 16,
        fontWeight: "700",
        color: "#ac0a0a",
    },

    signOutSubText: {
        fontSize: 12,
        color: "#999",
        marginTop: 3,
    },

});