import { useState } from "react"
import { type NewDiaryEntry, type Weather, type Visibility, WeatherOptions, VisibilityOptions } from "../types"

const useField = (type: string) => {
    const [value, setValue ] = useState('')

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    
    return {
        type,
        value,
        onChange
    }
}

interface DiaryFormProps {
    addNew: (entry: NewDiaryEntry) => void;
}

const DiaryForm = (props: DiaryFormProps) => {
    const date = useField('date');
    const [visibility, setVisibility] = useState<Visibility>('great')
    const [weather, setWeather] = useState<Weather>('sunny')
    const comment = useField('text');

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        props.addNew({
        date: date.value,
        weather,
        visibility,
        comment: comment.value,
        });
    }

    return (
        <>
        <h1>Add new entry</h1>
      <form onSubmit={handleSubmit}>
        <label>
          date <input {...date}/>
        </label>
        <br />
        <label>
          weather {VisibilityOptions.map(option => (
            <>
                <input 
                    key={option}
                    type='radio' 
                    name='visibility'
                    value={option}
                    checked={visibility === option}
                    onChange={() => setVisibility(option)}
                />
                {option}
                </>
            ))            
          }
        </label>
        <br />
        <label>
          weather {WeatherOptions.map(option => (
            <>
                <input 
                    key={option}
                    type='radio' 
                    name='weather'
                    value={option}
                    checked={weather === option}
                    onChange={() => setWeather(option)}
                />
                {option}
                </>
            ))            
          }
        </label>
        <br />
        <label>
          comment <input {...comment}/>
        </label>
        <br />
        <button type='submit'>Add</button>
      </form>
        </>
    )
};

export default DiaryForm;