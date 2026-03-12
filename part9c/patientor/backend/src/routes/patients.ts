import express, {Request, Response, NextFunction} from 'express';
import {z} from 'zod';

import { NewPatient, Patient, ErrorResponse, EntryWithoutId } from '../types';
import patientService from '../services/patientService';
import { NewPatientSchema, NewEntrySchema } from '../utils/patientParser';

const router = express.Router();

router.get('/', (_req, res: Response<Patient[]>) => {
    res.send(patientService.getPatients());
});

router.get('/:id', (req, res: Response<Patient | ErrorResponse >) => {

    const id = req.params.id;

    const patientReturned = patientService.getPatient(id);

    if (!patientReturned) {
      res.status(404).send({ error: 'Patient not found' });
    } else {
      res.send(patientReturned);
    }
    
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};


const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};


router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedEntry = patientService.addPatient(req.body);    
    res.json(addedEntry); 
});

router.post('/:id/entries', newEntryParser, (req: Request<{id: string}, unknown, EntryWithoutId>, res: Response<Patient | ErrorResponse>) => {
  const id = req.params.id;

  const patientToUpdate = patientService.getPatient(id);

  if (!patientToUpdate) {
    return res.status(404).send({error: 'Patient unknown'});
  } 
  const addedEntry = patientService.addEntry(req.body, patientToUpdate);  
  
  if (!addedEntry) {
    return res.status(500).send({error: 'Something went wrong'});
  }
  return res.json(addedEntry);
  
});

router.use(errorMiddleware);

export default router;