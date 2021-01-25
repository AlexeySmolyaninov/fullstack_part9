interface CalculateExercisesResult {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  raiting: 1 | 2 | 3;
  ratingDescription: string;
}

const calculateExercises = (
  exercises: number[],
  target: number
): CalculateExercisesResult => {
  const periodLength = exercises.length;
  const trainingDays = Math.floor(periodLength / 7) * 5;
  const average =
    exercises.reduce((acc, hours) => acc + hours, 0) / periodLength;
  const success = average >= target;
  const raiting = average >= target ? 3 : average >= target * 0.7 ? 2 : 1;
  const ratingDescription =
    raiting === 3
      ? "You have reached your target, Congrats!"
      : raiting === 2
      ? "Not too bad but could be better"
      : "You are far away from your target";
  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    raiting,
    ratingDescription,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
