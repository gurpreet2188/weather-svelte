import { browser } from "$app/environment"


export const getLocation = async ():Promise<GeolocationPosition | null | string> => {
    if (browser) {
        if (navigator.geolocation) {
            const permission = await getLocationPermissionStatus() as PermissionState
            console.log(permission)
            if (permission) {
                if (permission === 'prompt' || permission === 'granted') {
                    try {
                        return new Promise((resolve,reject)=>{
                            navigator.geolocation.getCurrentPosition(resolve,reject)
                        })
                        // const pos:{lat:number,lon:number} = navigator.geolocation.getCurrentPosition(pos => {
                        //   return { lat: pos.coords.latitude, lon: pos.coords.longitude }
                        // })
                        // return pos
                    } catch (e) {
                        console.log(e)
                        return 'denied'
                    }
                }else {
                    return 'denied'
                }
            } 

        }

    }
    return null
}

export const getLocationPermissionStatus = async (): Promise<PermissionState | null> => {
    if (browser) {
        if (navigator.geolocation) {
            return (await navigator.permissions.query({ name: 'geolocation' })).state
        }
    }

    return null
}