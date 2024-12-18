import { OnRampTransactions } from "../../../components/OnRampTransactions";
import P2pTxnsCard from "../../../components/P2pTxnsCard";
import getP2PTxns from "../../lib/functions/getP2PTxns";
import getTxns from "../../lib/functions/getTxns";

export default async function() {
    const transactions = await getTxns()
    const p2pTxns = await getP2PTxns()

    return <div className="w-full h-full">
        <div className="text-2xl text-[#6a51a6] pt-6 pl-5 mb-4 font-bold subpixel-antialiased">
            Transactions
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 p-5">
            <div className="pr-2">
                <OnRampTransactions transactions={transactions} />
            </div>
            <div>
                <P2pTxnsCard p2pTxns={p2pTxns} />
            </div>
        </div>
    </div>
}