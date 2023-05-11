import { StyleSheet } from "react-native";

export default GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    contentCardsContainer: {
        paddingVertical: 20,
    },
    contentCard: {
        flexDirection: "row",
        gap: 30,
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 20,
        paddingHorizontal: 10,
        // borderWidth: 1,
        borderColor: "gray",
        elevation: 8,
        marginBottom: 10,
        borderRadius: 5
    },
    cardSubject: {
        fontSize: 18,
        fontWeight: "bold"
    },
    cardLecturer: {
        color: "gray"
    },
    cardLectureRoom: {
        padding: 5, 
        marginTop: 10, 
        borderRadius: 20, 
        width: "50%"
    },
    cardTime: {
      fontSize: 30,
      fontWeight: "bold"
    },
    empty: {
        flex: 1,
        marginVertical: 20,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        gap: 20
    },
    emptyText: {
        opacity: 0.3,
        fontSize: 15
    },
    emptyButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        opacity: 0.4,
        borderWidth: 1,
        padding: 5,
        borderRadius: 5
    }
})