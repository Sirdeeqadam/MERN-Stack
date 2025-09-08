const express = require('express')
const {createWorkout,getWorkouts,getWorkout,deleteWorkout,updateWorkout
} = require('../controllers/workoutControllers')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// get all workouts
router.get('/', getWorkouts)

// get a single workouts
router.get('/:id', getWorkout)

// post a new workouts
router.post('/', createWorkout)

// delete a workouts
router.delete('/:id', deleteWorkout)
 
// UPDATE a workouts
router.put('/:id', updateWorkout) 
 


module.exports = router