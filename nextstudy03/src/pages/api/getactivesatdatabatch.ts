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
    await GetDataFromNORADServer();
  
    res.status(200).json(true )

  } else {

    res.status(401).json(false )
  }
}