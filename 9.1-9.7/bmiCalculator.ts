const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmiResult = weight / Math.pow(heightInMeters, 2);
  console.log(bmiResult);
  if (bmiResult < 15) {
    return 'Very severely underweight';
  } else if (bmiResult < 16 && bmiResult >= 15) {
    return 'Serverely underweight';
  } else if (bmiResult < 18.5 && bmiResult >= 16) {
    return 'Underweight';
  } else if (bmiResult < 25 && bmiResult >= 18.5) {
    return 'Normal (healthy weight)';
  } else if (bmiResult < 30 && bmiResult >= 25) {
    return 'Overweight';
  } else if (bmiResult < 35 && bmiResult >= 30) {
    return 'Obese Class I (Moderately obese)';
  } else if (bmiResult < 40 && bmiResult >= 35) {
    return 'Obese Class II (Severely obese)';
  } else {
    return 'Obese Class III (Very Severely obese)';
  }
};

console.log(calculateBmi(200, 97));
