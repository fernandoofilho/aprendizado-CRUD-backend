import "dotenv/config";
import { defineConfig } from "prisma/config";

// O Prisma usa este arquivo para achar o schema e o comando de seed.
// A URL do banco continua no schema.prisma (env DATABASE_URL).
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
});
