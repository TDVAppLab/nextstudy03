// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { tlestring } from '@prisma/client'
import { prisma } from '@/services/prisma'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<tlestring[]>
) {
  console.log("called api")
    prisma.tlestring.findMany().then((tlestrings) => {
    res.status(200).json(tlestrings)
  })
}
