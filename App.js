import { useContext, useEffect, useState } from 'react';
import Navigation from './navigators/Navigation';

// CONTEXTS
import { GlobalContext, GlobalContextProvider } from './contexts/GlobalContext';
import { ThemeContextProvider } from './contexts/ThemeContext'

// COMPONENTS
import AppIntro from './components/AppIntro';

const Main = () => {
  const { isGuest } = useContext(GlobalContext)
  const [showAppIntro, setShowAppIntro] = useState(null)

  useEffect(()=>{
    isGuest()
    .then(res =>{
      setShowAppIntro(false)
    })
    .catch(error => console.log(error.message))
  },[])

  return showAppIntro ? 
    <AppIntro setShowAppIntro={setShowAppIntro} /> : 
    <ThemeContextProvider><Navigation /></ThemeContextProvider>
}

export default function App() {
  return (
    <GlobalContextProvider>
      <ThemeContextProvider>
        <Main />
      </ThemeContextProvider>
    </GlobalContextProvider>
  );
}