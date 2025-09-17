import React, { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { workoutService } from "../services/workoutService";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await workoutService.getWorkouts();
        dispatch({ type: "SET_WORKOUTS", payload: data });
        setError(null);
      } catch (err) {
        console.error("Error fetching workouts:", err);
        setError(err.error || "Unable to fetch workouts");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchWorkouts();
    } else {
      setLoading(false);
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      {loading && <p>Loading workouts...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="workouts">
        {!loading && workouts && workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))
        ) : !loading && !error ? (
          <p>No workouts yet</p>
        ) : null}
      </div>

      <WorkoutForm />
    </div>
  );
};

export default Home;
