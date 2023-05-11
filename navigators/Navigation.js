import React, { useContext } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabs from './BottomNav'
import ThemeContext from '../contexts/ThemeContext'

const Navigation = () => {
  const { APP_COLORS } = useContext(ThemeContext)

  return (
    <>
        <StatusBar backgroundColor={APP_COLORS.headerColor} />
        <NavigationContainer>
            <BottomTabs />
        </NavigationContainer>
    </>
  )
}

export default Navigation