import { useState } from "react"

const Gallery = (props) => {
    return (
        <div>
            {props.children.map((c, idx) => {
                return (
                    <div
                        className={`transition-all duration-500 absolute ${props.idx == idx ? 'opacity-80' : 'opacity-0 scale-50'}`}>
                        {c}
                    </div>
                )
            })}
        </div>
    )
}
const Playground = () => {


    const [idx, setIdx] = useState(0)
    return (
        <div className="flex justify-center w-full h-screen items-center ">
            <button onClick={() => setIdx(idx + 1)}>Hello</button>
            <Gallery idx={idx}>
                <div className="w-20 h-20 bg-red-200">hello</div>
                <div className="w-20 h-20 bg-orange-200">hello</div>
                <div className="w-20 h-20 bg-green-200">hello</div>
            </Gallery>
        </div >
    )
}

export default Playground;