import axios, { AxiosError, AxiosResponse } from "axios";
import { SatelliteOrbitalElement } from "./models/SatelliteOrbitalElement";
import { User, tlestring } from "@prisma/client";
import { UserFormValues } from "./models/user";
import { store } from "./stores/store";

/*
const sleep = (delay: number) => {
    return new Promise((resolve)=>{
        setTimeout(resolve, delay)
    })
}
*/

axios.defaults.baseURL = "/api";



axios.interceptors.request.use(config => {
    const token = store.commonStore.token;


    //console.log("token get on axios config set function with store : " + token)


    if(token) config.headers!.Authorization = `Bearer ${token}`
    return config;
})

/*
axios.interceptors.request.use(config => {

    let token : string | null = null;
    getCsrfToken().then(((t)=>{ if(t){token=t}}));
    
    console.log("token get on axios config set function : " + token)

    if(token) config.headers!.Authorization = `Bearer ${token}`
    return config;
})*/

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


const SatelliteOrbitalElements = {
    list:() => requests.get<tlestring[]>(`/satelliteorbitalelement/index`),
    details:(title:string) => requests.get<SatelliteOrbitalElement>(`/satelliteorbitalelement/details/${title}`),
    gettlestring:(id:string) => requests.get<tlestring>(`/satelliteorbitalelement/gettlestring/${id}`),
    //
}


const batchlogs = {
    //    list:() => requests.get<batchlog[]>(`/batch/index`),
        getactivesatapi: () => axios.post<void>(`/getactivesatdatabatch`),
    //    batch01:() => requests.get<>(`/batch/index`),
    }

const Account = {
//    current: () => requests.get<User>('/account'),
//    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/register', user)
}

const agent = {
    SatelliteOrbitalElements,
    batchlogs,
    Account,
}

export default agent;