// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, tlestring } from '@prisma/client'

const prisma = new PrismaClient()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<tlestring[]>
) {
    prisma.tlestring.findMany().then((tlestrings) => {
    res.status(200).json(tlestrings)
  })
}
