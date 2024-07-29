const database = require('mongoose');

const table = database.Schema;

const workoutTable = new table({
    title : {
        type : String,
        required : true
    },
    reps : {
        type : Number,
        required : true
    },
    load : {
        type : Number,
        //required : true
    }
},{timestamps : true});

module.exports = database.model('WorkoutModel',workoutTable);

// Workout.find();