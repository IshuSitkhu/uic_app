import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React, { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
} from "react-native";
import { COLORS } from "../../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

import BlogContent from "../../../components/explore/BlogContent";
import PrayerContent from "../../../components/explore/PrayerContent";
import SongContent from "../../../components/explore/SongContent";
import QuestionContent from "../../../components/explore/QuestionContent";
import { router } from "expo-router";

const Explore = () => {

    const [selectedCategory, setSelectedCategory] = useState("blogs");

    const renderContent = () => {
        switch (selectedCategory) {
            case "blogs":
                return <BlogContent />;

            case "prayers":
                return <PrayerContent />;

            case "songs":
                return <SongContent />;

            case "questions":
                return <QuestionContent />;

            default:
                return <BlogContent />;
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: Platform.OS === "ios" ? 50 : 5,
                }}
            >
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>

                    

                </View>
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
                        onPress={() => setSelectedCategory("blogs")}
                    />

                    <CategoryButton
                        icon="praying-hands"
                        title="Prayers"
                        active={selectedCategory === "prayers"}
                        onPress={() => setSelectedCategory("prayers")}
                    />

                    <CategoryButton
                        icon="music"
                        title="Songs"
                        active={selectedCategory === "songs"}
                        onPress={() => setSelectedCategory("songs")}
                    />

                    <CategoryButton
                        icon="question"
                        title="Questions"
                        active={selectedCategory === "questions"}
                        onPress={() => setSelectedCategory("questions")}
                    />

                </View>


                {/* SELECTED CONTENT */}
                <View style={styles.content}>
                    {renderContent()}
                </View>

            </ScrollView>

        </SafeAreaView>
    );
};


const CategoryButton = ({
    icon,
    title,
    active,
    onPress,
}) => {

    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.categoryButton,
                active && styles.categoryButtonActive,
            ]}
        >

            <FontAwesome5
                name={icon}
                size={14}
                color={active ? "#fff" : COLORS.primary}
            />

            <Text
                style={[
                    styles.categoryText,
                    active && styles.categoryTextActive,
                ]}
            >
                {title}
            </Text>

        </Pressable>
    );
};


export default Explore;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        // backgroundColor: "#fff",
    },

    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },

    exploreTitle:{
      margin:25,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#222",
        marginTop: 15,
    },

    subtitle: {
        fontSize: 14,
        color: "#777",
        marginTop: 5,
    },

    categoryContainer: {
        flexDirection: "row",
        paddingHorizontal: 10,
        // gap: 2,
        backgroundColor: "#fff",
        paddingVertical:10,
        // 
         borderRadius: 50,
         marginHorizontal:15,
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
        paddingHorizontal: 15,
        paddingTop: 20,
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