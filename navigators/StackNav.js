import { createStackNavigator } from '@react-navigation/stack';

// SCREENS
import TimetableScreen from '../screens/TimetableScreen'
import TimetableModal from '../screens/TimetableModal'
import ClassesScreen from '../screens/ClassesScreen'
import ClassesModal from '../screens/ClassesModal'

const Stack = createStackNavigator();

export function TimetableStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"timetable_screen"}>
      <Stack.Screen name="timetable_screen" component={TimetableScreen} />
      <Stack.Screen name="timetable_modal" component={TimetableModal} />
    </Stack.Navigator>
  );
}

export function ClassesStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"classes_screen"}>
        <Stack.Screen name="classes_screen" component={ClassesScreen} />
        <Stack.Screen name="classes_modal" component={ClassesModal} />
      </Stack.Navigator>
    );
  }