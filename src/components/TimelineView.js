
const Item = ({ data, minDate, maxDate }) => {
    const leftVal = 10 + 80 * (data.date - minDate) / (maxDate - minDate)
    const style = {
        left: `${leftVal}%`
    }
    return (
        <div className="bg-blue-200 w-28 h-24 top-64 absolute" style={style}>

        </div>
    )
}

const TimelineView = ({ data }) => {

    const dates = data.map(d => d.date)
    const minDate = Math.min(...dates)
    const maxDate = Math.max(...dates)



    return (
        <div className="w-full h-full bg-green-100">

            <div>{minDate}</div>
            <div>{maxDate}</div>
            <div className="w-38 h-24 bg-red-200 left-32 absolute top-52 hover:shadow-md">Hello</div>
            {data.map(d => <Item data={d} minDate={minDate} maxDate={maxDate} />)}


        </div>
    )
}

export default TimelineView;