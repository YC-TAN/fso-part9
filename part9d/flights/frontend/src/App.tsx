import { useState, useEffect } from 'react';
import type { NewDiaryEntry, NonSensitiveDiaryEntry, NotificationState } from './types';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';
import Notification from './components/Notification';
import { getDiaries, createDiary } from './services/diaryService';


function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])
  const [notification, setNotification] = useState<NotificationState>({
    message: null,
    type: null,
  })

  useEffect(() => {
    getDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  const notify = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000); // Clears after 5 seconds
  };

  const createNew = (newDiary: NewDiaryEntry) => {
    createDiary(newDiary)
    .then(returnedDiary => {
      setDiaries(diaries.concat(returnedDiary));
      notify(`diary on ${returnedDiary.date} added`, 'success')
    })
    .catch( error => {
      notify(error.message, 'error')
    })
  } 

  return (
    <>
      <Notification notification={notification} />
      <DiaryForm addNew={createNew} />
      <DiaryList diaries={diaries} />
    </>
  )
}

export default App
