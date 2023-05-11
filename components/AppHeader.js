import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'

import ThemeContext from '../contexts/ThemeContext'

const AppHeader = ({title}) => {
  const { APP_COLORS } = useContext(ThemeContext)
  return (
    <View style={[styles.header, {backgroundColor: APP_COLORS.headerColor}]}>
      <Text style={[styles.headerText, {color: APP_COLORS.appSecondaryColor}]}>{title || "Timetable Reminder"}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
      fontSize: 12,
      height: 60,
      justifyContent: "center",
      alignItems: "center"
    },
    headerText: {
      fontSize: 15,
      fontWeight: "bold",
      textTransform: "uppercase"
    }
})

export default AppHeader