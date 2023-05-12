import { StyleSheet } from "react-native";

export default SettingsStyles = StyleSheet.create({
    setting: {
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 20,
        elevation: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    settingText: {
        fontWeight: "bold"
    },
    settingDescription: {
        color: "gray"
    },
    resetSetting: {
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
        elevation: 8
    },
    resetButton: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    resetButtonText: {
        textAlign: "center",
        fontSize: 18
    }
})