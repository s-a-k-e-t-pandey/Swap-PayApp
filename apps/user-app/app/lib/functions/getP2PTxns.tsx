import { getServerSession } from "next-auth";
import authOptions from "../auth";
import db from '@repo/db/client'

export default async function() {
    const session = await getServerSession(authOptions)
    const p2pTxns = await db.p2PTransfer.findMany({
        where: {
            OR: [
                { fromUser: session?.user?.email },
                { toUser: session?.user?.email }
            ]
        },
        orderBy: { timeStamp: 'desc' }
    })
    
    return p2pTxns.map(tx => ({
        time: tx.timeStamp,
        amount: tx.amount,
        senderPhone: tx.fromUser,
        receiverPhone: tx.toUser
    }))
}