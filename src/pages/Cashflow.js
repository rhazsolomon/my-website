import { useEffect, useState } from "react";

import VStack from "../components/VStack";
import HStack from "../components/HStack";

import { generateList, random, sample, subset, randomDate, parseCSV } from "../utility/util";

import { FaDollarSign, FaEnvira, FaTag, FaPlus, FaArrowUp, FaFilter, FaTrash } from "react-icons/fa";
import PieChart from "../components/PieChart";
import { addTransaction, dbSet, deleteTransaction, streamTransactions, streamCategories, streamTags, userId } from "../database/db";
import BounceButton from "../components/BounceButton";


const orderByOptions = ['Date', 'Amount']

const TransactionElementAmount = ({ amount }) => {

    return (
        <HStack className='gap-1 align-middle justify-end font-bold'>
            <FaDollarSign className="text-sm" />
            {Number.parseFloat(amount).toFixed(2)}
        </HStack>
    )
}
const TransactionElementCategory = ({ category, categories }) => {
    console.log(category)
    console.log(categories)
    return (
        <BounceButton>
            <HStack className="gap-2 border-[1pt] h-auto w-auto py-1 px-2 rounded-lg" style={{ borderColor: getColor(categories, category) }}>
                <FaEnvira style={{ fill: getColor(categories, category) }} />
                {getLabel(categories, category)}
            </HStack>
        </BounceButton>
    )
}

const TransactionElementTag = ({ tag_id }) => {
    let content = (<FaPlus />)
    if (tag_id) {
        const tag = tagMap[tag_id]
        content = (<>
            <FaTag style={{ fill: 'border-gray-500' }} />
            <span>{tag}</span>
        </>)
    }
    return (
        <BounceButton>
            <HStack className='w-min inline h-auto border-[1pt] gap-2 border-gray-500 text-gray-500 px-4 rounded-full py-1'>
                {content}
            </HStack>
        </BounceButton>

    )
}

const TransactionElement = ({ transaction, categories }) => {
    return (
        <HStack className='p-4 gap-3 hover:bg-[#272727] h-auto'>
            <BounceButton onClick={() => deleteTransaction(transaction.id)}>
                <FaTrash />
            </BounceButton>

            <div className="w-1 h-full  rounded ml-2"
                style={{ backgroundColor: getColor(categories, transaction.categoryId) }}>
            </div>
            <VStack className='max-w-[600px] h-auto  '>
                <HStack className="w-full h-auto">
                    <TransactionElementCategory category={transaction.categoryId} categories={categories} />
                    <TransactionElementAmount amount={transaction.amount} />
                </HStack>
                <div className="flex-wrap flex py-2 h-auto gap-2">
                    {transaction.tags?.map(t => (<TransactionElementTag tag_id={t} key={t.id + transaction.id} />))}
                    <TransactionElementTag />
                </div>
                <div>{new Date(transaction.date.seconds).toDateString()}</div>
            </VStack>
        </HStack>
    )
}

const TransactionList = ({ transactions, selectedCategoryId, filteredTagIds, categories }) => {
    const displayTransactions = (transactions
        .filter(t => selectedCategoryId == null | t.category == selectedCategoryId)
        .filter(t => filteredTagIds == null | subset(filteredTagIds, t.tags))
    )
    return (
        <VStack className=' overflow-y-auto scrollbar-hide items-start justify-start'>
            {displayTransactions.map(t => (
                <TransactionElement transaction={t} key={t.id} categories={categories} />
            ))}
        </VStack>
    )
}


const FilterOrderByComponent = ({ orderByIdx, setOrderByIdx, orderAscending, setOrderAscending }) => {
    const arrowStyle = {
        transform: orderAscending ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.5s'
    }
    return (
        <HStack className='rounded-full bg-slate-400 border-[1px] border-slate-300  w-min gap-2 hover:opacity-80 hover:bg-slate-600 text-slate-100' >
            <div
                onClick={() => setOrderAscending(!orderAscending)}
                style={arrowStyle}
                className='bg-slate-500 p-2 rounded-full hover:bg-slate-600 shadow-slate-500'
            >
                <FaArrowUp />
            </div>

            <div className="w-auto pr-5 font-bold " onClick={() => { setOrderByIdx((orderByIdx + 1) % orderByOptions.length) }}>{orderByOptions[orderByIdx]}</div>
        </HStack>
    )
}

const Filter = ({ filteredTagIds, setFilteredTagIds, orderByIdx, setOrderByIdx, orderAscending, setOrderAscending }) => {
    return (
        <VStack className='bg-[#272727] p-4 m-4 w-auto h-auto gap-2 rounded-xl border-[1px] border-slate-600'>
            <HStack className='text-slate-400'>
                <FaFilter />
            </HStack>
            <FilterOrderByComponent orderByIdx={orderByIdx} setOrderByIdx={setOrderByIdx} orderAscending={orderAscending} setOrderAscending={setOrderAscending} />
            <HStack className=" rounded-lg  gap-4">
                {filteredTagIds.map(tagId => (<TransactionElementTag tag_id={tagId} />))}
            </HStack>
        </VStack >

    )
}



