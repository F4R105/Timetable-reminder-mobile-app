import { createContext, useEffect, useState } from "react";
import {useColorScheme} from 'react-native';
import * as SecureStore from 'expo-secure-store'

export default ThemeContext = createContext()

export const ThemeContextProvider = ({children}) => {
    const colorScheme = useColorScheme();
    const SECURE_STORE_KEY = 'user_theme_setting'
    const [theme, setTheme] = useState(null)

    const storeUserThemeSetting = async () => {
        try{
            let userThemeSetting = await SecureStore.getItemAsync(SECURE_STORE_KEY)
            if(!userThemeSetting) userThemeSetting = await SecureStore.setItemAsync(SECURE_STORE_KEY, colorScheme)
            setTheme(userThemeSetting)
        }catch(error){console.log('ThemeContext.js', 'useEffect', error.message)}
    }

    const updateUserThemeSetting = async (theme) => {
        try{
            await SecureStore.setItemAsync(SECURE_STORE_KEY, theme)
            setTheme(theme)
        }catch(error){console.log('ThemeContext.js', 'updating user theme setting', error.message)}
    }

    useEffect(()=>{
        storeUserThemeSetting()
    },[])

    const APP_COLORS = {
        appPrimaryColor: (theme === "light") ? "#119a72ff" : "#119a72ff",
        appSecondaryColor: (theme === "light") ? "#095a43ff" : "#c5c5c5",
        textColor: (theme === "light") ? "#1a1a1aff" : "white",
        inputColor: (theme === "light") ? "#e6e6e6" : "gray",
        headerColor: (theme === "light") ? "#e4e4e4" : "#0c0c0c",
        statusBarTxColor: (theme === "light") ? "light" : "white",
        contentCard: {
            bg: (theme === "light") ? "white" : "#0c0c0c",
            subject: (theme === "light") ? "light" : "white",
            lecturer: (theme === "light") ? "light" : "white",
            lectureRoom: (theme === "light") ? "light" : "white",
            time: (theme === "light") ? "light" : "white"
        },
        appIntroColor: {
            bg: (theme === "light") ? "#dbf8efff" : "#1a1a1a",
        },
        bgColor: (theme === "light") ? "#f1f1f1" : "#131313",
        alert: (theme === "light") ? "#f05d5d" : "#f05d5d",
        bottomNavColors: {
            bg: (theme === "light") ? "#119a72ff" : "black",
            active: (theme === "light") ? "white" : "#d1d1d1",
            inactive:  (theme === "light") ? "#21e9adff" : "#2c2c2c"
        }
        // headerColor: statusBarColor
    }


    return (
    <ThemeContext.Provider value={{APP_COLORS, theme, updateUserThemeSetting}}>
        {children}
    </ThemeContext.Provider>
    )
}