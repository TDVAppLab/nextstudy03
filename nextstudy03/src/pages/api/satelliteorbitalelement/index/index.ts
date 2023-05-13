// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { tlestring } from '@prisma/client'
import prisma from '@/app/prisma'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<tlestring[]>
) {
    prisma.tlestring.findMany().then((tlestrings) => {
    res.status(200).json(tlestrings)
  })
}
