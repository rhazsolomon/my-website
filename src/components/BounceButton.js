import { useState } from "react"


const BounceButton = (props) => {

    const friendlyTransition = 'transform 0.3s cubic-bezier(.32,.34,.4,2.45)'
    const assertiveTransition = 'transform 0.1s linear'

    const [style, setStyle] = useState({
        transition: 'transform 0.3s cubic-bezier(.32,.34,.4,2.45)',
        transform: 'scale(1)',
    })
    return (
        <button
            className={props.className}
            style={style}
            onMouseOver={() => { setStyle({ transform: 'scale(1.1)', transition: friendlyTransition }) }}
            onMouseLeave={() => { setStyle({ ...style, transform: 'scale(1)', transition: friendlyTransition }) }}
            onMouseDown={() => { setStyle({ ...style, transform: 'scale(0.9)', transition: assertiveTransition }) }}
            onMouseUp={() => { setStyle({ ...style, transform: 'scale(1)', transition: friendlyTransition }) }}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}

export default BounceButton;