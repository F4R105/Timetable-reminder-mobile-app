import { createContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store'

export const GlobalContext = createContext()
export const SECURE_STORE_KEY = 'timetable_r'

export const GlobalContextProvider = ({children}) => {
    const [store, setStore] = useState(null)
    const DEFAULT_SECURE_STORE_VALUE = {
        classes: new Array(),
        timetable: [
            {
                day: "monday",
                priority: 3,
                classes: new Array(0)
            },
            {
                day: "tuesday",
                priority: 4,
                classes: new Array(0)
            },
            {
                day: "wednesday",
                priority: 5,
                classes: new Array(0)
            },
            {
                day: "thursday",
                priority: 6,
                classes: new Array(0)
            },
            {
                day: "friday",
                priority: 7,
                classes: new Array(0)
            },
            {
                day: "saturday",
                priority: 1,
                classes: new Array(0)
            },
            {
                day: "sunday",
                priority: 2,
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
        const updatedTimetable = []
        for(let timetableDay of store.timetable){
            const updatedTimetableDayClasses = timetableDay.classes.filter(subject => subject.subject_id !== subject_id)
            timetableDay.classes = updatedTimetableDayClasses
            updatedTimetable.push(timetableDay)
        }
        
        const newStore = store
        newStore.classes = updatedClassesArray
        newStore.timetable = updatedTimetable
        updateStore(newStore)
    }

    const addSchedule = ({subject_id, lectureRoom, day, time}) => {
        // 1. get subject information
        const subjectToSchedule = store.classes.filter(subject => subject.subject_id == subject_id)[0]
        
        // 2. add additional information to subject object
        const schedule = {
            ...subjectToSchedule,
            schedule_id: Math.floor((Math.random() * 10000) + 1),
            lectureRoom,
            day,
            time
        }

        // 3. get stored timetable day that is required by user
        const dayToSchedule = store.timetable.filter(timetableDay => timetableDay.day == day)[0]
        
        // 4. get all days from stored timetable except day submitted by user
        const newTimetable = store.timetable.filter(timetableDay => timetableDay.day != day)

        // 5. add created schedule to day obtained at 1
        dayToSchedule.classes.push(schedule)

        // 6. add updated day to timetable
        newTimetable.push(dayToSchedule)
        newTimetable.sort((prev,item) => prev.priority - item.priority)

        // 7. new storage
        const newStore = store
        newStore.timetable = newTimetable
        
        updateStore(newStore)
    }

    const removeSchedule = (schedule_id) => {
        const updatedTimetable = []
        for(let timetableDay of store.timetable){
            const newSchedules = timetableDay.classes.filter(schedule => schedule.schedule_id != schedule_id)
            timetableDay.classes = newSchedules
            updatedTimetable.push(timetableDay)
        }

        const newStore = store
        newStore.timetable = updatedTimetable
        updateStore(newStore)
    }

    const resetStorage = async () => {
        try{
            await SecureStore.deleteItemAsync(SECURE_STORE_KEY)
            // loadStorage()
            return "App storage cleared successfully"
        }catch(error){console.log(error.message)}
    }

    useEffect(()=>{
        loadStorage()
    },[])

    return (
    <GlobalContext.Provider value={{store, getCurrentDate, addClass, removeClass, addSchedule, removeSchedule, resetStorage}}>
        {children}
    </GlobalContext.Provider>
    )
}

