import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };
const prismaConfig = {
  log: ["query", "info", "warn", "error"],
};

// Reuse Prisma Client if already initialized, otherwise create a new one.
const prisma = globalForPrisma.prisma || new PrismaClient(prismaConfig);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
