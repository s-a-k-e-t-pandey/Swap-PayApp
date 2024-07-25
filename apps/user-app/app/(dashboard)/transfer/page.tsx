import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import db from "@repo/db/client";
import { AddMoneyCard } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";


const getBalance = async () => {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id;

    if (!userId) {
        return {
            amount: 0,
            locked: 0
        };
    }
    const balance = await db.balance.findUnique({
        where: {
            userId: Number(userId)
        }
    })

    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}


async function getOnRampTransaction(){
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return {
            amount: 0,
            locked: 0
        };
    }
    const txns = await db.onRampTransaction.findMany({
        where: {
            userId: Number(userId)
        }
    })
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function(){
    const balance = await getBalance();
    const transactions = await getOnRampTransaction();

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            transfer
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