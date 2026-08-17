import { StyleSheet } from "react-native";

const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    topSection: {
        height: 220,
        backgroundColor: "#ac0a0aa8",
        position: "relative",
        alignItems: "center",
    },


    logoCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#fff",

        position: "absolute",
        bottom: -50,

        justifyContent: "center",
        alignItems: "center",

        elevation: 5,
    },


    logo: {
        width: 70,
        height: 70,
        resizeMode: "contain",
    },

    headingSection: {
        alignItems: "center",
        marginTop: 70,
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
    },
    redText: {
        color: '#ac0a0aa8',
    },

    subtitle: {
        marginTop: 8,
        fontSize: 15,
        color: "#666",
    },
    text: {
        fontSize: 15,
        color: "#666",
        textAlign: "center",
        marginTop: 18,
    },

    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '55%',
        alignSelf: 'center',
        marginTop: 10,
    },

    line: {
        flex: 1,
        height: 2,
        backgroundColor: '#ac0a0aa8',
        marginHorizontal: 10,
    },

    form: {
        paddingHorizontal: 20,
        marginTop: 30,
        paddingBottom: 40,
        marginHorizontal: 20,
    },

    inputContainer: {
        marginBottom: 18,
    },

    label: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 15,
        color: "#333",
    },

    input: {
        height: 48,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        flex:1,
        fontWeight: "500",
        color: "#333",
        
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingHorizontal: 15,
    },

    button: {
        height: 48,
        backgroundColor: "#ac0a0aa8",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
export default authStyles;