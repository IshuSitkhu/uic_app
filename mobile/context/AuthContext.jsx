import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check saved login when app starts
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const storedUser = await AsyncStorage.getItem("user");

            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.log("Load user error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Called after successful login
    const login = async (userData, token) => {
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        setUser(userData);
    };

    // Called when user logs out
    const logout = async () => {
        await AsyncStorage.multiRemove(["token", "user"]);

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};