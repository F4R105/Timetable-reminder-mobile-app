import React, {useContext} from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

// ICONS
import { Entypo } from '@expo/vector-icons';

// CONTEXTS
import ThemeContext from '../contexts/ThemeContext'
import { useNavigation } from '@react-navigation/native';

const FloatingButton = ({navigateTo}) => {
    const { APP_COLORS } = useContext(ThemeContext)
    const navigation = useNavigation()

    return (
        <TouchableOpacity 
            style={[styles.floatingBtn, {backgroundColor: APP_COLORS.appPrimaryColor}]}
            onPress={()=>navigation.navigate(navigateTo)}
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