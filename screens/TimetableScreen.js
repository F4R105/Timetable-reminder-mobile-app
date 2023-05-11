import { View, Text, ScrollView, Pressable, Alert } from 'react-native'
import React, {useContext} from 'react'

import AppHeader from '../components/AppHeader'

// STYLES
import GlobalStyles from '../styles/global'
import TimetableStyles from '../styles/timetable'

// ICONS
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

// CONTEXTS
import ThemeContext from '../contexts/ThemeContext'

import FloatingButton from '../components/FloatingButton'

import Empty from '../components/Empty'

const TimetableScreen = () => {
  const { APP_COLORS } = useContext(ThemeContext)

  return (
    <>
      <AppHeader />
      <View style={[GlobalStyles.container, {backgroundColor: APP_COLORS.bgColor}]}>
        <Text style={[{fontSize: 22, fontWeight: "bold"},{color: APP_COLORS.appPrimaryColor}]}>Timetable</Text>
        <Text style={{fontWeight: "bold", fontSize: 15, color: "gray"}}>Your classes schedules</Text>
        {/* <Empty emptyMessage={"You did not add any subject"} buttonText={"Add subjects"} navigateTo={"classes_stack"}/> */}
        <ScrollView style={GlobalStyles.contentCardsContainer} showsVerticalScrollIndicator={false}>
            <Pressable 
              style={[GlobalStyles.contentCard, {backgroundColor:  APP_COLORS.contentCard.bg}]} 
            >
              <View style={{flex: 3}}>
                <Text noOfLines={1} style={[GlobalStyles.cardSubject, {color: APP_COLORS.appSecondaryColor}]}>Subject</Text>
                <Text noOfLines={1} style={GlobalStyles.cardLecturer}>Lecturer</Text>
                <View style={[GlobalStyles.cardLectureRoom, {backgroundColor: APP_COLORS.appPrimaryColor}]}>
                    <Text noOfLines={1} style={{color: "white", textAlign: "center"}}>Lab 32</Text>
                </View>
              </View>
              <Text noOfLines={1} style={[GlobalStyles.cardTime, {color: APP_COLORS.appSecondaryColor}]}>10:30</Text>
              <Pressable
                onPress={()=>{
                  Alert.alert(`Remove Class`, `Are you sure you want to remove UUUUUUU?`, [
                    {
                      text: "Remove",
                      onPress: () => console.log('remove item')
                    },
                    {
                      text: "Cancel"
                    }
                  ])                 
                }}
              >
                <MaterialIcons name="delete-forever" size={24} color="#db7a7a" />
              </Pressable>
            </Pressable>
        </ScrollView>
      </View>    
      <FloatingButton navigateTo={"timetable_modal"} />
    </>
  )
}

export default TimetableScreen