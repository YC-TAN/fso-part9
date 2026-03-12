import { Gender, HealthCheckRating } from "../types";
import {z} from 'zod';

// const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
//   if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
//     // we will just trust the data to be in correct form
//     return [] as Array<Diagnosis['code']>;
//   }

//   return object.diagnosisCodes as Array<Diagnosis['code']>;
// };

const EntryBaseSchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

// Specific schemas
const HealthCheckEntrySchema = EntryBaseSchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating)
});

const HospitalEntrySchema = EntryBaseSchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

const OccupationalHealthcareEntrySchema = EntryBaseSchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date()
  }).optional()
});

// Create the Union schema
export const NewEntrySchema = z.union([
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema
]);


export const NewPatientSchema = z.object({
    name: z.string(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    dateOfBirth: z.string().date(),
    occupation: z.string(),
    entries: z.array(NewEntrySchema).optional(),
});

// export const toNewPatientEntry = (object: unknown): NewPatient => {
//   return NewPatientSchema.parse(object);
// };

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