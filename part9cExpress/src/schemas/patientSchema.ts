import {z} from 'zod';

import { Gender } from '../types';

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    occupation: z.string(),
    gender: z.nativeEnum(Gender),
});

const PatientSchema = NewPatientSchema.extend({
    id: z.string().uuid(),
});

export const PatientArraySchema = z.array(PatientSchema);