import express from 'express';
import { Response } from 'express';
import { PatientWithoutSsn } from '../types';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/patientParser';

const router = express.Router();

router.get('/', (_req, res: Response<PatientWithoutSsn[]>) => {
    res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatientEntry(req.body);
        const addedEntry = patientService.addPatient(newPatient);    
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
    
});

export default router;