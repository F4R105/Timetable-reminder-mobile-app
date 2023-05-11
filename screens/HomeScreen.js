import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useContext } from 'react'

import AppHeader from '../components/AppHeader'

// STYLES
import GlobalStyles from '../styles/global'
import HomeStyles from '../styles/home'

// ICONS
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

// CONTEXTS
import ThemeContext from '../contexts/ThemeContext'
import { GlobalContext } from '../contexts/GlobalContext'
import { useNavigation } from '@react-navigation/native'

import Empty from '../components/Empty'

const HomeScreen = () => {
  const { APP_COLORS } = useContext(ThemeContext)
  const { getCurrentDate } = useContext(GlobalContext)
  const {day, date, month, year} = getCurrentDate()
  const navigation = useNavigation()

  return (
    <>
      <AppHeader title={"Today's classes"} />
      <View style={[GlobalStyles.container, {backgroundColor: APP_COLORS.bgColor}]}>
        <View style={HomeStyles.today}>
          <Text style={[{fontSize: 22, fontWeight: "bold", textAlign: "left"},{color: APP_COLORS.appPrimaryColor}]}>{day}</Text>
          <Text style={{fontWeight: "bold", fontSize: 15, color: "gray"}}>{ `${date} ${month}, ${year}` }</Text>
        </View>
        {/* <Empty emptyMessage={"You do not have any class today"} buttonText={"Add schedule"} navigateTo={"timetable_stack"}/> */}
        <ScrollView style={GlobalStyles.contentCardsContainer} showsVerticalScrollIndicator={false}>
            <Pressable 
              style={[GlobalStyles.contentCard, {backgroundColor: APP_COLORS.contentCard.bg}]} 
            >
              <View style={{flex: 3}}>
                <Text noOfLines={1} style={[GlobalStyles.cardSubject, {color: APP_COLORS.appSecondaryColor}]}>Subject</Text>
                <Text noOfLines={1} style={GlobalStyles.cardLecturer}>Lecturer</Text>
                <View style={[GlobalStyles.cardLectureRoom, {backgroundColor: APP_COLORS.appPrimaryColor}]}>
                    <Text noOfLines={1} style={{color: "white", textAlign: "center"}}>Lab 32</Text>
                </View>
              </View>
              <Text noOfLines={1} style={[GlobalStyles.cardTime, {color: APP_COLORS.appSecondaryColor}]}>10:30</Text>
            </Pressable>
        </ScrollView>
      </View>
    </>
  )
}

export default HomeScreen