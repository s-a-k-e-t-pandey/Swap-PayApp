import { Card } from "@repo/ui/card";
import { getServerSession } from "next-auth";
import authOptions from "../app/lib/auth";

export default async function({ p2pTxns }: {
    p2pTxns: {
        time: Date,
        amount: number,
        senderPhone: String,
        receiverPhone: String
    } []
}) {
    const session = await getServerSession(authOptions)

    if (!p2pTxns) {
        return <Card title="P2P Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent Transactions
            </div>
        </Card>
    }

    return <Card title="P2P Transactions">
        <div>
            {p2pTxns.map(tx => 
                <div className="flex justify-between py-1 border-t border-gray-300">
                    <div className="flex">
                        <div className="flex items-center pr-2">
                            {(tx.senderPhone === session?.user?.email)? <SentIcon />: <ReceiveIcon />}
                        </div>
                        <div>
                            <div>
                                {(tx.senderPhone === session?.user?.email)? <Sent />: <Receive />}
                            </div>
                            <div className="text-slate-600 text-xs subpixel-antialiased font-semibold">
                                {(tx.senderPhone === session?.user?.email)? tx.receiverPhone: tx.senderPhone}
                            </div>
                            <div className="text-slate-400 text-xs subpixel-antialiased">
                                {tx.time.toDateString()}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex">
                            <div className="font-semibold text-gray-600 antialiased">
                                Rs 
                            </div>  
                            <div className="w-20 text-right antialiased">
                                {tx.amount / 100}
                            </div>
                        </div>
                    </div> 
                </div>
            )}
        </div>
    </Card>
}


function SentIcon() {
    
    return <div className="flex">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
        </div>
    </div>
}

function ReceiveIcon() {
    
    return <div className="flex">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
            </svg>
        </div>
    </div>   
}

function Sent() {

    return <div className="text-sm text-slate-600 subpixel-antialiased">
        Paid to
    </div>
}

function Receive() {

    return <div className="text-sm text-slate-600 subpixel-antialiased">
        Received from
    </div>
}