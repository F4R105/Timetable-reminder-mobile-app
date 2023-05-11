import React, {useContext} from 'react'
import { View, Text, Pressable, Alert, ScrollView } from 'react-native'

import AppHeader from '../components/AppHeader'

// STYLES
import GlobalStyles from '../styles/global'
import ClassesStyles from '../styles/classes'

// ICONS
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

// CONTEXTS
import ThemeContext from '../contexts/ThemeContext'

// COMPONENTS
import FloatingButton from '../components/FloatingButton'
import Empty from '../components/Empty'

const ClassesScreen = () => {
    const { APP_COLORS } = useContext(ThemeContext)

    return (
    <>
      <AppHeader />
      <View style={[GlobalStyles.container, {backgroundColor: APP_COLORS.bgColor}]}>
        <Text style={[{fontSize: 22, fontWeight: "bold"},{color: APP_COLORS.appPrimaryColor}]}>Classes</Text>
        <Text style={{fontWeight: "bold", fontSize: 15, color: "gray"}}>Your subjects / modules</Text>
        {/* <Empty emptyMessage={"You do not have any subject added"} buttonText={"Add subject"} navigateTo={"classes_modal"}/> */}
        <ScrollView style={GlobalStyles.contentCardsContainer} showsVerticalScrollIndicator={false}>
            <Pressable 
              style={[GlobalStyles.contentCard, {backgroundColor:  APP_COLORS.contentCard.bg}]} 
            >
              <View>
                <Text style={[GlobalStyles.cardSubject, {color: APP_COLORS.appSecondaryColor}]}>Subject</Text>
                <Text style={GlobalStyles.cardLecturer}>Lecturer</Text>
              </View>
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
      <FloatingButton navigateTo={"classes_modal"} />
    </>
    )
}

export default ClassesScreen