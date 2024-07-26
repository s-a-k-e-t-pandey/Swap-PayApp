"use client"
import {Center} from "@repo/ui/Center"
import {Card} from "@repo/ui/card" 
import { TextInput } from "@repo/ui/TextInput"
import { useState } from "react"
import { Button } from "@repo/ui/button"


export function SendCard(){
    const [number, setNumber] = useState("")
    const [amount, setAmount] = useState("")
    return <div className="h-[90vh] w-[80vw]">
        <Center>
            <Card title={"Send"}>
                <div className="min-w-72 pt-2">
                  <TextInput placeholder={"Number"} label={"Number"} onChange={(value)=>{setNumber(value)}}></TextInput> 
                  <TextInput placeholder={"Amount"} label={"Amount"} onChange={(value)=>{setAmount(value)}}></TextInput>
                  <div className="pt-4 flex justify-center">
                    <Button onClick={()=>{}}>Send</Button>  
                  </div> 
                </div>
            </Card>
        </Center>
    </div>
}