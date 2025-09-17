import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { workoutService } from "../services/workoutService";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) return;

    try {
      const deletedWorkout = await workoutService.deleteWorkout(workout._id);
      dispatch({ type: "DELETE_WORKOUT", payload: deletedWorkout });
    } catch (err) {
      console.error("Delete failed:", err.error || err);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{new Date(workout.createdAt).toLocaleString()}</p>
      <span onClick={handleClick} style={{ cursor: "pointer", color: "red" }}>
        🗑
      </span>
    </div>
  );
};

export default WorkoutDetails;
