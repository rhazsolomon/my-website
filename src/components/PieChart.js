import { PieChart as Pie } from "react-minimal-pie-chart";

const PieChartValue = ({ data, d }) => {
    const total = data.reduce((a, b) => a + b.value, 0)
    return (
        <div className="flex flex-col h-full justify-center items-center content-center">
            {d && (
                <div
                    className="text-2xl font-medium"
                    style={{ transition: 'color 0s', color: d.color }}
                >
                    {Number.parseFloat(d.value).toFixed(2)}
                </div>
            )}
            <div
                className={`${d ? 'opacity-30 text-l' : 'text-2xl font-medium'}`}
                style={{ transition: '1s' }}
            >
                {Number.parseFloat(total).toFixed(2)}
            </div>
        </div>
    )
}


const PieChart = ({ data, selectedCategoryId, setSelectedCategoryId }) => {
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
        <div className="relative w-full h-full max-h-80 max-w-80">
            <div className=" w-full h-full absolute">
                <Pie
                    key={'234'}
                    data={data}
                    lineWidth={40}
                    onClick={(e, i) => { toggleSelectedIndex(i) }}
                    segmentsShift={computeSegmentsShift}
                    rounded={false}
                    radius={40}
                    segmentsStyle={computeSegmentsStyle}
                    className={''}
                    onMouseOver={(e) => { e.target.style.opacity = '90%' }}
                    onMouseOut={(e) => { e.target.style.opacity = '100%' }}
                    label={() => { }}
                    labelPosition={50}
                    labelStyle={{}}
                />
            </div>
            <PieChartValue data={data} d={data.filter(d => d.name === selectedCategoryId)[0]} />
        </div>
    )
}

export default PieChart;