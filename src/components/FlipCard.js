import { useState } from "react"
import VStack from "./VStack"

const addStyles = (styles) => {
    var styleSheet = document.createElement("style")
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
}

const FlipCard = ({ front, back, className }) => {
    addStyles(`
        .backface-hidden {
            backface-visibility: hidden;
        }
       .flipped-y {
           transform: rotateY(180deg);
       }
    `)
    const [isHover, setIsHover] = useState(false)
    const onMouseEnter = () => {
        setIsHover(!isHover)
    }

    const hoverStyles = 'flipped-y'
    const notHoverStyles = ''
    return (
        <div className={`${className} relative hover:cursor-pointer`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseEnter}>
            <div className={`h-full w-full rounded-lg shadow-md border border-gray-200 bg-green-300 transition-transform duration-1000 absolute backface-hidden text-center ${isHover ? hoverStyles : notHoverStyles}`}>
                {front}
            </div>
            <div className={`h-full w-full bg-red-300 shadow-md border border-gray-200 rounded-lg transition-transform duration-1000 absolute backface-hidden ${isHover ? notHoverStyles : hoverStyles}`}>
                {back}
            </div>
        </div>
    )
}

export default FlipCard;