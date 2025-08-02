import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">Be on your toes</p>
        <input type="text" className='inputbox' name = 'names' placeholder='enter name ...'/>
        <input type="password" className='inputbox'  name = 'pass'placeholder='enter password...'/>
        <input type="button" className='submit-btn' value='submit' onClick={(names,pass)=>{console.log(names,pass)}}/>
        <a
          className="login-btn"
          href={`${import.meta.env.VITE_API_URL}/auth/google`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Sign in with Google
        </a>

      </div>
    </div>
    
  )
}

export default App;
