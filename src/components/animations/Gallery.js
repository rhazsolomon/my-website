const Gallery = (props) => {
    return (
        <div className="w-full h-full relative">
            {props.children.map((c, idx) => {
                return (
                    <div
                        className={`transition-all  w-full  duration-500 absolute ${props.idx == idx ? 'opacity-80' : 'opacity-0 scale-0'}`}>
                        {c}
                    </div>
                )
            })}
        </div>
    )
}

export default Gallery;