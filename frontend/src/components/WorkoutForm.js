import { useState } from "react";
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutContext();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const w = { title, reps, load };

        // Fetch request for POST request to add new data
        const res = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(w),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await res.json();

        if (!res.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields || []);
        }

        if (res.ok) {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setEmptyFields([]);
            console.log('New workout added:', json);
            dispatch({ type: 'CREATE_WORKOUT', payload: json });
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Exercise Load (in KG):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Exercise Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm;
