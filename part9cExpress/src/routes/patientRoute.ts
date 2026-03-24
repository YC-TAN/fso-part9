import express, {Request, Response} from 'express';
import {newPatientParser} from '../utils/middleware';

import patientService from '../services/patientService';
import { Patient, NewPatient, PatientWithoutSsn } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<PatientWithoutSsn[]>) => {
    res.send(patientService.getPatientsWithoutSsn());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.createPatient(req.body);
    res.json(addedPatient);
});

export default router;