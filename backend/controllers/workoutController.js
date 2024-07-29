const Workout = require('../models/WorkoutModel');
const database = require('mongoose');
//get all workouts
const allWorkouts = async (req, res) => {
    const w = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(w);
}
//------------------------------------------------------------------------------------------------------------------
//get single workouts
const singleWorkout = async (req, res) => {
    const { id } = req.params;
    if (!database.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No workouts found!!!' });
    }
    const w = await Workout.findById(id);
    if (!w) {
        return res.status(404).json({ error: 'No workouts found!!!' });
    }
    res.status(200).json(w);
}
//------------------------------------------------------------------------------------------------------------------
//create a new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body
    //add doc to db
    try {
        const w = await Workout.create({ title, reps, load });
        res.status(200).json(w);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//------------------------------------------------------------------------------------------------------------------
//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    if (!database.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No workouts found!!!' });
    }
    const w = await Workout.findOneAndDelete({ _id: id });
    if (!w) {
        res.status(400).json({ error: 'No worksouts found!!! , delete failed...' });
    }
    res.status(200).json(w);
};
//------------------------------------------------------------------------------------------------------------------
//update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    if (!database.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No worksouts found!!! , update failed...' });
    }
    const w = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!w) {
        res.status(404).json({ error: 'No worksouts found!!! , update failed...' });
    }
    res.status(200).json(w);
}

//------------------------------------------------------------------------------------------------------------------
module.exports = {
    allWorkouts,
    singleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}