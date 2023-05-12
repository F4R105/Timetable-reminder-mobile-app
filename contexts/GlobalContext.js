import { createContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store'

export const GlobalContext = createContext()

export const GlobalContextProvider = ({children}) => {
    const [store, setStore] = useState(null)
    const SECURE_STORE_KEY = 'timetable_r'
    const DEFAULT_SECURE_STORE_VALUE = {
        classes: new Array(),
        timetable: [
            {
                day: "monday",
                classes: new Array(0)
            },
            {
                day: "tuesday",
                classes: new Array(0)
            },
            {
                day: "wednesday",
                classes: new Array(0)
            },
            {
                day: "thursday",
                classes: new Array(0)
            },
            {
                day: "friday",
                classes: new Array(0)
            },
            {
                day: "saturday",
                classes: new Array(0)
            },
            {
                day: "sunday",
                classes: new Array(0)
            }
        ]
    }

    const getCurrentDate = () => {
        const getDay = () => {
            const day = new Date().getDay()
          
            switch(day){
              case 1: return "Monday"; break;
              case 2: return "Tuesday"; break;
              case 3: return "Wednesday"; break;
              case 4: return "Thursday"; break;
              case 5: return "Friday"; break;
              case 6: return "Saturday"; break;
              case 0: return "Sunday"; break;
            }
        }
          
        const getMonth = () => {
        const month = new Date().getMonth()
        
        switch(month){
            case 0: return "January"; break;
            case 1: return "February"; break;
            case 2: return "March"; break;
            case 3: return "April"; break;
            case 4: return "May"; break;
            case 5: return "June"; break;
            case 6: return "July"; break;
            case 7: return "August"; break;
            case 8: return "September"; break;
            case 9: return "October"; break;
            case 10: return "November"; break;
            case 11: return "December"; break;
        }
        }

        const day = getDay()
        const date = new Date().getDate()
        const month = getMonth()
        const year = new Date().getFullYear()
      
        return {day, date, month, year}
    } 

    const isGuest = async () => {
        try{
            const store = await SecureStore.getItemAsync(SECURE_STORE_KEY)
            if(!store) return true
            return false
        }catch(error){
            console.log(error.message)
        }
      }


    const updateStore = async (newStore) => {
        try{
            await SecureStore.setItemAsync(SECURE_STORE_KEY, JSON.stringify(newStore))
            setStore({...newStore})
            // console.log('updated store', store)
        }catch(error){
            console.log(error.message)
        }
    }

    const loadStorage = async () => {
        try{
            let userStorage = await SecureStore.getItemAsync(SECURE_STORE_KEY)
            if(!userStorage){
                updateStore(DEFAULT_SECURE_STORE_VALUE)
                return
            }
            setStore(JSON.parse(userStorage))
        }catch(error){
            console.log(error.message)
        }
    }

    const addClass = ({subject, lecturer}) => {
        const subjectSchema = {
            subject_id: Math.floor((Math.random() * 10000) + 1),
            subject_name: subject,
            lecturer,
        }

        const currentStore = store
        currentStore.classes.push(subjectSchema)
        updateStore(currentStore)
    }

    const removeClass = (subject_id) => {
        const updatedClassesArray = store.classes.filter(subject => subject.subject_id !== subject_id)
        
        const newStore = store
        newStore.classes = updatedClassesArray
        updateStore(newStore)
    }

    const addSchedule = ({subject_id, lectureRoom, day, time}) => {
        // 1. get subject information
        const schedule = store.classes.filter(subject => subject.subject_id == subject_id)[0]
        
        // 2. add additional information to subject object
        schedule.lectureRoom = lectureRoom
        schedule.day = day
        schedule.time = time

        // 3. get stored timetable day that is required by user
        const dayToSchedule = store.timetable.filter(timetableDay => timetableDay.day == day)[0]
        
        // 4. get all days from stored timetable except day submitted by user
        const newTimetable = store.timetable.filter(timetableDay => timetableDay.day != day)

        // 5. add created schedule to day obtained at 1
        dayToSchedule.classes.push(schedule)

        // 6. add updated day to timetable
        newTimetable.push(dayToSchedule)

        // 7. new storage
        const newStore = store
        newStore.timetable = newTimetable
        
        updateStore(newStore)
    }

    const removeSchedule = ({subject_id, schedule_day}) => {
        console.log('schedule to remove', {subject_id, schedule_day})
    }

    const resetStorage = async () => {
        try{
            await SecureStore.deleteItemAsync(SECURE_STORE_KEY)
            loadStorage()
            return "App storage cleared successfully"
        }catch(error){console.log(error.message)}
    }

    useEffect(()=>{
        loadStorage()
    },[])

    return (
    <GlobalContext.Provider value={{store, isGuest, getCurrentDate, addClass, removeClass, addSchedule, removeSchedule, resetStorage}}>
        {children}
    </GlobalContext.Provider>
    )
}

