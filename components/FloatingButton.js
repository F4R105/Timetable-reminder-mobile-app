import React, {useContext} from 'react'
import { StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'

// ICONS
import { Entypo } from '@expo/vector-icons';

// CONTEXTS
import ThemeContext from '../contexts/ThemeContext'
import { useNavigation } from '@react-navigation/native';

const FloatingButton = ({navigateTo, emptySubjects}) => {
    const { APP_COLORS } = useContext(ThemeContext)
    const navigation = useNavigation()
    const isEmptySubjects = emptySubjects ? emptySubjects() : false

    return (
        <TouchableOpacity 
            style={[styles.floatingBtn, {backgroundColor: APP_COLORS.appPrimaryColor}]}
            onPress={()=>{
                isEmptySubjects ? 
                    ToastAndroid.show('Add subjects first!', ToastAndroid.LONG) 
                    : 
                    navigation.navigate(navigateTo)
            }}
            >
            <Entypo name="plus" size={50} color="white" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    floatingBtn: {
        height: 70, 
        width: 70, 
        borderRadius: 500, 
        justifyContent: "center", 
        alignItems: "center",
        position: "absolute",
        bottom: 50,
        right: 30
    }
})

export default FloatingButton