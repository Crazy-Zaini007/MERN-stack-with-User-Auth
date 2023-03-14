import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

import { useAuthContext } from '../hooks/useAuthContext'

import { useState } from 'react'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const {dispatch } = useWorkoutsContext()
  const {user}=useAuthContext()
  const [error, setError]=useState('')

  const handleClick = async () => {

    if(!user){

      setError('You are not an Authorized User!')
    }
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`  // here Bearer is the token type used in MongoDB

      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return  (
    <>
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>


    </div>

    {error && <div className='error'>
      {error}
    </div>}
</>
  )
  
}

export default WorkoutDetails