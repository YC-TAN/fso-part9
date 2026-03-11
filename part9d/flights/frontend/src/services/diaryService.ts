import axios from 'axios';
import type { Diary, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const baseUrl = '/api/diaries'

export const getDiaries = () => {
  return axios
    .get<Diary[]>(`${baseUrl}`)
    .then(response => response.data)
}

export const createDiary = (object: NewDiaryEntry) => {
  return axios
    .post<Diary>(baseUrl, object)
    .then(response => response.data)
}