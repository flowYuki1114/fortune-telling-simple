import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 環境変数が設定されている場合のみPrismaクライアントを作成
export const prisma = process.env.DATABASE_URL 
  ? (globalForPrisma.prisma ?? new PrismaClient())
  : null

if (process.env.NODE_ENV !== 'production' && prisma) {
  globalForPrisma.prisma = prisma
}