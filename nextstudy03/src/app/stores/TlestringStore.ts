import { tlestring } from "@prisma/client";
import {  makeAutoObservable, runInAction } from "mobx";
import agent from "../agent";
//import agent from "../api/agent";
//import { tlestring } from "../models/tlestring";


export default class TlestringStore {
    tlestringRegistry = new Map<string, tlestring>();
    selectedTlestring: tlestring| undefined = undefined;
    loading=false;

    constructor(){
        makeAutoObservable(this)
    }

    loadObjects = async () => {
        this.loading = true;
        this.tlestringRegistry.clear();
        try {
            const objects = await agent.SatelliteOrbitalElements.list();
            objects.forEach(object => {
                this.setObject(object);
            })
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    setSelectedTlestring = (id: string) => {
        this.selectedTlestring = this.tlestringRegistry.get(id);
    }

    private setObject = (object : tlestring) => {
        this.tlestringRegistry.set(object.noradcatid.toString(),object);
    }

    private getObject=(id:string) => {
        return this.tlestringRegistry.get(id);
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

}