import api from "../utils/api";

export const workoutService = {
  async getWorkouts() {
    const res = await api.get("/api/workouts");
    return res.data;
  },

  async addWorkout(workout) {
    const res = await api.post("/api/workouts", workout);
    return res.data;
  },

  async deleteWorkout(id) {
    const res = await api.delete(`/api/workouts/${id}`);
    return res.data;
  },
};
