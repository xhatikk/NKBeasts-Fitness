window.NKWorkouts = {
  async load() {
    try {
      const response = await fetch("/data/workouts.json");
      if (!response.ok) throw new Error("Workout data unavailable");
      return await response.json();
    } catch (error) {
      console.warn("NKBEASTS workouts:", error);
      return {};
    }
  }
};
