const HStack = (props) => {
    return (
        <div className={`${props.className} ${props.debug ? 'bg-green-200' : ''} flex flex-row w-full h-full items-center`}>
            {props.children}
        </div>
    )
}

export default HStack;