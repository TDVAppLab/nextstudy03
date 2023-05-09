import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.tlestring.create({
    data: {
        noradcatid: 1,
        objectname: 'test',
        line1: 'line1_test',
        line2: 'line2_test',
        latest_update_datetime: new Date(),
    },
  })
  console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })