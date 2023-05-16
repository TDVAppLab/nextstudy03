// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import GetDataFromNORADServer from '@/services/GetDataFromNORADServer';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  const session = await getSession({ req });

  if(session){
    console.log("start updated from norad server");
    await GetDataFromNORADServer();
    console.log("data updated");
  
    res.status(200).json(true )

  } else {

    console.log("unauthorized");
    res.status(401).json(false )
  }
}