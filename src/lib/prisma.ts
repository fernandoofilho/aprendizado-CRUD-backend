import { PrismaClient } from "@prisma/client";

// Um processo Node deve ter um único PrismaClient.
// Cada instância abre um conjunto de conexões com o Postgres.
// A URL vem de DATABASE_URL, lida pelo schema.prisma.
export const prisma = new PrismaClient();
