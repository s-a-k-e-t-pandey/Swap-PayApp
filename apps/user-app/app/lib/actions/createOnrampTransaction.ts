"use server"
import { getServerSession } from "next-auth"
import authOptions from "../auth"
import db from '@repo/db/client'

export const createOnRampTransaction = async (provider: string, amount: number) => {
    const session = await getServerSession(authOptions)

    if(!session?.user || !session.user?.id)
    {
        return {
            message: 'unauthenticated'
        }
    }

    const token = (Math.random() * 1000).toString()
    
    await db.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token,
            userId: Number(session?.user?.id),
            amount: amount * 100
        }
    })

    return {
        message: 'Done'
    }
}