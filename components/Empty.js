import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../contexts/ThemeContext'
import { useNavigation } from '@react-navigation/native'

// ICONS
import { Ionicons } from '@expo/vector-icons';

const Empty = ({emptyMessage, buttonText, navigateTo}) => {
    const { APP_COLORS } = useContext(ThemeContext)
    const navigation = useNavigation()

    return (
        <View style={[GlobalStyles.empty, {backgroundColor: APP_COLORS.bgColor}]}>
            <Text style={GlobalStyles.emptyText}>{emptyMessage}</Text>
            <TouchableOpacity 
                style={GlobalStyles.emptyButton}
                onPress={()=>navigation.navigate(navigateTo)}
            >
                <Ionicons name="add" size={24} color={APP_COLORS.appSecondaryColor} />
                <Text style={GlobalStyles.emptyText}>
                {buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Empty