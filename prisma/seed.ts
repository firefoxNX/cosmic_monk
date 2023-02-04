import { prisma } from "../src/server/db";
import {randomUUID} from "crypto";

async function main() {
    const id = randomUUID();
    await prisma.example.upsert({
        where: {
            id,
        },
        create: {
            id,
        },
        update: {},
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
