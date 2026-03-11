// export enum Weather {
//   Sunny = 'sunny',
//   Rainy = 'rainy',
//   Cloudy = 'cloudy',
//   Stormy = 'stormy',
//   Windy = 'windy',
// }

// export enum Visibility {
//   Great = 'great',
//   Good = 'good',
//   Ok = 'ok',
//   Poor = 'poor',
// }

// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';
// export type Visibility = 'great' | 'good' | 'ok' | 'poor';

// Define the arrays as constants
export const WeatherOptions = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'] as const;
export const VisibilityOptions = ['great', 'good', 'ok', 'poor'] as const;

// Derive the types from the arrays
export type Weather = typeof WeatherOptions[number];
export type Visibility = typeof VisibilityOptions[number];

export interface Diary {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
}

export type NewDiaryEntry = Omit<Diary, 'id'>;

export type NonSensitiveDiaryEntry = Omit<Diary, 'comment'>;

export interface NotificationState {
    message: string | null;
    type: 'success' | 'error' | null;
}