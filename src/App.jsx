import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' Component={HomePage}/>
      </Routes>
    </>
  )
}

export default App
