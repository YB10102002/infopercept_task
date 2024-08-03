import {useEffect } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext';

//components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
const Home1 = () => {
    
    const {workouts,dispatch} = useWorkoutContext()

    useEffect(() => {
        const fetchW = async () => {
           const res = await fetch('/api/workouts'); 
           const json = await res.json();

           if(res.ok){  
            //setWorkouts(json);
           dispatch({type : 'SET_WORKOUTS' , payload : json})
           }
        }
        fetchW()
    },[dispatch]);
    return (
        <div className="Home1">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    //<p key={workout._id}>{workout.title}</p>
                    <WorkoutDetails key={workout._id} workout = {workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home1