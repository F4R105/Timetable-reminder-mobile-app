import { useEffect, useState } from 'react';
import Navigation from './navigators/Navigation'
import * as SecureStore from 'expo-secure-store'

// CONTEXTS
import { GlobalContextProvider } from './contexts/GlobalContext';
import { ThemeContextProvider } from './contexts/ThemeContext'

// COMPONENTS
import AppIntro from './components/AppIntro';


export default function App() {
  const [showAppIntro, setShowAppIntro] = useState(false)
  const {SECURE_STORE_KEY} = require('./contexts/GlobalContext')

  const isGuest = async () => {
    try{
        const store = await SecureStore.getItemAsync(SECURE_STORE_KEY)
        // if is a guest
        if(!store) return setShowAppIntro(true)
    }catch(error){
        console.log(error.message)
    }
  }

  useEffect(()=>{isGuest()},[])

  return (
    <ThemeContextProvider>
    {showAppIntro ? 
      <AppIntro setShowAppIntro={setShowAppIntro} /> :
      <GlobalContextProvider>
        <Navigation />
      </GlobalContextProvider>
    }
    </ThemeContextProvider>
  );
}