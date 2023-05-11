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
            setStore(newStore)
        }catch(error){
            console.log(error.message)
        }
    }

    const getCurrentStore = async () => {
        try{
            const store = await SecureStore.getItemAsync(SECURE_STORE_KEY)
            setStore(JSON.parse(store))
        }catch(error){
            console.log(error.message)
        }
    }

    const addClass = () => {

    }

    const removeClass = () => {

    }

    const addSchedule = () => {

    }

    const removeSchedule = () => {

    }

    const resetStorage = async () => {
        try{
            await AsyncStorage.deleteItemAsync(SECURE_STORE_KEY)
            console.log("Async storage cleared")
        }catch(error){console.log(error.message)}
    }

    return (
    <GlobalContext.Provider value={{store, isGuest, getCurrentDate}}>
        {children}
    </GlobalContext.Provider>
    )
}

