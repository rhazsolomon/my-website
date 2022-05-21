
import { async } from '@firebase/util'
import { useEffect, useState } from 'react'
import { dbSet } from '../database/db'


const Playground = () => {

    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        dbSet(setTransactions, 'user_201BAA2A-0DA7-413D-BFD8-EC6E55F891B2', 'transaction')
    }, [])

    return (
        <div>
            {transactions.map(u => u.amount)}
        </div>
    )
}

export default Playground;