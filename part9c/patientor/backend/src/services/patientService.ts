import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { Patient, NewPatient, EntryWithoutId } from '../types';

const getPatients = (): Patient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation, ssn, entries}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        ssn,
        entries
    }));
};

const getPatient = (id: string): Patient | undefined => {    
    return patients.find((p) => (p.id === id));
};

const addPatient = ( patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

const addEntry = (newEntry: EntryWithoutId, patient: Patient): Patient | undefined => {
    const entryObject = {
        id: uuid(),
        ...newEntry
    };

    const updated = {
        ...patient,
        entries: [
            ...patient.entries,
            entryObject
        ]
    };

    const index = patients.findIndex(p => p.id === patient.id);
    if (index === -1) {
        return undefined;
    }
    patients[index] = updated;
    return updated;
};

export default {
    getPatients,
    getPatient,
    addPatient,
    addEntry
};