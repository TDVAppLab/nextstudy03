import { tlestring } from "@prisma/client";
import agentinternal from "./agentinternal";
import { prisma } from "./prisma";

export default async function GetDataFromNORADServer(): Promise<void>{
    
    
    const objectnames = await agentinternal.NORADServerAccess.activesat2leobjectnamesjson();

    const rawstring = await agentinternal.NORADServerAccess.activesat2lestringsraw();
    const lines = rawstring.split('\r\n');


    for (var i=0; i < lines.length-1; i=i+2) {
        
        const temp_objectname = objectnames.find((element) => element.NORAD_CAT_ID === Number( lines[i].substring(2,7)))?.OBJECT_NAME;


        const tle : tlestring = {
            noradcatid: Number( lines[i].substring(2,7)),
            objectname: temp_objectname ? temp_objectname : "",
            line1: lines[i],
            line2: lines[i+1],
            latest_update_datetime: new Date()
        };
        
        const setdata = await prisma.tlestring.upsert({
            where: { noradcatid: tle.noradcatid },
            update: { ...tle },
            create: { ...tle }
        });
    }

}