import { WEATHER_DATA_TYPES } from "../constants/forecast"

export type SNOW_RAIN_ICONS = {
    [WEATHER_DATA_TYPES.SNOW]: boolean;
    [WEATHER_DATA_TYPES.RAIN]: boolean;
};