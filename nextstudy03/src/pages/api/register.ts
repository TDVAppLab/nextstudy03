// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/services/prisma'
import bcrypt from 'bcrypt'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {

  
  const saltRounds = 10;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  const testUser = await prisma.user.upsert({
    where: { email: req.body.email },
    update: {},
    create: {
      email: req.body.email,
      name: req.body.username,
      //@ts-ignore
      crypted_password : hashedPassword
    },
  })
  
  res.status(200).json(true)
  
}