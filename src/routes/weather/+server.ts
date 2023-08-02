import { json } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import { OPEN_WEATHER_API } from "$env/static/private";


type WEATHER_REQUEST = {
    lat: string,
    lon: string,
    type: string
}

async function fetchCommon (URL:string) {
    try {
        const res = await fetch(URL)
        const data = await res.json()
        return json(await data)
    } catch (e) {
        return json({"err":"Open Weather Error"})
    }
  
}

export async function POST({request}:RequestEvent){
   try {
    const res:WEATHER_REQUEST = await request.json()
    if(Object.keys(res).length > 0) {
        if(res.lat && res.lon) {
            if(res.type === 'currentWeather') {
                return await fetchCommon(`https://api.openweathermap.org/data/2.5/weather?lat=${res.lat}&lon=${res.lon}&units=metric&appid=${OPEN_WEATHER_API}`)
            } else if( res.type === 'forecastWeather') {
                return await fetchCommon(`https://api.openweathermap.org/data/2.5/onecall?lat=${res.lat}&lon=${res.lon}&exclude=minutely,current&units=metric&appid=${OPEN_WEATHER_API}`)
                
            }
        }
    }
  
    return json({"err":"invalid request"})
   
   } catch (e) {

    return json({"err":'internal err'})
   }
    
}