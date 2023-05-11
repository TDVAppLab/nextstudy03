// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, tlestring } from '@prisma/client'
import agent from '@/app/agent';

const prisma = new PrismaClient()


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<tlestring[]>
) {
    
    const objectnames = await agent.Xtest.list();


    var url = 'https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=2le';

    var https = require('https');

    var data : any[] = [];




    https.get(url, function (res : any) {
        res.on('data', function(chunk : any) {
        
            data.push(chunk);
        
        }).on('end', async function() {
            
            const lines = Buffer.concat(data).toString().split('\r\n');

            for (var i=0; i < lines.length-1; i=i+2) {
                const objn = objectnames.find((element) => element.NORAD_CAT_ID === Number( lines[i].substring(2,7)))?.OBJECT_NAME;


                const tle : tlestring = {
                    noradcatid: Number( lines[i].substring(2,7)), 
                    objectname: objn ? objn : "", 
                    line1: lines[i], 
                    line2: lines[i+1], 
                    latest_update_datetime: new Date()};

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
