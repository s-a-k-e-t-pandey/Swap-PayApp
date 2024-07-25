import { Sidebaritem } from "../../components/Sidebaritem"
import { RiHomeSmileLine } from "react-icons/ri";
import { BiTransferAlt } from "react-icons/bi";
import { FaClockRotateLeft } from "react-icons/fa6";

export default function Layout({children}: {children: React.ReactNode}): JSX.Element{
    return (
        <div className="flex">
            <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
                <div>
                    <Sidebaritem href={"/dashboard"} icon={<HomeIcon/>} title="Home"></Sidebaritem>
                    <Sidebaritem href={"/transfer"} icon={<Transfer/>} title="Transfer"></Sidebaritem>
                    <Sidebaritem href={"/transactions"} icon={<TransactionsIcon/>} title="Transactions"></Sidebaritem>
                </div>
            </div>
            {children}
        </div>
    )
}

function HomeIcon(){
    return <RiHomeSmileLine />
    
}

function TransactionsIcon(){
    return <FaClockRotateLeft />

}

function Transfer(){
    return <BiTransferAlt />
}