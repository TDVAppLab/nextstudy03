// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import agent from '@/app/agent';
import { PrismaClient, tlestring } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {


    const objectnames = await agent.Xtest.objectnames();

    const rawstring = await agent.Xtest.activesat2lestringsraw();
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
        
        const setdata = await prisma.tlestring.create({
            data: {...tle
            },
        });
    }

    res.status(200).json({ name: 'John Doe' })
}