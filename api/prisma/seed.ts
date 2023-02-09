import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

// 定義されたデータを実際のモデルへ登録する処理
const main = async () => {
  console.log(`Start seeding ...`)

  console.log(`Seeding finished.`)
}

// 処理開始
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
