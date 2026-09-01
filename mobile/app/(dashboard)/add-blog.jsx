import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import {
    RichEditor,
    RichToolbar,
    actions,
} from "react-native-pell-rich-editor";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { Keyboard } from "react-native";
import { useRef } from "react";

import API_URL from "../../services/api";
import { COLORS } from "../../constants/colors";

const AddBlog = () => {
    const [saving, setSaving] = useState(false);

    const [blogTitle, setBlogTitle] = useState("");
    const [blogType, setBlogType] = useState("personal");
    const [blogCategory, setBlogCategory] = useState("");
    const [blogDate, setBlogDate] = useState("");
    const [blogContent, setBlogContent] = useState("");
    const [blogImage, setBlogImage] = useState(null);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTypePicker, setShowTypePicker] = useState(false);
    const [showCategoryPicker, setShowCategoryPicker] = useState(false);
    const richText = useRef(null);

    const blogTypes = [
        { label: "Personal", value: "personal" },
        { label: "Public", value: "public" },
    ];

    const blogCategories = [
        { label: "Gospel", value: "gospel" },
        { label: "Motivation", value: "motivation" },
        { label: "Relationship", value: "relationship" },
        { label: "Devotional", value: "devotional" },
        { label: "Faith", value: "faith" },
        { label: "Others", value: "other" },
    ];

    const pickImage = async () => {
      const permissionResult =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
          console.log("Permission to access photos is required.");
          return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          quality: 0.8,
      });

      if (!result.canceled) {
          setBlogImage(result.assets[0]);
      }
  };


    const handleSave = async () => {
    if (saving) return;

    if (!blogTitle.trim()) {
        Toast.show({
            type: "error",
            text1: "Blog Title Required",
            text2: "Please enter a blog title.",
            position: "top",
        });
        return;
    }

    if (!blogType) {
        Toast.show({
            type: "error",
            text1: "Blog Type Required",
            text2: "Please select a blog type.",
            position: "top",
        });
        return;
    }

    if (!blogCategory) {
        Toast.show({
            type: "error",
            text1: "Blog Category Required",
            text2: "Please select a blog category.",
            position: "top",
        });
        return;
    }

    if (!blogDate) {
        Toast.show({
            type: "error",
            text1: "Blog Date Required",
            text2: "Please select a blog date.",
            position: "top",
        });
        return;
    }

    if (!blogContent.trim()) {
        Toast.show({
            type: "error",
            text1: "Blog Content Required",
            text2: "Please write your blog.",
            position: "top",
        });
        return;
    }

    try {
        setSaving(true);

        const token = await AsyncStorage.getItem("token");

        if (!token) {
            router.replace("/(auth)/login");
            return;
        }

        const formData = new FormData();

        formData.append("blog_title", blogTitle.trim());
        formData.append("blog_type", blogType);
        formData.append("blog_category", blogCategory);
        formData.append("blog_date", blogDate);
        formData.append("blog", blogContent.trim());

        // Add image only if user selected one
        if (blogImage) {
            formData.append("blog_file", {
                uri: blogImage.uri,
                name: blogImage.fileName || `blog_${Date.now()}.jpg`,
                type: blogImage.mimeType || "image/jpeg",
            });
        }

        const response = await fetch(`${API_URL}/blogs`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json();

        console.log("CREATE BLOG STATUS:", response.status);
        console.log("CREATE BLOG RESPONSE:", data);

        if (response.ok) {
            Toast.show({
                type: "success",
                text1: "Blog Published",
                text2: "Your blog was added successfully.",
                position: "top",
            });

            setTimeout(() => {
                router.back();
            }, 1200);
        } else {
            Toast.show({
                type: "error",
                text1: "Failed to Publish",
                text2: data.message || "Unable to create blog.",
                position: "top",
            });
        }
    } catch (error) {
        console.error("Create blog error:", error);

        Toast.show({
            type: "error",
            text1: "Something went wrong",
            text2: "Unable to connect to the server.",
            position: "top",
        });
    } finally {
        setSaving(false);
    }
};
    return (
        <View style={styles.screen}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="arrow-back" size={23} color="#222" />
                        </TouchableOpacity>

                        <Text style={styles.title}>Add Blog</Text>

                        <View style={styles.headerPlaceholder} />
                    </View>

                    <View style={styles.section}>

                        <Text style={styles.label}>
                            Blog Title <Text style={styles.required}>*</Text>
                        </Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter blog title"
                                placeholderTextColor="#aaa"
                                value={blogTitle}
                                onChangeText={setBlogTitle}
                            />
                        </View>

                        <Text style={styles.label}>Blog Type <Text style={styles.required}>*</Text> </Text>

                        <Pressable style={styles.inputContainer} 
                            onPress={() => {
                                Keyboard.dismiss();
                                setShowTypePicker(true);
                            }}>
                            <Text style={styles.selectText}>
                                {
                                    blogTypes.find(
                                        (item) => item.value === blogType
                                    )?.label
                                }
                            </Text>

                            <Ionicons name="chevron-down" size={20} color="#999" />
                        </Pressable>

                        <Text style={styles.label}>Blog Category <Text style={styles.required}>*</Text> </Text>

                        <Pressable                         
                            style={styles.inputContainer}
                            onPress={() => {
                                Keyboard.dismiss();
                                setShowCategoryPicker(true);
                            }}
                        >
                            <Text
                                style={[
                                    styles.selectText,
                                    !blogCategory && styles.placeholderText,
                                ]}
                            >
                                {blogCategory
                                    ? blogCategories.find(
                                        (item) =>
                                            item.value === blogCategory
                                    )?.label
                                    : "Select Blog Category"}
                            </Text>

                            <Ionicons name="chevron-down" size={20} color="#999" />
                        </Pressable>

                        <Text style={styles.label}>Blog Date <Text style={styles.required}>*</Text> </Text>

                        <Pressable
                            style={styles.inputContainer}
                            onPress={() => {
                                Keyboard.dismiss();
                                setShowDatePicker(true);
                            }}
                        >
                            <Ionicons
                                name="calendar-outline"
                                size={20}
                                color="#999"
                            />

                            <Text
                                style={[
                                    styles.dateText,
                                    !blogDate && styles.placeholderText,
                                ]}
                            >
                                {blogDate || "Select blog date"}
                            </Text>
                        </Pressable>

                        {showDatePicker && (
                            <DateTimePicker
                                value={
                                    blogDate
                                        ? new Date(blogDate)
                                        : new Date()
                                }
                                mode="date"
                                display={
                                    Platform.OS === "ios"
                                        ? "spinner"
                                        : "default"
                                }
                                onChange={(event, selectedDate) => {
                                    setShowDatePicker(false);

                                    if (selectedDate) {
                                        const formattedDate =
                                            selectedDate
                                                .toISOString()
                                                .split("T")[0];

                                        setBlogDate(formattedDate);
                                    }
                                }}
                            />
                        )}

                        <Text style={styles.label}>Upload Image</Text>

                        <TouchableOpacity
                            style={styles.uploadButton}
                            onPress={pickImage}
                            activeOpacity={0.7}
                        >
                            <Ionicons
                                name="cloud-upload-outline"
                                size={22}
                                color={COLORS.primary}
                            />

                            <Text style={styles.uploadText}>
                                {blogImage ? "Change Image" : "Choose Image"}
                            </Text>
                        </TouchableOpacity>

                        {blogImage && (
                            <View style={styles.previewContainer}>
                                <Image
                                    source={{ uri: blogImage.uri }}
                                    style={styles.previewImage}
                                />

                                <TouchableOpacity
                                    style={styles.removeImageButton}
                                    onPress={() => setBlogImage(null)}
                                >
                                    <Ionicons
                                        name="close-circle"
                                        size={25}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* <Text style={styles.label}>Blog <Text style={styles.required}>*</Text></Text>

                        <View style={styles.descriptionContainer}>
                            <TextInput
                                style={styles.descriptionInput}
                                placeholder="Write your blog here..."
                                placeholderTextColor="#aaa"
                                value={blogContent}
                                onChangeText={setBlogContent}
                                multiline
                                textAlignVertical="top"
                            />
                        </View> */}

<Text style={styles.label}>
    Blog <Text style={styles.required}>*</Text>
</Text>

<View style={styles.editorContainer}>

    <RichToolbar
        editor={richText}
        actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
        ]}
    />

    <RichEditor
        ref={richText}
        placeholder="Write your blog here..."
        initialContentHTML={blogContent}
        onChange={setBlogContent}
        style={styles.richEditor}
    />

</View>
                    </View>

                    <Pressable
                        style={({ pressed }) => [
                            styles.saveButton,
                            pressed && styles.buttonPressed,
                        ]}
                        onPress={handleSave}
                        disabled={saving}
                    >
                        {saving ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <Ionicons
                                    name="checkmark-circle-outline"
                                    size={21}
                                    color="#fff"
                                />

                                <Text style={styles.saveButtonText}>
                                    Publish Blog
                                </Text>
                            </>
                        )}
                    </Pressable>
                </ScrollView>

                {/* Blog Type Modal */}
                {showTypePicker && (
                    <View style={styles.overlay}>
                        <View style={styles.modal}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>
                                    Select Blog Type
                                </Text>

                                <TouchableOpacity onPress={() => setShowTypePicker(false) } >
                                    <Ionicons
                                        name="close"
                                        size={24}
                                        color="#222"
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* When the user taps an option: save publi/private as selected option and setshow.. false */}
                            {blogTypes.map((item) => (
                                <TouchableOpacity
                                    key={item.value}
                                    style={styles.option}
                                    onPress={() => {
                                        setBlogType(item.value);
                                        setShowTypePicker(false);
                                    }}
                                >
                                    <Text style={styles.optionText}>
                                        {item.label}
                                    </Text>

                                    {blogType === item.value && (
                                        <Ionicons name="checkmark"  size={20} color={COLORS.primary} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {/* Blog Category Modal */}
                {showCategoryPicker && (
                    <View style={styles.overlay}>
                        <View style={styles.modal}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>
                                    Select Blog Category
                                </Text>

                                <TouchableOpacity
                                    onPress={() =>
                                        setShowCategoryPicker(false)
                                    }
                                >
                                    <Ionicons
                                        name="close"
                                        size={24}
                                        color="#222"
                                    />
                                </TouchableOpacity>
                            </View>

                            {blogCategories.map((item) => (
                                <TouchableOpacity
                                    key={item.value}
                                    style={styles.option}
                                    onPress={() => {
                                        setBlogCategory(item.value);
                                        setShowCategoryPicker(false);
                                    }}
                                >
                                    <Text style={styles.optionText}>
                                        {item.label}
                                    </Text>

                                    {blogCategory === item.value && (
                                        <Ionicons
                                            name="checkmark"
                                            size={20}
                                            color={COLORS.primary}
                                        />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
            </KeyboardAvoidingView>
        </View>
    );
};

export default AddBlog;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F8F8FA",
        
    },

    content: {
        paddingHorizontal: 20,
        paddingBottom: 45,
        // marginBottom:30,
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

    section: {
        marginTop: 5,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#444",
        marginBottom: 8,
    },

    required: {
        color: "red",
    },

    inputContainer: {
        minHeight: 52,
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 10,
        backgroundColor: "#FFF",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        marginBottom: 20,
    },

    input: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },

    selectText: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },

    dateText: {
        flex: 1,
        fontSize: 16,
        color: "#333",
        marginLeft: 10,
    },

    placeholderText: {
        color: "#AAA",
    },

    descriptionContainer: {
        minHeight: 180,
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 10,
        backgroundColor: "#FFF",
        marginBottom: 25,
    },

    descriptionInput: {
        minHeight: 180,
        padding: 15,
        fontSize: 16,
        color: "#333",
    },

    saveButton: {
        height: 52,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginBottom:40,
    },

    buttonPressed: {
        opacity: 0.85,
    },

    saveButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },

    overlay: {
        position: "absolute",
        top: 60,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.35)",
        justifyContent: "flex-end",
    },

    modal: {
        backgroundColor: "#FFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 85,
    },

    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#222",
    },

    option: {
        minHeight: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },

    optionText: {
        fontSize: 16,
        color: "#333",
    },

    uploadButton: {
        height: 52,
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 10,
        backgroundColor: "#FFF",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
    },

    uploadText: {
        marginLeft: 8,
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: "600",
    },

    previewContainer: {
        position: "relative",
        marginBottom: 20,
    },

    previewImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        resizeMode: "cover",
    },

    removeImageButton: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 20,
    },


    editorContainer: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "#fff",
        height: 250,
        marginBottom: 20,
    },

    richEditor: {
        minHeight: 250,
    },

    required: {
        color: "red",
    },
});