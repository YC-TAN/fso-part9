import { NewPatient, Gender } from "../types";
import {z} from 'zod';

export const NewPatientSchema = z.object({
    name: z.string(),
    ssn: z.string(),
    gender: z.enum(Gender),
    dateOfBirth: z.string().date(),
    occupation: z.string(),
    entries: z.array(z.any()).default([]),
});

export const toNewPatientEntry = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

// const isString = (text: unknown): text is string => {
//   return typeof text === 'string' || text instanceof String;
// };

// const parseString = (text: unknown): string => {
//   if (!isString(text)) {
//     throw new Error('Incorrect or missing field');
//   }

//   return text;
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const parseDate = (date: unknown): string => {
//   if (!isString(date) || !isDate(date)) {
//       throw new Error('Incorrect or missing date: ' + date);
//   }
//   return date;
// };


// const isGender = (param: string): param is Gender => {
//   return Object.values(Gender).map(v => v.toString()).includes(param);
// };

// const parseGender = (gender: unknown): Gender => {
//   if (!isString(gender) || !isGender(gender)) {
//       throw new Error('Incorrect gender: ' + gender);
//   }
//   return gender;
// };

// const toNewPatientEntry = (object: unknown): NewPatient => {
//   if ( !object || typeof object !== 'object' ) {
//     throw new Error('Incorrect or missing data');
//   }

//   if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
//     const newEntry: NewPatient = {
//       name: parseString(object.name),
//       ssn: parseString(object.ssn),
//       gender: parseGender(object.gender),
//       dateOfBirth: parseDate(object.dateOfBirth),
//       occupation: parseString(object.occupation)
//     };

//     return newEntry;
//   }

//   throw new Error('Incorrect data: some fields are missing');
// };

// export default toNewPatientEntry;