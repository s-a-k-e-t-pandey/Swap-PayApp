import { Card } from "@repo/ui/card";

export const BalanceCard = ({amount, locked}: {amount: number; locked: number})=>{

    return <Card title={"Balance"}>
        <div>
            <BalanceBlock topic={"Unlocked Balance"} value={(amount)/100}/>
            <BalanceBlock topic={"Total locked Balance"} value={(locked)/100}/>
            <BalanceBlock topic={"Total Balance"} value={(amount + locked)/100}/>
        </div>
    </Card>
}


const BalanceBlock = ({topic, value}: {topic: string, value: number}) =>{
    return <div className="flex justify-between border-b border-slate-300 pb-2">
        <div>
            {topic}
        </div>
        <div>
            {value} INR
        </div>
    </div>
}