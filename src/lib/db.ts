import { PrismaClient } from '@prisma/client'
import "server-only"

declare global {
  var cachedPrisma: PrismaClient | undefined;
}

export const db = globalThis.cachedPrisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.cachedPrisma = db;