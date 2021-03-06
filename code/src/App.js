import React, { useState, useEffect } from 'react'
import { ScaleLoader } from 'react-spinners'
import { AlreadyPosted } from './components/Posted'
import { UserInput } from './components/Form'

// const APIdata = 'https://technigo-thoughts.herokuapp.com/'
const APIdata = 'https://happy-thoughts-bealun.herokuapp.com/'



export const App = () => {
  const [thoughts, setThoughts] = useState([])
  const [postedMessage, setPostedMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(APIdata)
      .then(res => res.json())
      .then(json => setThoughts(json),
      setLoading(false)
      )}, [postedMessage])


  const handleFormSubmit = message => {
    setPostedMessage(message)
  }

  const onLiked = thoughtId => {
    const updatedThoughts = thoughts.map(thought => {
      if (thought._id === thoughtId) {
        thought.hearts += 1
      }
      return thought
    })
    setThoughts(updatedThoughts)
  }

  return (
    <div>
      <UserInput formSubmit={handleFormSubmit} />

      {loading ? <div className='loading'><ScaleLoader color='black' /></div> : 
      thoughts.map(thought => (
        <AlreadyPosted key={thought._id} thought={thought} onLiked={onLiked} />
      ))}
    </div>
  )
}
