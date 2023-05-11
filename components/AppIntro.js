import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, StatusBar, ScrollView, ToastAndroid} from 'react-native'
import ThemeContext from '../contexts/ThemeContext'
import Checkbox from 'expo-checkbox';

import GlobalStyles from '../styles/global'

const AppIntro = ({setShowAppIntro}) => {

    const { APP_COLORS } = useContext(ThemeContext)
    const [isChecked, setChecked] = useState(false);

    return (
      <View style={[GlobalStyles.container,{backgroundColor: APP_COLORS.appIntroColor.bg, flex: 1}]}>
          <StatusBar backgroundColor={APP_COLORS.appIntroColor.bg} />
          <View style={{marginBottom: 80}}>
            <Text style={{fontSize: 30, fontWeight: "bold", color: APP_COLORS.appPrimaryColor}}>Welcome</Text>
            <Text style={{fontWeight: "bold", fontSize: 20, textTransform: "uppercase", color: APP_COLORS.appPrimaryColor}}>Timetable Reminder</Text>
          </View>
          <ScrollView>
            <Text style={{fontSize: 18,fontWeight: "bold", textTransform: "uppercase", color: APP_COLORS.appPrimaryColor}}>How to use</Text>
            <View>
              <Text style={{color: APP_COLORS.appSecondaryColor, fontSize: 16, paddingVertical: 15}}>{'\u2B24' + ' '}On Classes tab, add your classes/subjects</Text>
              <Text style={{color: APP_COLORS.appSecondaryColor, fontSize: 16, paddingVertical: 15}}>{'\u2B24' + ' '}On Timetable tab, create schedules for your classes</Text>
              <Text style={{color: APP_COLORS.appSecondaryColor, fontSize: 16, paddingVertical: 15}}>{'\u2B24' + ' '}On Home tab, you will view your current day classes</Text>
              <Text style={{color: APP_COLORS.appSecondaryColor, fontSize: 16, paddingVertical: 15}}>{'\u2B24' + ' '}Enjoy!!</Text>
            </View>
          </ScrollView>
          <View style={{paddingVertical: 30, flexDirection: "row", gap: 10}}>
            <Checkbox
              value={isChecked}
              onValueChange={() => setChecked(!isChecked)}
              color={isChecked ? APP_COLORS.appPrimaryColor : undefined}
            />
            <Text style={{color: APP_COLORS.appSecondaryColor}}>I understood</Text>
          </View>
          <View style={{marginTop: "auto"}}>
            <TouchableOpacity 
              style={{backgroundColor: isChecked ? APP_COLORS.appPrimaryColor: APP_COLORS.appIntroColor.bg, padding: 20, borderRadius: 8}}
              onPress={()=>{
                isChecked ? setShowAppIntro(false) : null;
              }}
            >
              <Text style={{fontSize: 20, textAlign: "center", color: isChecked ? "white": APP_COLORS.appIntroColor.bg }}>START</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
}

export default AppIntro