import {v1 as uuid} from 'uuid';
import patients from '../../data/patients';
import { Patient, NewPatient, PatientWithoutSsn } from '../types';

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const createPatient = ( patient: NewPatient ): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...patient
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatientsWithoutSsn,
    createPatient
};