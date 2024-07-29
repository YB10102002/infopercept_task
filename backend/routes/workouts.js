const express = require('express');
const {
    allWorkouts,
    singleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController');
const router = express.Router();


//get all workouts
// router.get('/',(req,res) => {
//     res.json({msg:'GET all workouts'});
// });
router.get('/',allWorkouts);
//------------------------------------------------------------------------------------------------------------------
//get single workouts
// router.get('/:id',(req,res) => {
//     res.json({msg:'GET single workout'});
// });
router.get('/:id',singleWorkout);
//------------------------------------------------------------------------------------------------------------------
//post a new workout
router.post('/',createWorkout);
//------------------------------------------------------------------------------------------------------------------
//delete workout
// router.delete('/:id',(req,res) => {
//     res.json({msg:'DELETE workout'});
// });
router.delete('/:id',deleteWorkout);
//------------------------------------------------------------------------------------------------------------------
//update workout
// router.patch('/:id',(req,res) => {
//     res.json({msg:'UPDATE workout'});
// });
router.patch('/:id',updateWorkout);

// router.get('/hello',() => {});

module.exports = router;