import VStack from "../components/VStack";
import { Doughnut } from "react-chartjs-2";
import { Pie, AnimatedPie } from "@visx/shape";
import { PieChart } from "react-minimal-pie-chart";
import { useState } from "react";

const categoryMap = {
    'category_84A707AD-8E1C-4CC2-AA27-CE23036748BC': { label: 'food', color: '#BB0000', mutedColor: '#BB9695' },
    'category_D092A669-D73E-488F-9A98-94C314D6593A': { label: 'clothes', color: '#1800BB', mutedColor: '#9A95BB' },
    'category_8A13196D-5F8C-4FC6-934F-979ECA2FA9AD': { label: 'unknown', color: 'grey', mutedColor: 'rgba(200, 200, 200, 0.5)' }
}
const tagMap = {
    'tag_0F0D9CF7-9197-464E-BA6A-9D33B2540639': 'gift',
    'tag_7C978860-62A8-46B8-88E5-986C4C3175A3': 'wellington'
}

const RhazPieChart = ({ transactions }) => {
    const [selectedIdx, setSelectedIdx] = useState(null)

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
        if (i === selectedIdx) { return 4 }
        return 0
    }
    const toggleSelectedIndex = (i) => {
        if (selectedIdx === i) {
            setSelectedIdx(null)
        } else {
            setSelectedIdx(i)
        }

    }
    const computeSegmentsStyle = (i) => {
        let stroke = data[i].color
        let zIndex = 0
        if (selectedIdx !== null) {
            stroke = i === selectedIdx ? data[i].color : data[i].mutedColor
            zIndex = i === selectedIdx ? -1 : 0
        }
        return { zIndex: zIndex, transition: 'd 0.5s cubic-bezier(0.175, 2, 0.9, 1.8), stroke 0.5s', stroke: stroke, }
    }
    return (
        <div className="w-[600px] h-[600px]">
            <PieChart
                data={data}
                lineWidth={50}
                onClick={(e, i) => { toggleSelectedIndex(i) }}
                segmentsShift={computeSegmentsShift}
                rounded={false}
                radius={30}
                segmentsStyle={computeSegmentsStyle}
                className={'relative'}
            // totalValue={150}
            />
        </div>

    )
}

const TransactionElement = ({ transaction }) => {
    return (
        <div>
            {transaction.amount} {categoryMap[transaction.category].label}
        </div>
    )
}

const TransactionList = ({ transactions }) => {
    return (
        <VStack>
            {transactions.map(t => (
                <TransactionElement transaction={t} />
            ))}
        </VStack>
    )
}
const PieChartPage = () => {

    const allTransactions = [
        {
            id: 'transaction_94773197-A2AD-417B-9025-360C83084CD5',
            category: 'category_84A707AD-8E1C-4CC2-AA27-CE23036748BC',
            amount: 5.50,
            tags: [
                'tag_0F0D9CF7-9197-464E-BA6A-9D33B2540639',
                'tag_7C978860-62A8-46B8-88E5-986C4C3175A3',
            ]
        },
        {
            category: 'category_84A707AD-8E1C-4CC2-AA27-CE23036748BC',
            amount: 50.50,
            tags: [
                'tag_0F0D9CF7-9197-464E-BA6A-9D33B2540639',
                'tag_7C978860-62A8-46B8-88E5-986C4C3175A3',
            ]
        },
        {
            category: 'category_84A707AD-8E1C-4CC2-AA27-CE23036748BC',
            amount: 25.50,
            tags: [
                'tag_0F0D9CF7-9197-464E-BA6A-9D33B2540639'
            ]
        },
        {
            category: 'category_84A707AD-8E1C-4CC2-AA27-CE23036748BC',
            amount: 1.50,
            tags: [
                'tag_0F0D9CF7-9197-464E-BA6A-9D33B2540639'
            ]
        },
        {
            category: 'category_D092A669-D73E-488F-9A98-94C314D6593A',
            amount: 15.60,
            tags: [
                'tag_0F0D9CF7-9197-464E-BA6A-9D33B2540639',
                'tag_7C978860-62A8-46B8-88E5-986C4C3175A3',
            ]
        },
        {
            category: 'category_D092A669-D73E-488F-9A98-94C314D6593A',
            amount: 20.60,
            tags: [
                'tag_0F0D9CF7-9197-464E-BA6A-9D33B2540639',
                'tag_7C978860-62A8-46B8-88E5-986C4C3175A3',
            ]
        },
        {
            category: 'category_8A13196D-5F8C-4FC6-934F-979ECA2FA9AD',
            amount: 20.60,
            tags: [
                'tag_0F0D9CF7-9197-464E-BA6A-9D33B2540639',
                'tag_7C978860-62A8-46B8-88E5-986C4C3175A3',
            ]
        }


    ]

    const transactions = (allTransactions
        // .filter(a => a.tags.includes('wellington'))
    )
    return (
        <VStack className='items-center'>
            <RhazPieChart transactions={transactions} />
            <TransactionList transactions={transactions} />
        </VStack>
    )
}

export default PieChartPage;