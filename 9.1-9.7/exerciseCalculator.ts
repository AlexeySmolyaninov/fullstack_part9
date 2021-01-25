export {};

interface CalculateExercisesResult {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  raiting: 1 | 2 | 3;
  ratingDescription: string;
}

interface CalculateExercisesValues {
  target: number;
  exercises: Array<number>;
}

const parseArguments = (args: Array<string>): CalculateExercisesValues => {
  if (args.length < 4)
    throw new Error("You haven't provided enough arguments.");

  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error("All arguments should be of type Number");
    }
  }
  const [value1, value2, target, ...exercises] = args;
  return {
    target: Number(target),
    exercises: exercises.map((ex) => Number(ex)),
  };
};

const calculateExercises = (
  target: number,
  exercises: Array<number>
): CalculateExercisesResult => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter((el) => el > 0).length;
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

try {
  const { target, exercises } = parseArguments(process.argv);
  console.log(calculateExercises(target, exercises));
} catch (e) {
  console.log("Error has occured. Error message: " + e.message);
}
