import React from 'react'
import { useContext } from 'react'
import { AppState } from '../../App'
const Home = () => {
  const { user } = useContext(AppState)
  return (
    <div>
      Hi : {user.username}
      how are you
    </div>
  )
}

export default Home
