import React from "react";
import mesh from '../static/mesh.png'
import HStack from '../components/HStack'
import WireframeBox from '../components/WireframeBox'
import VStack from "../components/VStack";
import profile from '../static/profile.jpeg'
import { FiMapPin, FiPhone, FiMail, FiGlobe } from 'react-icons/fi'
import resumeData from '../static/resume_data'

const ProfilePicture = () => {
    return (
        <img className="rounded-full w-full m-auto lg:w-60 hover:animate-pulse" src={profile}></img>
    )
}

const AboutMe = ({ text }) => {
    return (
        <div className="w-full">
            <SectionHeader title={'About Me'} />
            <p>{text}</p>
        </div>
    )
}

const Divider = () => {
    return (
        <div className="h-10 mb-10 border-b-2 border-b-red-700"></div>
    )
}

const SectionHeader = ({ title }) => {
    return (
        <h2 className="font-bold my-4 uppercase text-lg">{title}</h2>
    )
}

const SocialLink = ({ t, u }) => {
    return (
        <div className="my-4">
            <h4 className="font-bold">{t}</h4>
            <a href={u}>{u}</a>
        </div>
    )

}

const WebsiteAndSocial = () => {
    return (
        <div className="w-full">
            <SectionHeader title={'Website & Social Links'} />
            <SocialLink t={'Facebook'} u={'https://www.facebook.com/rhaz.solomon'} />
            <SocialLink t={'Behance'} u={'behance.net/robinson'} />
            <SocialLink t={'Twitter'} u={'twitter.com/robinson'} />
        </div>

    )
}


const ExperienceSectionInfo = ({ info }) => {
    return (
        <HStack className="pb-4">
            <VStack className='text-left items-start w-60'>
                <h2 className="uppercase font-bold mb-1">{info.company}</h2>
                <h3 className="text-slate-400">{info.date}</h3>
            </VStack>
            <VStack>
                <h2 className="font-bold mb-1">{info.role}</h2>
                <p>{info.description}</p>
            </VStack>
        </HStack>
    )
}

const ExperienceSection = ({ t, experiences }) => {
    return (
        <VStack className="text-slate-800 w-full text-left justify-start border-t-2 mb-6">
            <SectionHeader title={t} />
            <VStack className='w-full justify-start align-top h-full'>
                {experiences.map((a) => <ExperienceSectionInfo info={a} />)}
            </VStack>
        </VStack>
    )
}


const IconText = ({ icon, text }) => {
    return (
        <HStack className={'gap-4 h-auto items-end text-right w-auto m-1'}>
            {icon}
            <div>{text}</div>
        </HStack>
    )
}

const StaticInfoSection = () => {
    return (
        <VStack className="w-auto gap-2 h-full justify-end">
            <IconText icon={<FiGlobe />} text={'https://rhaz.me'} />
            <IconText icon={<FiMail />} text={'rhaz.solomon@gmail.com'} />
            <IconText icon={<FiPhone />} text={'+64 27 845 2604'} />
            <IconText icon={<FiMapPin />} text={'Wellington'} />
        </VStack>
    )
}
const TopInfoPanel = () => {
    return (
        <HStack className='py-8' >
            <VStack>
                <div className="text-6xl">Rhaz</div>
                <div className="text-6xl">Solomon</div>
                <div className="text-2xl text-slate-400">Full Stack Developer</div>
            </VStack>
        </HStack>
    )
}

const MyTechnologiesSection = () => {
    return (
        <div>
            <SectionHeader title={"Technologies"} />
            {resumeData.technologies.map(a => {
                return (
                    <div className="border-slate-500 hover:bg-slate-500 border rounded-lg p-1 px-2 inline-block m-1">
                        {a}
                    </div>
                )
            })}
        </div>
    )
}
const MyResume = (props) => {


    return (
        <HStack className={`${props.className} text-gray-300 text-left shadow-md justify-start text-xs`}>
            <VStack className="bg-slate-800 gap-6 justify-start p-8 items-start w-1/3">
                <ProfilePicture />
                <AboutMe text={resumeData.aboutMe} />
                <Divider />
                <MyTechnologiesSection />
                <Divider />
                <StaticInfoSection />
            </VStack>
            <VStack className={'p-8 bg-white text-slate-800 w-full'}>
                <TopInfoPanel />
                <ExperienceSection t={"Work Experience"} experiences={resumeData.workExperiences} />
                <ExperienceSection t={"Education"} experiences={resumeData.educationExperiences} />
                <div className="h-full"></div>
            </VStack>
        </HStack>
    )
}

export default MyResume;