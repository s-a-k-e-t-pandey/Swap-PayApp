"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Appbar } from "@repo/ui/Appbar"


export function AppbarClient(){
    const session = useSession();
    const Router = useRouter();
    return <div>
        <Appbar onSignin={signIn} onSignout={async ()=>{
            await signOut
            Router.push("/api/auth/signin")
            }} user={session.data?.user}></Appbar>
    </div>
}