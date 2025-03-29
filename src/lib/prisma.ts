import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

// Set the global variable only in development mode
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