function getColor(categories, categoryId) {
    if (categoryId === null) {
        return 'rgba(100, 100, 100, 0.5)'
    }
    if (categories === undefined) {
        return 'blue'
    }
    const filtered = categories.filter(c => c.id == categoryId)
    if (filtered.length) {
        return filtered[0].color
    } else {
        return 'red'
    }
}

function getLabel(categories, categoryId) {
    if (categoryId === null) {
        return 'Unknown'
    }
    if (categories === undefined) {
        return 'undefined'
    }
    const filtered = categories.filter(c => c.id == categoryId)
    if (filtered.length) {
        return filtered[0].label
    } else {
        return 'not found'
    }
}
const Cashflow = () => {


    const [allTransactions, setAllTransactions] = useState([])
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])



    const [selectedCategoryId, setSelectedCategoryId] = useState(null)
    const [filteredTagIds, setFilteredTagIds] = useState([
        // 'tag_0F0D9CF7-9197-464E-BA6A-9D33B2540639',
        // 'tag_47932CFC-CD6E-4AA8-B9A3-FFEC1503F363'
    ])
    const [orderByIdx, setOrderByIdx] = useState(1)
    const [orderAscending, setOrderAscending] = useState(true)

    const orderByFunction = (a, b) => {
        let ret = 0
        if (orderByOptions[orderByIdx] == 'Amount') {
            ret = a.amount - b.amount
        } else if (orderByOptions[orderByIdx] == 'Date') {
            ret = a.date - b.date
        }
        return orderAscending ? ret : -ret
    }
    const transactions = (allTransactions
        // .filter(a => a.category == 'category_84A707AD-8E1C-4CC2-AA27-CE23036748BC')
        .sort(orderByFunction)
    )

    function computePieDataFromTransactions(transactions) {
        let categoryToAmount = {}

        for (let t of transactions) {
            if (categoryToAmount[t.categoryId] === undefined) { categoryToAmount[t.categoryId] = 0 }
            categoryToAmount[t.categoryId] = categoryToAmount[t.categoryId] + Number.parseFloat(t.amount)
        }
        const data = []
        for (const [key, value] of Object.entries(categoryToAmount)) {
            data.push({ name: key, value: value, color: getColor(categories, key) })
        }
        const ret = data.sort((a, b) => a.name.localeCompare(b.name))
        return ret
    }

    async function handleFileInput(e) {
        const file = e.target.files[0]
        const text = await file.text()
        const transactionHints = parseCSV(text)

        const transactionHintToTransaction = (th) => {
            const [day, month, year] = th['Date'].split('/')
            return {
                category: 'category_8A13196D-5F8C-4FC6-934F-979ECA2FA9AD',
                amount: Math.abs(Number.parseFloat(th['Amount'])),
                date: new Date(year, month, day),
                tags: []
            }
        }
        const isValidTransactionHint = (th) => {
            try {
                transactionHintToTransaction(th)
                if (th['Amount'] === undefined) { return false }
                if (th['Date'] === undefined) { return false }
                return true
            } catch (error) {
                return false
            }
        }
        const allNewTransactions = transactionHints.filter(isValidTransactionHint).map(transactionHintToTransaction)
        allNewTransactions.map((t) => {
            addTransaction(userId, t.amount, t.date, [], null)
        })

        setAllTransactions(allNewTransactions)
    }

    // setKeyBindings()
    useEffect(() => {

        // (async () => {
        //     await Promise.all([
        //         dbSet(setTags, userId, 'tag'),
        //         dbSet(setCategories, userId, 'category'),
        //         dbSet(setAllTransactions, userId, 'transaction'),
        //     ])
        // })()

        const unsubscribeTransactions = streamTransactions(
            (querySnapshot) => {
                const updatedTransactions = querySnapshot.docs.map(d => d.data())
                setAllTransactions(updatedTransactions)
            },
            (error) => { console.log(error, "Error dude. (RS01)") }
        )
        const unsubscribeCategories = streamCategories(
            (querySnapshot) => {
                const updatedCategories = querySnapshot.docs.map(d => d.data())
                setCategories(updatedCategories)
            },
            (error) => { console.log(error, "Error dude. (RS02)") }
        )
        const unsubscribeTags = streamTags(
            (querySnapshot) => {
                const updatedTags = querySnapshot.docs.map(d => d.data())
                setTags(updatedTags)
            },
            (error) => { console.log(error, "Error dude. (RS03)") }
        )
        return () => {
            unsubscribeTransactions()
            unsubscribeCategories()
            unsubscribeTags()
        }
    }, [setAllTransactions])

    useEffect(() => console.log("And again"), [])
    return (
        <div className='flex flex-col-reverse md:flex-row h-screen items-center bg-[#272727] text-white w-screen font-rhaz text-sm'>
            <VStack className='max-w-[500px] overflow-y-auto h-full bg-[#222222]'>
                <input type={'file'} onChange={handleFileInput} />
                <Filter filteredTagIds={filteredTagIds} setFilteredTagIds={setFilteredTagIds} orderByIdx={orderByIdx} setOrderByIdx={setOrderByIdx} orderAscending={orderAscending} setOrderAscending={setOrderAscending} />
                <TransactionList transactions={transactions} selectedCategoryId={selectedCategoryId} filteredTagIds={filteredTagIds} categories={categories} />
            </VStack>
            <PieChart data={computePieDataFromTransactions(transactions)} selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId} />

        </div>
    )
}

export default Cashflow;