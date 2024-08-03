const Workout = require('../models/WorkoutModel');
const database = require('mongoose');

// Get all workouts
const allWorkouts = async (req, res) => {
    const w = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(w);
}

// Get single workout
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

// Create a new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    let emptyFields = [];
    if (!title) {
        emptyFields.push('title');
    }
    if (!reps) {
        emptyFields.push('reps');
    }
    if (!load) {
        emptyFields.push('load');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill all the fields...', emptyFields });
    }

    try {
        const w = await Workout.create({ title, reps, load });
        res.status(200).json(w);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    if (!database.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No workouts found!!!' });
    }
    const w = await Workout.findOneAndDelete({ _id: id });
    if (!w) {
        return res.status(400).json({ error: 'No workouts found!!! Delete failed...' });
    }
    res.status(200).json(w);
};

// Update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    if (!database.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No workouts found!!! Update failed...' });
    }
    const w = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });
    if (!w) {
        return res.status(404).json({ error: 'No workouts found!!! Update failed...' });
    }
    res.status(200).json(w);
}

module.exports = {
    allWorkouts,
    singleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
};
