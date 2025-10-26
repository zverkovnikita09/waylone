"use client"

import {useState} from "react";
import {Input} from "@/shared/ui/Input";
import {Button} from "@/shared/ui/Button";

interface PhoneTabProps {
    isCodeSent?: boolean;
}

export const PhoneTab = ({isCodeSent}: PhoneTabProps)=>{
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/api/login/phone`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify({ application: formData }),
        });
        const data = await response.json();

        console.log(data)
    }

    const handleSubmitCode = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/api/login/code`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
        });
        const data = await response.json();

        console.log(data)
    }

    if(isCodeSent){
        return <form onSubmit={handleSubmitCode}>
            <p>Код</p>
            <Input value={code} onChange={(e)=>setCode(e.target.value)}/>
            <Button type="submit">Отправить</Button>
        </form>
    }

    return <form onSubmit={handleSubmit}>
        <Input value={phone} onChange={(e)=>setPhone(e.target.value)}/>
        <Button type="submit">Отправить</Button>
    </form>
}