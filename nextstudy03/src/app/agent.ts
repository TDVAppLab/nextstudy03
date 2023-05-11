import axios, { AxiosError, AxiosResponse } from "axios";
import { ObjectNameDtO } from "./models/ObjectNameDtO";
import { SatelliteOrbitalElement } from "./models/SatelliteOrbitalElement";

const sleep = (delay: number) => {
    return new Promise((resolve)=>{
        setTimeout(resolve, delay)
    })
}


axios.defaults.baseURL = "/api";




axios.interceptors.response.use(async response => {
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url:string) => axios.get<T>(url).then(responseBody),
    post: <T>(url:string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url:string, body: {}) => axios.put<T>(url,body).then(responseBody),
    del: <T>(url:string) => axios.delete<T>(url).then(responseBody),
}

const NORADServerAccess = {
    activesat2leobjectnamesjson: () => requests.get<SatelliteOrbitalElement[]>('https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=json'),
    activesat2lestringsraw: () => requests.get<string>('https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=2le'),
}



const agent = {
    NORADServerAccess,
}

export default agent;