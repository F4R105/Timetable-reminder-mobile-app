import { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// ICONS
import Ionicons from '@expo/vector-icons/Ionicons';

// SCREENS
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { TimetableStack, ClassesStack } from './StackNav';

// CONTEXTS
import ThemeContext from '../contexts/ThemeContext';

const Tab = createBottomTabNavigator();


export default function BottomTabs() {

  const { APP_COLORS } = useContext(ThemeContext)

  const TabScreenOptions = {
    initialRouteName: "home_screen",
    headerShown: false,
    tabBarActiveTintColor: APP_COLORS.bottomNavColors.active,
    tabBarInactiveTintColor: APP_COLORS.bottomNavColors.inactive,
    tabBarStyle: { height: 65,paddingBottom: 5,paddingTop: 5, backgroundColor: APP_COLORS.bottomNavColors.bg},
    tabBarHideOnKeyboard: true,
  }


  return (
    <Tab.Navigator  screenOptions={TabScreenOptions}>
        <Tab.Screen 
            name="home_screen"
            options={{tabBarLabel: "HOME",tabBarIcon: ({color}) => <Ionicons name="home" size={32} color={color} />}} 
            component={HomeScreen} 
        />
        <Tab.Screen 
            name="timetable_stack" 
            options={{tabBarLabel: "TIMETABLE",tabBarIcon: ({color}) => <Ionicons name="calendar" size={32} color={color} />}}
            component={TimetableStack} 
        />
        <Tab.Screen 
            name="classes_stack" 
            options={{tabBarLabel: "CLASSES",tabBarIcon: ({color}) => <Ionicons name="book" size={32} color={color} />}}
            component={ClassesStack} 
        />
        <Tab.Screen 
            name="settings" 
            options={{tabBarLabel: "SETTINGS",tabBarIcon: ({color}) => <Ionicons name="settings-sharp" size={32} color={color} />}}
            component={SettingsScreen} 
        />
    </Tab.Navigator>
  );
}