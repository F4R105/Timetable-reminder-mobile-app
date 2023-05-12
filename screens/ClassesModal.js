import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ToastAndroid} from 'react-native'

// CONTEXT
import ThemeContext from '../contexts/ThemeContext'
import { GlobalContext } from '../contexts/GlobalContext'

// STYLES
import ClassesModalStyles from '../styles/classes_modal'

const ClassesModal = () => {

  const { APP_COLORS } = useContext(ThemeContext)
  const { addClass } = useContext(GlobalContext)
  const [subject, setSubject] = useState('')
  const [lecturer, setLecturer] = useState('')
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: APP_COLORS.bgColor}}>
      <View style={ClassesModalStyles.form}>
        <View style={{paddingVertical: 10, marginBottom: 40}}>
          <Text style={[ClassesModalStyles.appTitle, {color: APP_COLORS.appSecondaryColor}]}>Timetable reminder</Text>
        </View>
        <View style={ClassesModalStyles.formGroup}>
          <Text style={[ClassesModalStyles.label, {color: APP_COLORS.appSecondaryColor}]}>Subject</Text>
          <TextInput 
            style={[ClassesModalStyles.input, {backgroundColor: APP_COLORS.inputColor}]}
            value={subject}
            onChangeText={(value) => setSubject(value)}
          />
        </View>
        <View style={ClassesModalStyles.formGroup}>
          <Text style={[ClassesModalStyles.label, {color: APP_COLORS.appSecondaryColor}]}>Lecturer</Text>
          <TextInput 
            style={[ClassesModalStyles.input, {backgroundColor: APP_COLORS.inputColor}]}
            value={lecturer}
            onChangeText={(value) => setLecturer(value)}
          />
        </View>
        <TouchableOpacity 
          onPress={async ()=>{
            if(subject === "" || lecturer === "") return ToastAndroid.show('Check for Empty field!', ToastAndroid.LONG);
            try{
              await addClass({subject, lecturer})
            }catch(error){console.log(error)}
            navigation.pop()
          }} 
          style={[ClassesModalStyles.submitBtn, {backgroundColor: APP_COLORS.appPrimaryColor}]}
        >
          <Text style={ClassesModalStyles.submitBtnText}>Add Subject</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={()=>{
            // setSubject('')
            // setLecturer('')
            navigation.pop()
          }} 
          style={[ClassesModalStyles.cancelBtn, {borderColor: APP_COLORS.appPrimaryColor}]}
        >
          <Text style={[ClassesModalStyles.cancelBtnText, {color: APP_COLORS.appPrimaryColor}]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ClassesModal