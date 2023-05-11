import { StyleSheet } from "react-native";

export default HomeStyles = StyleSheet.create({
    today: {
        // flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    shortcuts: {
        flexDirection: "row",
        marginVertical: 30,
        gap: 10
    },
    shortcut: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5
    },
    shortcutText: {
        textAlign: "center",
        fontWeight: "bold"
    }
})