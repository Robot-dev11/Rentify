import { Routes, Route, BrowserRouter  } from 'react-router-dom'
import { SignIn } from './page/signin.jsx'
import { SignUp } from './page/signup.jsx'
import './App.css'
import { Dashboard } from './page/dashboard.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
