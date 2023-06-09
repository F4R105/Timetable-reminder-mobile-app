import { View, Text, ScrollView, Pressable, Alert } from 'react-native'
import React, {useContext} from 'react'

import AppHeader from '../components/AppHeader'

// STYLES
import GlobalStyles from '../styles/global'
import TimetableStyles from '../styles/timetable'

// ICONS
import { MaterialIcons } from '@expo/vector-icons';

// CONTEXTS
import ThemeContext from '../contexts/ThemeContext'
import { GlobalContext } from '../contexts/GlobalContext'

// COMPONENTS
import FloatingButton from '../components/FloatingButton'
import Empty from '../components/Empty'


const TimetableScreen = () => {
  const { APP_COLORS } = useContext(ThemeContext)
  const {store, removeSchedule} = useContext(GlobalContext)

  const emptySubjects = () => {
    if(store.classes.length === 0) return true
    return false
  }

  return (
    <>
      <AppHeader />
      <View style={[GlobalStyles.container, {backgroundColor: APP_COLORS.bgColor}]}>
        <Text style={[{fontSize: 22, fontWeight: "bold"},{color: APP_COLORS.appPrimaryColor}]}>Timetable</Text>
        <Text style={{fontWeight: "bold", fontSize: 15, color: "gray",marginBottom: 10}}>Your classes schedules</Text>
        {store.classes.length === 0 ? 
          <Empty emptyMessage={"Add subjects first"} buttonText={"Add subject"} navigateTo={"classes_modal"}/>
          :
          <>
            {
              store.timetable.filter(timetableDay => {
                // return days with scheduled classes
                return timetableDay.classes.length != 0
              }).length != 0 && store.classes.length != 0 ?
                <ScrollView style={GlobalStyles.contentCardsContainer} showsVerticalScrollIndicator={false}>
                  {store.timetable.map(timetableDay => {
                    if(timetableDay.classes.length != 0){
                      return (
                        <View 
                          style={{ marginBottom: 20}}
                          key={timetableDay.day}
                        >
                          <Text 
                            style={{textTransform: "uppercase", color: "gray", fontSize: 18, fontWeight: "bold", marginBottom: 10}}
                          >{timetableDay.day}</Text>
                          {timetableDay.classes.map(subject => (
                            <View style={{padding: 8}} key={subject.schedule_id}>
                              <Pressable 
                                style={[GlobalStyles.contentCard, {backgroundColor:  APP_COLORS.contentCard.bg}]} 
                                onLongPress={() => {
                                  Alert.alert(`Remove Schedule`, `Are you sure you want to remove ${subject.subject_name} from ${subject.day.charAt(0).toUpperCase() + subject.day.slice(1)}?`, [
                                    {
                                      text: "Remove",
                                      onPress: () => removeSchedule(subject.schedule_id)
                                    },
                                    {
                                      text: "Cancel"
                                    }
                                  ])  
                                }}
                                >
                                <View style={{flex: 3}}>
                                  <Text noOfLines={1} style={[GlobalStyles.cardSubject, {color: APP_COLORS.appSecondaryColor}]}>{subject.subject_name}</Text>
                                  <Text noOfLines={1} style={GlobalStyles.cardLecturer}>{subject.lecturer}</Text>
                                  <View style={[GlobalStyles.cardLectureRoom, {backgroundColor: APP_COLORS.appPrimaryColor}]}>
                                      <Text noOfLines={1} style={{color: "white", textAlign: "center"}}>{subject.lectureRoom}</Text>
                                  </View>
                                </View>
                                <Text noOfLines={1} style={[GlobalStyles.cardTime, {color: APP_COLORS.appSecondaryColor}]}>{subject.time}</Text>
                                <Pressable
                                  onPress={()=>{
                                    Alert.alert(`Remove Schedule`, `Are you sure you want to remove ${subject.subject_name} from ${subject.day.charAt(0).toUpperCase() + subject.day.slice(1)}?`, [
                                      {
                                        text: "Remove",
                                        onPress: () => removeSchedule(subject.schedule_id)
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
                            </View>
                          ))}
                        </View>
                      )
                    }
                  })}
                </ScrollView>
                :
                <Empty emptyMessage={"You did not schedule any of your subjects"} buttonText={"Add schedule"} navigateTo={"timetable_modal"}/>
            }
          </>
        }
      </View>    
      <FloatingButton navigateTo={"timetable_modal"} emptySubjects={emptySubjects} />
    </>
  )
}

export default TimetableScreen