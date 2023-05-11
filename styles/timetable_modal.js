import { StyleSheet } from "react-native";

export default TimetableStyles = StyleSheet.create({
    appTitle: {
        textTransform: "uppercase",
        fontWeight: "bold",
        textAlign: "center", 
    },
    form: {
        width: "80%",
        paddingVertical: 20
    },
    formGroup: {
        marginBottom: 30
    },
        label: {
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: 12,
        marginBottom: 3
    },
    input: {
        width: "100%",
        borderRadius: 3,
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: "#e6e6e6"
    },
    timepicker: {
        width: "100%",
        borderRadius: 3,
        fontSize: 20,
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: "#e6e6e6"
    },
    submitBtn: {
        width: "100%",
        paddingVertical: 15,
        borderRadius: 3,
        marginBottom: 10
    },
    cancelBtn: {
        borderWidth: 1,
        width: "100%",
        paddingVertical: 15,
        borderRadius: 3
    },
    submitBtnText: {
        color: "white",
        textAlign: "center",
        textTransform: "uppercase",
        fontSize: 20
    },
    cancelBtnText: {
        // color: colors.appSecondaryColor,
        textAlign: "center",
        textTransform: "uppercase",
        fontSize: 20
    }
})