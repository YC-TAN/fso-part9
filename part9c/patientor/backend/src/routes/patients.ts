import express from 'express';
import { Response } from 'express';
import { PatientWithoutSsn } from '../types';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res: Response<PatientWithoutSsn[]>) => {
    res.send(patientService.getPatients());
});

export default router;