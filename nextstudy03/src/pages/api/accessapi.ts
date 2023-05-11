// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, tlestring } from '@prisma/client'
import agent from '@/app/agent';

const prisma = new PrismaClient()



interface ObjectNameDtO {
    noradcatid: number;
    objectname: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<tlestring[]>
) {

    let objectnames : ObjectNameDtO[]= [];
    agent.Xtest.list().then((data) => {
        
        data.forEach((element) =>
            objectnames.push({noradcatid: element.NORAD_CAT_ID, objectname: element.OBJECT_NAME})
        )
        console.log("json loading finished");
    });
    //console.log(objectnames);

//    const objectnames = getTleStrings();
//    console.log("get string finished");
//    console.log(objectnames.toString());
    
    //var url = 'https://api.wheretheiss.at/v1/satellites/25544';
    var url = 'https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=2le';

    var https = require('https');

    var data : any[] = [];




    console.log("start 2le api access");
    https.get(url, function (res : any) {
        res.on('data', function(chunk : any) {
        
            data.push(chunk);
        
        }).on('end', async function() {
            
            console.log("start 2le line processing");
            const lines = Buffer.concat(data).toString().split('\r\n');
            //var r = JSON.parse(events);
//            console.log(lines);

            //const tles : tlestring[] = [];

            for (var i=0; i < lines.length-1; i=i+2) {
//                const tle : tlestring = {noradcatid: Number( lines[i].substring(2,7)), objectname: "test" + i.toString(), line1: lines[i], line2: lines[i+1], latest_update_datetime: new Date()};

                const objn = "";//objectnames.find((element) => element.NORAD_CAT_ID === Number( lines[i].substring(2,7)))?.OBJECT_NAME;


                const tle : tlestring = {
                    noradcatid: Number( lines[i].substring(2,7)), 
                    objectname: objn ? objn : "", 
                    line1: lines[i], 
                    line2: lines[i+1], 
                    latest_update_datetime: new Date()};

                //tles.push(tle);
                //DELETE FROM tlestring;
                //url_tlejson.find((element) => element.noradcatid === tle.noradcatid)?.objectname;

                const setdata = await prisma.tlestring.create({
                    data: {...tle
                    },
                });
                
            }

            //console.log(tles);

        
        });
    });

    prisma.tlestring.findMany().then((tlestrings) => {
    res.status(200).json(tlestrings)
  })
}

/*
function getTleStrings() : ObjectNameDtO[] {
    
    const url = 'https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=json';
    const data : any[] = [];
    const items : ObjectNameDtO[] = [];


    const https = require('https');

    console.log("function called");   

    https.get(url, function (res : any) {
        res.on('data', function(chunk : any) {
        
            data.push(chunk);
            console.log("data chunk");   
        
        }).on('end', function() {
        
            const events = Buffer.concat(data).toString();
            var r = JSON.parse(events);
            r.forEach((element : any) => {
                items.push({noradcatid: element.NORAD_CAT_ID, objectname: element.OBJECT_NAME});
            });
            console.log("roading finishied"); 
        });
    }).then(() => {
        return items;
    });

}
*/