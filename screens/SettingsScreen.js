import { View, Text, ScrollView, Switch, TouchableOpacity } from 'react-native'
import React, {useContext, useState} from 'react'

import AppHeader from '../components/AppHeader'

// STYLES
import GlobalStyles from '../styles/global'
import SettingsStyles from '../styles/settings'

// CONTEXTS
import ThemeContext from '../contexts/ThemeContext'

const SettingsScreen = () => {
  const { APP_COLORS, theme, updateUserThemeSetting } = useContext(ThemeContext)

  // SETTINGS
  const [darkModeEnabled, setDarkModeEnabled] = useState(theme === "dark" ? true : false)

  return (
    <>
      <AppHeader />
      <View style={[GlobalStyles.container, {backgroundColor: APP_COLORS.bgColor}]}>
        <Text style={[{fontSize: 32, fontWeight: "bold"},{color: APP_COLORS.appPrimaryColor}]}>Settings</Text>
        <ScrollView style={GlobalStyles.contentCardsContainer}>
          <View style={[SettingsStyles.setting, {backgroundColor:  APP_COLORS.contentCard.bg}]}>
            <View>
              <Text style={[SettingsStyles.settingText, {color: APP_COLORS.appSecondaryColor}]}>Enable Dark Mode</Text>
              <Text noOfLines={1} style={[SettingsStyles.settingDescription, {color: APP_COLORS.appSecondaryColor}]}>Switching on means dark mode enabled</Text>
            </View>
            <Switch
              trackColor={{false: '#767577', true: APP_COLORS.appPrimaryColor}}
              thumbColor={darkModeEnabled ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={()=>{
                setDarkModeEnabled(!darkModeEnabled)
                darkModeEnabled ? updateUserThemeSetting('light') : updateUserThemeSetting('dark')
              }}
              value={darkModeEnabled}
            />
          </View>
          <View style={[SettingsStyles.resetSetting, {backgroundColor:  APP_COLORS.contentCard.bg}]}>
              <View>
                <Text style={[SettingsStyles.settingText, {color: APP_COLORS.appSecondaryColor}]}>Reset App</Text>
                <Text noOfLines={1} style={[SettingsStyles.settingDescription, {color: APP_COLORS.appSecondaryColor}]}>This reset application storage</Text>
              </View>
              <TouchableOpacity style={[SettingsStyles.resetButton, {borderWidth: 2, borderColor: APP_COLORS.appSecondaryColor}]}>
                <Text style={[SettingsStyles.resetButtonText, {color: APP_COLORS.appSecondaryColor}]}>RESET</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

export default SettingsScreen