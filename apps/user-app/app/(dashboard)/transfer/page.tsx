import { getServerSession } from "next-auth";
import { AddMoneyCard } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import db from '../../../../../packages/db/src'
import authOptions from "../../lib/auth";

const getBalance = async () => {
    const session = await getServerSession(authOptions)
    const balance = await db.balance.findUnique({
        where: {
            userId: Number(session?.user?.id)
        }
    })

    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}
async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await db.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function() {
    const balance = await getBalance()
    const transactions = await getOnRampTransactions()
    
    return <div className="w-screen">
        <div className="text-2xl text-[#6a51a6] pt-6 pl-5 mb-4 font-bold subpixel-antialiased">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoneyCard />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />

                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div> 
    </div>
}