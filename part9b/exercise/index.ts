import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from './utils';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const {height, weight} = req.query;

    if (!weight || !height || isNotNumber(height) || isNotNumber(weight)) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    try{
        const result = calculateBmi(Number(height), Number(weight));
        console.log(result);
        return res.json({
            weight,
            height,
            bmi: result
        });
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).send({ error: error.message })
        }
        return res.status(400).send({ error: 'An unknown error occurred' })
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        return res.status(400).send({ error: 'parameters missing' });
    }

    if (isNotNumber(target) || !Array.isArray(daily_exercises) || daily_exercises.length <= 0 || daily_exercises.some(e => isNotNumber(e))) {
        return res.status(400).send({ error: 'malformated parameters' });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);

    return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log('SERVER @ PORT ', PORT);
});