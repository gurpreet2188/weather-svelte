import type { Root as CURRENT_WEATHER } from "./currentWether"
import type {Root as FORECAST_WEATHER} from './forecastWeather'


export type API_RESPONSE = {
    'err' : string,
    'currentWeather': CURRENT_WEATHER,
    'forecastWeather': FORECAST_WEATHER

}

