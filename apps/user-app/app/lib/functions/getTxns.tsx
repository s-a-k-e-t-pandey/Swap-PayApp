import { getServerSession } from "next-auth"
import authOptions from "../auth"
import db from '@repo/db/client'

export default async function() {
    const session = await getServerSession(authOptions)
    const txns = await db.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    })

    return txns.map(t => ({
        time: t.startTime, 
        amount: t.amount,
        status: t.status, 
        provider: t.provider    
    }))
}