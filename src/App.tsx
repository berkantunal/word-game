import React, { useState, useEffect } from 'react'
import Game from './views/Home'
import Speech from './libs/Speech'

import './assets/css/vendor/bootstrap/bootstrap.scss'
import './assets/css/wordGame/style.css'

function App() {
  const [browserSupport, setBrowserSupport] = useState(true)
  const [audioPermisson, setAudioPermisson] = useState(true)
  const speech = new Speech()

  useEffect(() => {
    const detectBrowserSupport = async () => {
      if (!speech.isAvailable()) {
        setBrowserSupport(false)
      }
    }

    const detectAudioPermission = async () => {
      try {
        await speech.audioPermission()
      } catch (error) {
        setAudioPermisson(false)
      }
    }

    detectBrowserSupport()
    detectAudioPermission()
  }, [])

  return (
    <div className="App h-100">
      <div className="d-flex justify-content-center align-items-center h-100">
        {!browserSupport && 'Tarayıcınız bu oyunu oynamak için uygun değildir!'}
        {!audioPermisson && 'Lütfen mikrofon kullanıma izin verin!'}
        {browserSupport && audioPermisson && <Game speech={speech} />}
      </div>
    </div>
  )
}

export default App
