import { Link } from "react-router-dom";
import BounceButton from "../components/BounceButton";
import VStack from '../components/VStack'
import HStack from '../components/HStack'

import resume from '../static/resume.png'
import cashflow from '../static/cashflow.png'
import profile1 from '../static/profile1.jpeg'
import { FaAddressCard, FaCompass, FaUser } from "react-icons/fa";
import { FiPieChart } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import Gallery from "../components/animations/Gallery";
import { useState } from "react";
import SocialLinks from "../components/SocialLinks";

const ProjectItem = (props) => {
    return (
        <div className="inline-block">
            <BounceButton className="inline">
                <Link to={props.to} className='inline-block'>
                    <img className='rounded-lg w-1/4 inline-block' src={props.src}></img>
                </Link>
            </BounceButton>
        </div>
    )

}


const GalleryComponent = () => {
    const [idx, setIdx] = useState(0)
    const TraverseButton = ({ index, icon }) => {
        return (
            <BounceButton onClick={() => setIdx(index)} className={`w-10 h-10 rounded-full ${idx == index ? 'border-[#66A1B5] border-[1px]' : ''}  text-[#66A1B5] justify-center flex items-center`}>
                {icon}
            </BounceButton>
        )
    }
    const ProjectLink = ({ title, icon, link, inProgress }) => {
        return (

            <Link to={link}>
                <BounceButton className='text-left'>
                    <VStack className="bg-[#3D424D] shadow-lg shadow-black  p-4 rounded-lg gap-3">
                        <div className="text-4xl">{icon}</div>
                        <div className="font-bold text-rhaz-primary align-middle">
                            <span>{title}</span>
                            {inProgress && (
                                <span className="rounded-full bg-slate-500 text-rhaz-major-grey py-1 px-4 text-sm ml-2">In Progress</span>
                            )}
                        </div>
                        <p className="text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </VStack>
                </BounceButton>
            </Link>
        )
    }
    return (
        <VStack className='p-20 justify-center text-white '>

            <Gallery idx={idx}>
                <div>
                    <div className="text-[#66A1B5] font-bold text-5xl">I'M RHAZ</div>
                    <div className="text-[#C9C9C9] py-2 font-bold text-3xl">FULL STACK DEVELOPER</div>
                    <div className="text-[#B3B3B3] py-6 h-full whitespace-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
                </div>
                <div>
                    <div className="text-[#C9C9C9] py-2 font-bold text-3xl">MY PROJECTS</div>
                    <div className="text-[#B3B3B3] py-3 h-full whitespace-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                    <HStack className='gap-10'>
                        <ProjectLink link="/resume" title={'Resume'} icon={<FaGraduationCap />} />
                        <ProjectLink title={'Cashflow'} icon={<FiPieChart />} inProgress link={"/cashflow"} />
                    </HStack>
                </div>
                <div className="h-full">
                    <div className="text-[#C9C9C9] py-2 font-bold text-3xl">CONTACT ME</div>
                    <div className="text-[#B3B3B3] py-3 h-full whitespace-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                    <SocialLinks className='w-full justify-center h-full items-center flex  p-20' />
                </div>
            </Gallery>
            <HStack className="gap-3 justify-center">
                <TraverseButton index={0} icon={(<FaUser />)} />
                <TraverseButton index={1} icon={(<FaAddressCard />)} />
                <TraverseButton index={2} icon={(<FaCompass />)} />
            </HStack>
        </VStack>
    )
}

const BannerPicture = () => {
    return (
        <img className="h-full rounded-2xl shadow-md shadow- shadow-slate-700" src={profile1} />
    )
}

const LandingPageHorizontal = (props) => {
    return (
        <div className={`${props.className} w-screen h-screen bg-black font-rhaz`}>
            <svg viewBox="0 0 1512 982" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute z-10 h-full">
                <path d="M0 1H239.5L469 982H0V1Z" fill="#739FB3" />
            </svg>
            <HStack className="p-40 z-20 absolute">
                <BannerPicture />
                <GalleryComponent />
            </HStack>
        </div >
    )
}
const LandingPageVertical = (props) => {
    return (<div className={`${props.className}`}>
        Still working on this!
    </div>)

}
const LandingPage = () => {
    return (
        <>
            <LandingPageHorizontal className="lg:block hidden " />
            <LandingPageVertical className="lg:hidden block " />
        </>
    )
}

export default LandingPage;