import React, { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

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
        const response = await fetch("/api/workouts", {
          headers: {  // ✅ fixed
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: json });
          setError(null);
        } else {
          console.error("Failed to fetch workouts:", json.error || json);
          setError(json.error || "Failed to fetch workouts");
        }
      } catch (err) {
        console.error("Error fetching workouts:", err);
        setError("Unable to connect to server");
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
