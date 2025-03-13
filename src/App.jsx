import { useState } from 'react'
import './App.css'
import {HeadSeo} from "./components/HeadSeo"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HeadSeo/>
    </>
  )
}

export default App
