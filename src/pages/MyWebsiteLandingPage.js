import React from "react";
import FlipCard from '../components/FlipCard'
import mesh from '../static/mesh.png'

const MyWebsiteLandingPage = () => {
    return (
        <FlipCard
            front={(

                // <ZStack>
                <div>
                    <img src={mesh} className={'w-full h-full'} alt="Logo" />
                    <div>Hello</div>
                </div>
                // {/* </ZStack> */}

            )}
            back={(<h2>Hello2</h2>)}
        />
    )
}

export default MyWebsiteLandingPage;