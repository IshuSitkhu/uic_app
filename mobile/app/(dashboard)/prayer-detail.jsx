import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const PrayerDetail = () => {
  return (
    <View style={styles.screen}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <TouchableOpacity  style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}  >
                        <Ionicons name="arrow-back" size={23} color="#222" />
                    </TouchableOpacity>

                    <Text style={styles.title}>
                        Prayer
                    </Text>
                    <View style={styles.headerPlaceholder} />
                </View>
            </ScrollView>
    </View>
  )
}

export default PrayerDetail

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
})