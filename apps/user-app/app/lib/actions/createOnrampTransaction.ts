"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client"


export async function createOnrampTransaction(provider: string, amount: number) {
    const session = await getServerSession(authOptions)
    if(!session?.user || !session.user?.id){
        return {
            msg: "Unauthentcated request"
        }
    }

    const token = (Math.random() * 1000).toString();
    const userId = session?.user?.id;
    if (!userId) {
        return {
            message: "User not logged in"
        }
    }
    await prisma.onRampTransaction.create({
        data: {
            userId: Number(userId), // 1
            amount: amount,
            status: "Processing",
            startTime: new Date(),
            provider,
            token: token
        }
    })
    return {
        msg: "Done"
    }
}