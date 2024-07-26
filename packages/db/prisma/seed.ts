import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main(){
    //upsert -> insert or if not present update
    const alice = await prisma.user.upsert({ 
        where: {number: "1111111111"},
        update: {},
        create: {
            number: '1111111111',
            password: await bcrypt.hash('alice', 10),
            name: 'alice',
            Balance: {
                create: {
                    amount: 200000,
                    locked: 0
                }
            },
            OnRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Success",
                    amount: 200000,
                    token: "token__1",
                    provider: "HDFC Bank"
                }
            }
        }
    })
    const bob = await prisma.user.upsert({ 
        where: {number: "2222222222"},
        update: {},
        create: {
            number: '2222222222',
            password: await bcrypt.hash('bob', 10),
            name: 'bob',
            Balance: {
                create: {
                    amount: 50000,
                    locked: 0
                }
            },
            OnRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Failure",
                    amount: 500000,
                    token: "token__2",
                    provider: "AXIS Bank"
                }
            }
        }
    })
    console.log({alice, bob})
}
main()
  .then(async ()=>{
    await prisma.$disconnect()
  })
  .catch(async (e)=>{
    console.error(e);
  })
