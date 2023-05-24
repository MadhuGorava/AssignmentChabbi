import {useState, useEffect} from 'react'
import './index.css'

const TypingApp = () => {
  const [text, setText] = useState('')
  const [currentKey, setCurrentKey] = useState('')
  const [keysPressed, setKeysPressed] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [timer, setTimer] = useState(300) // 5 minutes in seconds

  const targetKeys = 'asdfjkl;' // The keys to be practiced

  const handleKeyDown = event => {
    const {key} = event
    setCurrentKey(key)

    if (targetKeys.includes(key)) {
      setText(prevText => prevText + key)
      setKeysPressed(prevKeys => prevKeys + 1)
    }
  }

  const handleKeyUp = () => {
    setCurrentKey('')
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const correctKeys = text
      .split('')
      .filter((char, index) => char === targetKeys[index])
    const accuracyPercentage = (correctKeys.length / text.length) * 100
    setAccuracy(accuracyPercentage.toFixed(2))
  }, [text])

  return (
    <div className="container">
      <h1 className="heading">Touch Typing Practice</h1>
      <div className="text-container">
        <textarea
          rows="5"
          cols="50"
          className="text-area"
          value={text}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          disabled={timer <= 0}
        />
      </div>
      <div className="sub-container">
        <p>Keys to type: {targetKeys}</p>
        <p>Next key: {currentKey}</p>
      </div>
      <div className="sub-container">
        <p>Time left: {timer} seconds</p>
        <p>Keys pressed: {keysPressed}</p>
        <p>Accuracy: {accuracy}%</p>
      </div>
    </div>
  )
}

export default TypingApp
