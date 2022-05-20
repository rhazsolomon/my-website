import { useState } from "react";

import VStack from "../components/VStack";
import HStack from "../components/HStack";

import { generateList, random, sample, subset, randomDate } from "../utility/util";

import { FaDollarSign, FaEnvira, FaTag, FaPlus, FaArrowUp, FaFilter } from "react-icons/fa";
import PieChart from "../components/PieChart";


const categoryMap = {
    'category_84A707AD-8E1C-4CC2-AA27-CE23036748BC': { label: 'food', color: '#1EAEF8' },
    'category_D092A669-D73E-488F-9A98-94C314D6593A': { label: 'clothes', color: '#FFD400' },
    'category_8A13196D-5F8C-4FC6-934F-979ECA2FA9AD': { label: 'unknown', color: '#C2C7CC' },
    'category_D4EC9AB5-D5A8-4E78-9A75-9D3CE2E79474': { label: 'rent', color: '#4BBE5D' }
}
const tagMap = {
    'tag_0F0D9CF7-9197-464E-BA6A-9D33B2540639': 'gift',
    'tag_7C978860-62A8-46B8-88E5-986C4C3175A3': 'wellington',
    'tag_47932CFC-CD6E-4AA8-B9A3-FFEC1503F363': 'shop',
    'tag_1BAFD608-EF63-4F08-A6E7-362F89ACD4FA': 'summer',
    'tag_6FE3441B-D04B-44DA-9481-7A7DF3D4E497': 'night'
}
const orderByOptions = ['Date', 'Amount']



const TransactionElementAmount = ({ amount }) => {

    return (
        <HStack className='gap-1 align-middle justify-end font-bold'>
            <FaDollarSign className="text-sm" />
            {amount.toFixed(2)}
        </HStack>
    )
}
const TransactionElementCategory = ({ category }) => {
    return (
        <HStack className="gap-2 border-[1pt] h-auto w-auto py-1 px-2 rounded-lg" style={{ borderColor: categoryMap[category].color }}>
            <FaEnvira style={{ fill: categoryMap[category].color }} />
            {categoryMap[category].label}
        </HStack>
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
        <HStack className='w-min inline h-auto border-[1pt] gap-2 border-gray-500 text-gray-500 px-4 rounded-full py-1'>
            {content}
        </HStack>
    )
}

const TransactionElement = ({ transaction }) => {
    return (
        <HStack className='p-4 gap-3 hover:bg-[#272727]'>
            <div className="w-1 h-full  rounded ml-2"
                style={{ backgroundColor: categoryMap[transaction.category].color }}></div>
            <VStack className='max-w-[600px] h-auto  '>
                <HStack className="w-full h-auto">
                    <TransactionElementCategory category={transaction.category} />
                    <TransactionElementAmount amount={transaction.amount} />
                </HStack>
                <div className="flex-wrap flex py-2 h-auto gap-2">
                    {transaction.tags.map(t => (<TransactionElementTag tag_id={t} />))}
                    <TransactionElementTag />
                </div>
                <div>{transaction.date.toDateString()}</div>
            </VStack>
        </HStack>


    )
}

const TransactionList = ({ transactions, selectedCategoryId, filteredTagIds }) => {
    const displayTransactions = (transactions
        .filter(t => selectedCategoryId == null | t.category == selectedCategoryId)
        .filter(t => filteredTagIds == null | subset(filteredTagIds, t.tags))
    )
    return (
        <VStack className=' overflow-y-auto scrollbar-hide items-start justify-start'>
            {displayTransactions.map(t => (
                <TransactionElement transaction={t} />
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

function createNewTransaction(category = null, amount = null, tags = null) {
    return {
        category: category !== null ? category : random(Object.keys(categoryMap)),
        amount: amount !== null ? amount : Math.random() * 100,
        tags: tags !== null ? tags : sample(Object.keys(tagMap), Math.floor(Math.random() * 5)),
        date: randomDate(new Date(2012, 0, 1), new Date())
    }
}

const allTransactions = generateList(createNewTransaction, 40)


const PieChartPage = () => {

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
            if (categoryToAmount[t.category] === undefined) { categoryToAmount[t.category] = 0 }
            categoryToAmount[t.category] = categoryToAmount[t.category] + t.amount
        }
        const data = []
        for (const [key, value] of Object.entries(categoryToAmount)) {
            data.push({ name: key, value: value, color: categoryMap[key].color })
        }
        return data.sort((a, b) => a.name.localeCompare(b.name))
    }

    return (
        <div className='flex flex-col-reverse md:flex-row h-screen items-center bg-[#272727] text-white w-screen font-rhaz text-sm'>
            <VStack className='max-w-[500px] overflow-y-auto h-full bg-[#222222]'>
                <Filter filteredTagIds={filteredTagIds} setFilteredTagIds={setFilteredTagIds} orderByIdx={orderByIdx} setOrderByIdx={setOrderByIdx} orderAscending={orderAscending} setOrderAscending={setOrderAscending} />
                <TransactionList transactions={transactions} selectedCategoryId={selectedCategoryId} filteredTagIds={filteredTagIds} />
            </VStack>
            <PieChart data={computePieDataFromTransactions(transactions)} selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId} />

        </div>
    )
}

export default PieChartPage;