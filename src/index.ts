import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            name: 'Alex-test',
            phone: '316-999',
            email: 'p6Dp3@test2.com',
            password: '123456',
            accounts: {
                create: {
                    account_number: 291001,
                    pin: 1234,
                    balance: 0

                },
            
            }
        }
    })
 
    const allUsers = await prisma.user.findMany({
        include: {
            accounts: true
        }
    });
    console.log('ALL', allUsers);
}

main()
    .catch(async (e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });