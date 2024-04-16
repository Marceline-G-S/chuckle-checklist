import { useState } from "react"
import "./App.css"
import { useEffect } from "react"
import { deleteJoke, postJokeService, putJoke } from "./services/jokeService.jsx"
import steveApproves from "./assets/steveApproves.png"
import { getJokes } from "./services/getJokesService.jsx"

export const App = () => {
  const [userInput, setUserInput] = useState("")
  const [jokes, setJokes] = useState([])  
  const [toldJokes, setToldJokes] = useState([])  
  const [untoldJokes, setUntoldJokes] = useState([])  
  const [updateToggle, setUpdateToggle] = useState(false)

  useEffect(() => {
    getJokes().then(freshJokes => {
      setJokes(freshJokes)
      setToldJokes(freshJokes.filter((joke) => joke.told === true))
      setUntoldJokes(freshJokes.filter((joke) => joke.told === false))
    })
  }, [])

  useEffect(() => {
    if (updateToggle) {
      getJokes().then(freshJokes => {
        setJokes(freshJokes)
        setToldJokes(freshJokes.filter((joke) => joke.told === true))
        setUntoldJokes(freshJokes.filter((joke) => joke.told === false))
        setUpdateToggle(false)
      })
    } 
  }, [updateToggle])

  const postJoke = async() => {
    if (userInput != ""){
      await postJokeService(userInput); 
    }
    setUserInput(""); 
    setUpdateToggle(true)
  }

  const undoJokeTelling = async(oldJoke) => {
    const editedJoke = { ... oldJoke}
    editedJoke.told = !oldJoke.told
    await putJoke(editedJoke)
    setUpdateToggle(true)
  }

  const removeJoke = async(jokeToDelete) => {
    await deleteJoke(jokeToDelete)
    setUpdateToggle(true)
  }

  return <div className=".app-container">
    <div className="app-heading-circle">
      <img className="app-logo" src={steveApproves} alt="Good job Steve" />
    </div>

    <div className="joke-add-form">
      <div>Let's tell a joke!</div>
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
      <button onClick={() => {postJoke()}} 
      className="joke-input-submit"> Add Joke</button>
    </div>
    <article className="joke-lists-container">
      <div className="joke-list-container">
        {untoldJokes.map(x => { 
          return (
          <section className="joke-list-item" key={x.id}>
            <div>ID: {x.id} {(x.told)?("Told"):("Untold")} </div>
            <div className="joke-list-item-text">{x.text}</div>
            <div className="joke-list-action-toggle"><button onClick={() => (undoJokeTelling(x))} >tell joke</button></div>
            <div className="joke-list-action-delete"><button onClick={() => (removeJoke(x))} >delete</button></div> 
          </section>)})}
      </div>
      <div className="joke-list-container">
      {toldJokes.map(x => { 
          return (
          <section className="joke-list-item" key={x.id}>
            <div>ID: {x.id} {(x.told)?("Told"):("Untold")} </div>
            <div className="joke-list-item-text">{x.text}</div>
            <div className="joke-list-action-toggle"><button onClick={() => (undoJokeTelling(x))} >untell joke</button></div> 
            <div className="joke-list-action-delete"><button onClick={() => (removeJoke(x))} >delete</button></div> 
          </section>)})}
      </div>
    </article>
  </div>
}
//
//
