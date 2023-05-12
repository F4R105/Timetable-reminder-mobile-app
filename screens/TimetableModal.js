import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, TextInput, Pressable, ToastAndroid, ScrollView } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

// CONTEXT
import ThemeContext from '../contexts/ThemeContext'
import { GlobalContext } from '../contexts/GlobalContext';

// STYLES
import GlobalStyles from '../styles/global'
import TimetableModalStyles from '../styles/timetable_modal'

const TimetableModal = ({navigation}) => {
  const { APP_COLORS } = useContext(ThemeContext)
  const { store, addSchedule } = useContext(GlobalContext)

  const [showTimePicker, setShowTimePicker] = useState(false)
  const [timePickerValue, setTimePickerValue] = useState(new Date())

  // FORM VALUES
  const [subjectId, setSubjectId] = useState("")
  const [lectureRoom, setLectureRoom] = useState("")
  const [day, setDay] = useState("")
  const [time, setTime] = useState("Set time")


  const onTimeSelect = (event) => {
    const { timestamp } = event.nativeEvent
    const date = new Date(timestamp)
    setTimePickerValue(new Date(timestamp))
    const hour = date.getHours().toLocaleString()
    const minute = date.getMinutes().toLocaleString()
    const minutes = (minute < 10) ? `0${minute}` : minute
    const time = `${hour}:${minutes}`
    setTime(time)
    setShowTimePicker(false)
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: APP_COLORS.bgColor}}>
      <View style={TimetableModalStyles.form}>
        <ScrollView>
          <View style={{paddingVertical: 10, marginBottom: 40}}>
            <Text style={[TimetableModalStyles.appTitle, {color: APP_COLORS.appSecondaryColor}]}>Timetable reminder</Text>
          </View>
          {showTimePicker && (
            <DateTimePicker
              value={timePickerValue}
              mode="time"
              is24Hour={true}
              onChange={onTimeSelect}
            />
          )}
          <View style={TimetableModalStyles.formGroup}>
            <Text style={[TimetableModalStyles.label,{color: APP_COLORS.appSecondaryColor}]}>Class</Text>
            <Picker
              selectedValue={subjectId}
              onValueChange={(itemValue, itemIndex) =>
                setSubjectId(itemValue)
              }>
                <Picker.Item style={{color: APP_COLORS.appSecondaryColor}} label="Select a class" value="null" />
                {store.classes.map(subject => (
                  <Picker.Item 
                    style={{color: APP_COLORS.appSecondaryColor}} 
                    label={subject.subject_name} 
                    value={subject.subject_id} 
                    key={subject.subject_id}
                  />
                ))}
              </Picker>
          </View>
          <View style={TimetableModalStyles.formGroup}>
            <Text style={[TimetableModalStyles.label,{color: APP_COLORS.appSecondaryColor}]}>Day</Text>
            <Picker
              selectedValue={day}
              onValueChange={(itemValue, itemIndex) =>
                setDay(itemValue)
              }>
              <Picker.Item style={{color: APP_COLORS.appSecondaryColor}} label="Choose Day" value="null" />
              <Picker.Item style={{color: APP_COLORS.appSecondaryColor}} label="Monday" value="monday" />
              <Picker.Item style={{color: APP_COLORS.appSecondaryColor}} label="Tuesday" value="tuesday" />
              <Picker.Item style={{color: APP_COLORS.appSecondaryColor}} label="Wednesday" value="wednesday" />
              <Picker.Item style={{color: APP_COLORS.appSecondaryColor}} label="Thursday" value="thursday" />
              <Picker.Item style={{color: APP_COLORS.appSecondaryColor}} label="Friday" value="friday" />
              <Picker.Item style={{color: APP_COLORS.appSecondaryColor}} label="Saturday" value="saturday" />
              <Picker.Item style={{color: APP_COLORS.appSecondaryColor}} label="Sunday" value="sunday" />
            </Picker>
          </View>
          <View style={TimetableModalStyles.formGroup}>
            <Text style={[TimetableModalStyles.label,{color: APP_COLORS.appSecondaryColor}]}>Time</Text>
            <Pressable 
              style={[TimetableModalStyles.timepicker, {backgroundColor: APP_COLORS.inputColor}]} 
              onPressIn={()=>setShowTimePicker(true)}
            >
              <Text style={{fontSize: 20}}>{time}</Text>
            </Pressable>
          </View>
          <View style={TimetableModalStyles.formGroup}>
            <Text style={[TimetableModalStyles.label,{color: APP_COLORS.appSecondaryColor}]}>Lecture room</Text>
            <TextInput 
              style={[TimetableModalStyles.input, { backgroundColor: APP_COLORS.inputColor, fontSize: 20}]}
              value={lectureRoom}
              onChangeText={(value) => setLectureRoom(value)}
            />
          </View>
          <TouchableOpacity 
            style={[TimetableModalStyles.submitBtn, {backgroundColor: APP_COLORS.appPrimaryColor}]}
            onPress={()=>{
              if(lectureRoom === "" || subjectId === "null" || subjectId === "" || day === "null" || day === "" || time === "Set time") return ToastAndroid.show('Check for empty fields!', ToastAndroid.LONG);
              addSchedule({subject_id: subjectId, lectureRoom, day, time})
              navigation.pop()
            }} 
          >
            <Text style={TimetableModalStyles.submitBtnText}>Add Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.pop()} style={[TimetableModalStyles.cancelBtn, {borderColor: APP_COLORS.appPrimaryColor}]}>
            <Text style={[TimetableModalStyles.cancelBtnText, {color: APP_COLORS.appPrimaryColor}]}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  )
}

export default TimetableModal