import { forecastWeatherGraphProps } from "../stores/forecastData";
export const calcXYAxis = (valsArr:number[], height:number, width:number,) => {
    let yAxis: number[]
    const h = height - height * 0.25;
    let maxVal = Math.max(...valsArr);
    const minVal = Math.min(...valsArr);
    const check = maxVal === minVal;
    maxVal += maxVal * 0.9;
    if (check) {
        yAxis = valsArr.map(() => (height - 10) / 2);
    } else {
        yAxis = valsArr.map((v: number) => h - (v / maxVal) * h);
    }
    const xDelta = (width - 20) / valsArr.length;
    const xAxis:number[] = valsArr.map((v: number, i: number) => xDelta * i);
    const xyAxis = xAxis.map((v: number, i: number) => v + ',' + yAxis[i]).join(' ');
    forecastWeatherGraphProps.set({xAxis:xAxis,yAxis:yAxis,xyAxis:xyAxis})
    
};