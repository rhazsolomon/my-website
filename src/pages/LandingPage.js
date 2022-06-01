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
import MyResumeSmallScreen from "./MyResumeSmallScreen";

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

const ProjectLink = ({ title, icon, link, inProgress, description }) => {
    return (

        <Link to={link} target={'_blank'}>
            <BounceButton className='text-left'>
                <VStack className="bg-[#3D424D] shadow-lg shadow-black w-64  p-4 rounded-lg gap-3">
                    <div className="text-4xl">{icon}</div>
                    <div className="font-bold text-rhaz-primary align-middle">
                        <span>{title}</span>
                        {inProgress && (
                            <span className="rounded-full bg-slate-500 text-rhaz-major-grey py-1 px-4 text-sm ml-2">In Progress</span>
                        )}
                    </div>
                    <p className="text-xs">{description}</p>
                </VStack>
            </BounceButton>
        </Link>
    )
}
const SummaryComponent = () => {
    return (
        <div className="h-full">
            <div className="text-[#66A1B5] font-bold text-5xl">I'M RHAZ</div>
            <div className="text-[#C9C9C9] py-2 font-bold text-3xl">FULL STACK DEVELOPER</div>
            <p className="text-[#B3B3B3] py-6  h-min">
                I am a New Zealand based full-stack developer focused on helping companies build great software. From the backend cloud infrastructure and database architecture to the frontend design and implementation.
            </p>
            <p className="text-[#B3B3B3]">
                This website and all the linked projects have been written by me, using React, TailwindCSS and Firebase.
            </p>

        </div>
    )
}

const ProjectsComponent = () => {
    // const resumeDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    const resumeDescription = "This is my digital résumé, feel free to click around to explore the places I've worked and studied."
    const cashflowDescription = "Cashflow is a side project I'm working on to categorize and visualize historical payments."
    return (
        <div>
            <div className="text-[#C9C9C9] py-2 font-bold text-3xl">MY PROJECTS</div>
            <div className="text-[#B3B3B3] py-4 h-full whitespace-normal">
                I am a tinkerer, and when I'm not working full-time as a developer, I like to build side projects. Here are a few. I will be adding more in the future as I sharpen them up for the web!
            </div>
            <HStack className='gap-10 overflow-auto items-center p-5'>
                <ProjectLink link="/resume" title={'Resume'} icon={<FaGraduationCap />} description={resumeDescription} />
                <ProjectLink title={'Cashflow'} icon={<FiPieChart />} inProgress link={"/cashflow"} description={cashflowDescription} />
            </HStack>
        </div>
    )
}

const SocialComponent = () => {
    return (
        <div className="h-full">
            <div className="text-[#C9C9C9] py-2 font-bold text-3xl">CONTACT ME</div>
            <div className="text-[#B3B3B3] py-3 h-full whitespace-normal">
                Feel free to reach out to me. I am always happy to have a yarn!
            </div>
            <SocialLinks className='w-full justify-center h-full items-center flex  p-20' />
        </div>
    )
}

const GalleryComponent = (props) => {
    const [idx, setIdx] = useState(0)
    const TraverseButton = ({ index, icon }) => {
        return (
            <BounceButton onClick={() => setIdx(index)} className={`w-10 h-10 rounded-full ${idx == index ? 'border-[#66A1B5] border-[1px]' : ''}  text-[#66A1B5] justify-center flex items-center`}>
                {icon}
            </BounceButton>
        )
    }
    return (
        <VStack className={`${props.className} p-10  justify-center text-white`}>
            <Gallery idx={idx} className='h-full'>
                <SummaryComponent />
                <ProjectsComponent />
                <SocialComponent />
            </Gallery>
            <HStack className="gap-3 justify-center h-auto">
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
        <div className={`${props.className} w-screen h-screen bg-black font-rhaz relative flex flex-col items-center justify-center`}>
            <svg viewBox="0 0 1512 982" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute z-10 h-full left-0">
                <path d="M0 1H239.5L469 982H0V1Z" fill="#739FB3" />
            </svg>
            <HStack className="h-2/3 w-2/3 z-20 absolute items-center ">
                <BannerPicture />
                <GalleryComponent />
            </HStack>
        </div >
    )
}
const LandingPageVertical = (props) => {
    return (
        <div className={`${props.className} w-screen h-screen bg-black text-white flex`}>
            <GalleryComponent className='w-full h-auto' />
        </div>
    )

}
const LandingPage = () => {
    return (
        <>
            <LandingPageHorizontal className="lg:flex hidden " />
            {/* <LandingPageVertical className="lg:hidden flex" /> */}
            <MyResumeSmallScreen className="lg:hidden flex justify-center text-center items-center h-screen" />
        </>
    )
}

export default LandingPage;