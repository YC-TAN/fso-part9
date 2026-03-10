import express from 'express';
import { Response } from 'express';
import { NonSensitiveDiaryEntry } from '../types';
import diaryService from '../services/diaryService';
import {toNewDiaryEntry} from '../utils';
import {z} from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res:Response<NonSensitiveDiaryEntry>) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addDiary(newDiaryEntry);    
    res.json(addedEntry);
  } catch (error: unknown) {
    // let errorMessage = 'Something went wrong.';
    // if (error instanceof Error) {
    //   errorMessage += ' Error: ' + error.message;
    // }
    // res.status(400).send(errorMessage);
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;