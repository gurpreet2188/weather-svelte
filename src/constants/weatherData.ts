
import type { Hourly as HOURLY, Daily as DAILY } from "../types/forecastWeather"
import { WEATHER_DATA_TYPES, HOURLY_DAILY } from "./forecast"



const FORECAST_DATA_COMMON_JSON:{[key:string]: (v:DAILY| HOURLY)=>number} = {
    [WEATHER_DATA_TYPES.TEMP]: (v: HOURLY | DAILY) => v[WEATHER_DATA_TYPES.TEMP] as number,
    [WEATHER_DATA_TYPES.HUMIDITY]: (v: HOURLY | DAILY) => v[WEATHER_DATA_TYPES.HUMIDITY]  as number,
    [WEATHER_DATA_TYPES.UV]: (v: HOURLY | DAILY) => v[WEATHER_DATA_TYPES.UV]  as number,
    [WEATHER_DATA_TYPES.PERCI]: (v: HOURLY | DAILY) => v[WEATHER_DATA_TYPES.PERCI] * 100  as number,
}

export const FORECAST_HOURLY_DATA_JSON:{[key:string]: (v:HOURLY)=>number} = {
    ...FORECAST_DATA_COMMON_JSON,
    [WEATHER_DATA_TYPES.RAIN]: (v: HOURLY):number => v[WEATHER_DATA_TYPES.RAIN] ? v[WEATHER_DATA_TYPES.RAIN][WEATHER_DATA_TYPES.HOURLY_RAIN] : 0,
    [WEATHER_DATA_TYPES.SNOW]: (v: HOURLY):number => v[WEATHER_DATA_TYPES.SNOW] ? v[WEATHER_DATA_TYPES.SNOW][WEATHER_DATA_TYPES.HOURLY_SNOW] : 0
}

export const FORECAST_DAILY_DATA_JSON:{[key:string]: (v:DAILY)=>number} = {
    ...FORECAST_DATA_COMMON_JSON,
    [WEATHER_DATA_TYPES.TEMP]: (v: DAILY) => v[WEATHER_DATA_TYPES.TEMP][WEATHER_DATA_TYPES.DAILY_TEMP],
    [WEATHER_DATA_TYPES.RAIN]: (v: DAILY):number => v[WEATHER_DATA_TYPES.RAIN] ? v[WEATHER_DATA_TYPES.RAIN] : 0,
    [WEATHER_DATA_TYPES.SNOW]: (v: DAILY):number => v[WEATHER_DATA_TYPES.SNOW] ?  v[WEATHER_DATA_TYPES.SNOW] : 0
}


export const FORECAST_WEATHER_DATA_JSON = {
    [HOURLY_DAILY.DAILY]: FORECAST_DAILY_DATA_JSON,
    [HOURLY_DAILY.HOURLY]: FORECAST_HOURLY_DATA_JSON
}
