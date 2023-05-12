import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useContext } from 'react'

import AppHeader from '../components/AppHeader'

// STYLES
import GlobalStyles from '../styles/global'
import HomeStyles from '../styles/home'

// CONTEXTS
import ThemeContext from '../contexts/ThemeContext'
import { GlobalContext } from '../contexts/GlobalContext'

// COMPONENTS
import Empty from '../components/Empty'

const HomeScreen = () => {
  const { APP_COLORS } = useContext(ThemeContext)
  const { getCurrentDate, store } = useContext(GlobalContext)
  const {day, date, month, year} = getCurrentDate()

  return (
    <>
      <AppHeader title={"Today's classes"} />
      <View style={[GlobalStyles.container, {backgroundColor: APP_COLORS.bgColor}]}>
        <View style={HomeStyles.today}>
          <Text style={[{fontSize: 22, fontWeight: "bold", textAlign: "left"},{color: APP_COLORS.appPrimaryColor}]}>{day}</Text>
          <Text style={{fontWeight: "bold", fontSize: 15, color: "gray"}}>{ `${date} ${month}, ${year}` }</Text>
        </View>
        {
          store?.timetable.filter(schedule => schedule.day == day.toLowerCase())[0].classes.length === 0 ?
          <Empty emptyMessage={"You do not have any class today"} buttonText={"Add schedule"} navigateTo={"timetable_stack"}/>
          :
          <ScrollView style={GlobalStyles.contentCardsContainer} showsVerticalScrollIndicator={false}>
            {store?.timetable.filter(schedule => schedule.day == day.toLowerCase())[0].classes.map(subject => (
              <Pressable 
                style={[GlobalStyles.contentCard, {backgroundColor: APP_COLORS.contentCard.bg}]} 
                key={subject.subject_id}
              >
                <View style={{flex: 3}}>
                  <Text noOfLines={1} style={[GlobalStyles.cardSubject, {color: APP_COLORS.appSecondaryColor}]}>{subject.subject_name}</Text>
                  <Text noOfLines={1} style={GlobalStyles.cardLecturer}>{subject.lecturer}</Text>
                  <View style={[GlobalStyles.cardLectureRoom, {backgroundColor: APP_COLORS.appPrimaryColor}]}>
                      <Text noOfLines={1} style={{color: "white", textAlign: "center"}}>{subject.lectureRoom}</Text>
                  </View>
                </View>
                <Text noOfLines={1} style={[GlobalStyles.cardTime, {color: APP_COLORS.appSecondaryColor}]}>{subject.time}</Text>
              </Pressable>
            ))}
          </ScrollView>
        }
      </View>
    </>
  )
}

export default HomeScreen