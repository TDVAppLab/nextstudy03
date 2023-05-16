import axios, { AxiosError, AxiosResponse } from "axios";
import { SatelliteOrbitalElement } from "@/app/models/SatelliteOrbitalElement";
import { URL_NORAD_ACTIVESAT_2LE, URL_NORAD_ACTIVESAT_JSON } from "@/app/constants";


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
    activesat2leobjectnamesjson: () => requests.get<SatelliteOrbitalElement[]>(URL_NORAD_ACTIVESAT_JSON),
    activesat2lestringsraw: () => requests.get<string>(URL_NORAD_ACTIVESAT_2LE),
}


const agentinternal = {
    NORADServerAccess,
}

export default agentinternal;