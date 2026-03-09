// import { isNotNumber } from "./utils";

// interface InputValues {
//     height: number;
//     weight: number;
// }

// const parseArguments = (args: string[]): InputValues => {
//   if (args.length < 4) throw new Error('Not enough arguments');
//   if (args.length > 4) throw new Error('Too many arguments');

//   if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
//     return {
//       height: Number(args[2]),
//       weight: Number(args[3])
//     }
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// }

const rateBmi = (bmi: number): string => {
    if (bmi < 18.5) {
        return 'underweight'
    } else if (bmi >= 30) {
        return 'obese'
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return 'normal range'
    } else {
        return 'overweight'
    }
}

export const calculateBmi = (height: number, weight: number): string => {
    if (height <= 0 || weight <= 0) {
        throw Error('number must be greater than 0')
    }

    const bmi = weight / (height/100) **2
    return rateBmi(bmi)
}

// console.log(calculateBmi(180, 74))

// try {
//     const { height, weight} = parseArguments(process.argv)
//     calculateBmi(height, weight)
// } catch (error: unknown) {
//     let errorMessage = "Something went wrong: "
//     if (error instanceof Error) {
//         errorMessage += error.message
//     }
//     console.error(errorMessage)
// }