const VStack = (props) => {
    return (
        <div className={`flex flex-col w-full h-full items-center justify-center ${props.className} `} onMouseEnter={props.onMouseEnter}>
            {props.children}
        </div>
    )
}

export default VStack;