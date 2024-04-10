import { useState } from "react"
import "./App.css"
import { useEffect } from "react"
import { postJokeService } from "./services/jokeService.jsx"
import steveApproves from "./assets/steveApproves.png"

export const App = () => {
  const [userInput, setUserInput] = useState("")
  const [clicked, setClicked] = useState(false)



  return <>
    <div className="app-heading-circle">
      <img className="app-logo" src={steveApproves} alt="Good job Steve" />
    </div>
    <div className="joke-add-form">
      <div>Hello World!</div>
      <input name="joketextbox"
      className="joke-input"
      type="text"
      //This sets the field to user input, meaning :
      value={userInput}
      //When this component re-renders, user input will reset
      // and the field will contain only the placeholder.
      placeholder="New One Liner"
      onChange={(event) => {
        setUserInput(event.target.value);
      }}/>
      <button onClick={() => {postJokeService(userInput); setUserInput("");}} 
      className="joke-input-submit"> Add Joke</button>
    </div>
  </>
}

