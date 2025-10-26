"use client"

import {useState} from "react";
import {Input} from "@/shared/ui/Input";
import {Button} from "@/shared/ui/Button";

export const EmailTab = ()=>{
    const [emila, setEmail] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/api/login/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify({ application: formData }),
        });
        const data = await response.json();

        console.log(data)
    }

    return <form onSubmit={handleSubmit}>
        <Input value={phone} onChange={(e)=>setPhone(e.target.value)}/>
        <Button type="submit">Отправить</Button>
    </form>
}