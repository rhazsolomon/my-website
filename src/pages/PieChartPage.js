import { FaDollarSign, FaEnvira, FaTag, FaPlus } from "react-icons/fa";
import VStack from "../components/VStack"; s
import { PieChart } from "react-minimal-pie-chart";
import { useState } from "react";
import HStack from "../components/HStack";
import { generateList, random, sample } from "../utility/util";


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

const RhazPieChart = ({ transactions, selectedCategoryId, setSelectedCategoryId }) => {
    // const [data[i].name === selectedIdx, setdata[i].name === SelectedIdx] = useState(null)

    function computePieDataFromTransactions(transactions) {
        let categoryToAmount = {}
        for (let t of transactions) {
            if (categoryToAmount[t.category] === undefined) { categoryToAmount[t.category] = 0 }
            categoryToAmount[t.category] = categoryToAmount[t.category] + t.amount
        }
        const data = []
        for (const [key, value] of Object.entries(categoryToAmount)) {
            data.push({ name: key, value: value, color: categoryMap[key].color, mutedColor: categoryMap[key].mutedColor })
        }
        return data
    }

    const data = computePieDataFromTransactions(transactions)


    const computeSegmentsShift = (i) => {
        if (data[i].name === selectedCategoryId) { return 4 }
        return 0
    }
    const toggleSelectedIndex = (i) => {
        if (data[i].name === selectedCategoryId) {
            setSelectedCategoryId(null)
        } else {
            setSelectedCategoryId(data[i].name)
        }

    }
    const computeSegmentsStyle = (i) => {
        let opacity = '100%'
        if (selectedCategoryId !== null) {
            opacity = data[i].name === selectedCategoryId ? '100%' : '20%'
        }
        return {
            transition: 'd 0.2s ease-in-out, opacity 0.2s',
            stroke: data[i].color,
            opacity: opacity
        }
    }
    return (
        <HStack className='justify-center'>
            <div className="w-[800px] h-[800px]">
                <PieChart
                    data={data}
                    lineWidth={50}
                    onClick={(e, i) => { toggleSelectedIndex(i) }}
                    segmentsShift={computeSegmentsShift}
                    rounded={false}
                    radius={40}
                    segmentsStyle={computeSegmentsStyle}
                    className={'relative'}
                    onMouseOver={(i) => { i.target.style.opacity = '90%' }}
                    onMouseOut={(i) => { i.target.style.opacity = '100%' }}
                />
            </div>

        </HStack>


    )
}

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
        <HStack className="gap-2 border-2 h-auto w-auto py-1 px-2 rounded-lg" style={{ borderColor: categoryMap[category].color }}>
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
            <div>{tag}</div>
        </>)
    }
    return (
        <HStack className='w-auto h-auto border-2 gap-2 border-gray-500 text-gray-500 px-4 rounded-full py-1'>
            {content}
        </HStack>
    )
}

const TransactionElement = ({ transaction }) => {
    return (
        <VStack className='max-w-[600px] px-5 h-auto  p-2 rounded-xl hover:bg-slate-700'>
            <HStack className="w-full h-auto">
                <TransactionElementCategory category={transaction.category} />
                <TransactionElementAmount amount={transaction.amount} />
            </HStack>
            <div className="flex-wrap flex py-2 h-auto gap-2">
                {transaction.tags.map(t => (<TransactionElementTag tag_id={t} />))}
                <TransactionElementTag />
            </div>

        </VStack>

    )
}

const TransactionList = ({ transactions, selectedCategoryId }) => {
    return (
        <VStack className=' gap-4 overflow-y-auto scrollbar-hide h-full items-start justify-start'>
            {transactions.filter(t => selectedCategoryId == null | t.category == selectedCategoryId).map(t => (
                <TransactionElement transaction={t} />
            ))}
        </VStack>
    )
}

const Filter = () => {
    return (
        <div className="bg-slate-700 p-4 rounded-lg">
            Hello
        </div>
    )
}

function createNewTransaction(category = null, amount = null, tags = null) {
    return {
        category: category !== null ? category : random(Object.keys(categoryMap)),
        amount: amount !== null ? amount : Math.random() * 100,
        tags: tags !== null ? tags : sample(Object.keys(tagMap), Math.floor(Math.random() * 5))
    }
}

const allTransactions = generateList(createNewTransaction, 100)


const PieChartPage = () => {

    const [selectedCategoryId, setSelectedCategoryId] = useState(null)
    const [sortBy, setSortBy] = useState('date')


    const transactions = (allTransactions
        // .filter(a => a.category == 'category_84A707AD-8E1C-4CC2-AA27-CE23036748BC')
        // .sort((a, b) => a.amount - b.amount).reverse()
    )
    return (
        <HStack className='items-center bg-[#23262A] text-white w-screen p-10'>
            <VStack className='gap-5 max-w-[600px]'>
                <Filter />
                <TransactionList transactions={transactions} selectedCategoryId={selectedCategoryId} />
            </VStack>
            <RhazPieChart transactions={transactions} selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId} />
        </HStack>
    )
}

export default PieChartPage;