const HStack = (props) => {
    return (
        <div className={`${props.className} flex flex-row w-full h-full items-center`}>
            {props.children}
        </div>
    )
}

export default HStack;