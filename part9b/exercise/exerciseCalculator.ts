// import { isNotNumber } from "./utils";

// interface Values {
//     hoursArr: number[],
//     target: number
// }

export interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: Rating;
    ratingDescription: string;
    target: number;
    average: number;
}

type Rating = 1 | 2 | 3;

// const parseArguments = (args: string[]): Values => {
//   if (args.length < 4) throw new Error('Not enough arguments');
// //   if (args.length > 4) throw new Error('Too many arguments');
//     const allArgs = args.slice(2)

//   if (allArgs.some(n => isNotNumber(n))) {
//     throw new Error('Provided values were not numbers!');
//   } 
//    return {
//         hoursArr: allArgs.slice(1).map(Number),
//         target: Number(allArgs[0])
//    }
// };

const rate = (average: number, target: number): Rating => {
    const boundaries = 0.5
    const lower = target - boundaries 
    const upper = target + boundaries

    if (average < lower) {
        return 3
    } else if (average > upper) {
        return 1
    } else {
        return 2
    }
};

const describeRating = (rate: Rating): string => {
    switch (rate) {
        case 1:
            return 'Awesome!'
        case 2:
            return 'not too bad but could be better'
        case 3:
            return 'work harder next week!'
        default:
            throw new Error('Rating out of range, choose between 1 to 3')
    }
};

export const calculateExercises = ( hoursArr: number[], target: number): Result => {
    
    const periodLength = hoursArr.length;
    const averageTraining = hoursArr.reduce((acc, val) => acc+ val, 0) / periodLength;
    const rating = rate(averageTraining, target);

    // const report = {
    //     periodLength: periodLength,
    //     trainingDays: hoursArr.filter(e => e > 0).length,
    //     success: averageTraining >= target,
    //     rating: rating,
    //     ratingDescription: describeRating(rating),
    //     target,
    //     average: averageTraining,
    // }
    // console.log(report)

    return {
        periodLength: periodLength,
        trainingDays: hoursArr.filter(e => e > 0).length,
        success: averageTraining >= target,
        rating: rating,
        ratingDescription: describeRating(rating),
        target,
        average: averageTraining,
    };
};

// const hours = [3, 0, 2, 4.5, 0, 3, 1]

// console.log(calculateExercises(hours, 2))

// try {
//     const { hoursArr, target } = parseArguments(process.argv);
//     calculateExercises(hoursArr, target)
// } catch (error: unknown) {
//   let errorMessage = 'Something bad happened.'
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.log(errorMessage);
// }