import React, { useState } from "react";
import VStack from "../components/VStack";


const OweMessage = ({ sender, amount }) => {
    const color = sender == 'Rhaz' ? 'bg-green-200' : 'bg-blue-200'
    return (
        <div className={`flex w-full p-4 ${color}`}>
            {sender} {amount}
        </div >
    )
}
const OweMessagePage = () => {
    const [messages, setMessages] = useState([
        {
            sender: 'Rhaz',
            amount: 5,
        },
        {
            sender: 'Mel',
            amount: 10,
        }
    ])
    const total = (
        messages
            .map(a => a.amount)
            .reduce((a, b) => a + b)
    )

    function addMessage(sender, amount) {
        setMessages([...messages, { sender, amount }])
    }

    return (
        <VStack>
            <VStack className="overflow-auto">
                {messages.map(a => (<OweMessage sender={a.sender} amount={a.amount} />))}
            </VStack>
            {total}
            <form onSubmit={e => { addMessage("Rhaz", parseFloat(e.target[0].value)); e.preventDefault() }}>
                <input type='text' className="bg-blue-100" onSubmit={e => console.log(e + "er")} name="amount" />
            </form>

        </VStack>



    )
}

export default OweMessagePage;