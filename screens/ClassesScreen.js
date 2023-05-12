import React, {useContext} from 'react'
import { View, Text, Pressable, Alert, ScrollView } from 'react-native'

import AppHeader from '../components/AppHeader'

// STYLES
import GlobalStyles from '../styles/global'
import ClassesStyles from '../styles/classes'

// ICONS
import { MaterialIcons } from '@expo/vector-icons';

// CONTEXTS
import ThemeContext from '../contexts/ThemeContext'
import { GlobalContext } from '../contexts/GlobalContext'

// COMPONENTS
import FloatingButton from '../components/FloatingButton'
import Empty from '../components/Empty'

const ClassesScreen = () => {
    const { APP_COLORS } = useContext(ThemeContext)
    const {store, removeClass} = useContext(GlobalContext)

    return (
    <>
      <AppHeader />
      <View style={[GlobalStyles.container, {backgroundColor: APP_COLORS.bgColor}]}>
        <Text style={[{fontSize: 22, fontWeight: "bold"},{color: APP_COLORS.appPrimaryColor}]}>Classes</Text>
        <Text style={{fontWeight: "bold", fontSize: 15, color: "gray", marginBottom: 10}}>Your subjects / modules</Text>
        {store.classes.length === 0 ? 
          <Empty emptyMessage={"You do not have any subject added"} buttonText={"Add subject"} navigateTo={"classes_modal"}/>
          :
          <ScrollView style={GlobalStyles.contentCardsContainer} showsVerticalScrollIndicator={false}>
            {store.classes.map(subject => (
              <Pressable 
                key={subject.subject_id}
                style={[GlobalStyles.contentCard, {backgroundColor:  APP_COLORS.contentCard.bg}]} 
              >
                <View>
                  <Text style={[GlobalStyles.cardSubject, {color: APP_COLORS.appSecondaryColor}]}>{subject.subject_name}</Text>
                  <Text style={GlobalStyles.cardLecturer}>{subject.lecturer}</Text>
                </View>
                <Pressable
                  onPress={()=>{
                    Alert.alert(`Remove ${subject.subject_name}`, `Are you sure you want to remove ${subject.subject_name} from classes?`, [
                      {
                        text: "Remove",
                        onPress: () => removeClass(subject.subject_id)
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
            ))}
          </ScrollView>
        }
      </View>
      <FloatingButton navigateTo={"classes_modal"} />
    </>
    )
}

export default ClassesScreen