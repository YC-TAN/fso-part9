import type { NonSensitiveDiaryEntry } from "../types";

interface EntryProps {
    diary: NonSensitiveDiaryEntry;
}

interface DiaryListProps {
  diaries: NonSensitiveDiaryEntry[];
}

const Entry = ( {diary}: EntryProps) => {
  return (
    <div>
        <h2>{diary.date}</h2>
        <p>
            visibility: {diary.visibility}
            <br />
            weather: {diary.weather}
        </p>
    </div>
  )
}

const DiaryList = ( {diaries}: DiaryListProps) => {
  return (
    <div>
      <h1>Diary Entries</h1>
      {diaries.map(d => (
        <Entry diary={d} key={d.id} />
      ))}
    </div>
    
  )
}

export default DiaryList;