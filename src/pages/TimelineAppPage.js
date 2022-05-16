import TimelineView from "../components/TimelineView"


const HideAwayFormAndDisplay = ({ form, display }) => {
    return (
        <div className="w-full h-full flex">
            {form}
            {display}
        </div>
    )
}

const TimelineForm = () => {
    return (
        <div className="h-full w-1/4 p-16">
            <form className="bg-red-100 w-full h-full border-2">
                <input />

            </form>
        </div>
    )
}

const TimelineAppPage = () => {
    const data = [
        {
            date: Date.parse('2022-03-04'),
            title: 'bar'
        },
        {
            date: Date.parse('2022-03-03'),
            title: 'foo'
        },
        {
            date: Date.parse('1994-03-03'),
            title: 'foo'
        },
        {
            date: Date.parse('1794-03-03'),
            title: 'foo'
        },

    ]
    return (
        <HideAwayFormAndDisplay
            form={<TimelineForm />}
            display={<TimelineView data={data} />}
        />

    )
}

export default TimelineAppPage