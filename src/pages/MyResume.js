import React from "react";
import mesh from '../static/mesh.png'
import HStack from '../components/HStack'
import WireframeBox from '../components/WireframeBox'
import VStack from "../components/VStack";
import profile from '../static/profile.jpeg'


const ProfilePicture = () => {
    return (
        <img className="rounded-full w-44 m-10" src={profile}></img>
    )
}

const AboutMe = () => {
    return (
        <div className="h-full w-full">
            <SectionHeader title={'About Me'} />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
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
            <SocialLink t={'Facebook'} u={'facebook.com/robinson'} />
            <SocialLink t={'Behance'} u={'behance.net/robinson'} />
            <SocialLink t={'Twitter'} u={'twitter.com/robinson'} />
        </div>

    )
}


const ExperienceSectionInfo = ({ info }) => {
    return (
        <HStack>
            <VStack className='text-left items-start align-top w-auto pr-16'>
                <h2 className="uppercase font-bold whitespace-nowrap mb-1">{info.company}</h2>
                <h3 className="text-slate-400">{info.date}</h3>
            </VStack>
            <VStack>
                <h2 className="font-bold whitespace-nowrap mb-1">{info.role}</h2>
                <p>{info.description}</p>
            </VStack>
        </HStack>
    )
}

const ExperienceSection = ({ t, experiences }) => {
    return (
        <VStack className="text-slate-800 w-full text-left justify-start border-t-2">
            <SectionHeader title={t} />
            <VStack className='w-full justify-start align-top h-full'>
                {experiences.map((a) => <ExperienceSectionInfo info={a} />)}
            </VStack>
        </VStack>
    )
}


const IconText = ({ icon, text }) => {
    return (
        <HStack className={'gap-4 h-auto'}>
            <div>X</div>
            <div>{text}</div>
        </HStack>
    )
}
const TopInfoPanel = () => {
    return (
        <HStack className='h-auto py-16'>
            <VStack>
                <div>Rhaz</div>
                <div>Solomon</div>
                <div>Full-stack Developer</div>
            </VStack>
            <VStack>
                <IconText icon={'location'} text={'Wellington'} />
                <IconText icon={'location'} text={'Wellington'} />
                <IconText icon={'location'} text={'Wellington'} />
                <IconText icon={'location'} text={'Wellington'} />
            </VStack>
        </HStack>
    )
}

const MyResume = () => {
    return (
        <HStack className='text-gray-300 text-left text-sm  shadow-md justify-start'>
            <VStack className="bg-slate-800 justify-start p-8">
                <ProfilePicture />
                <AboutMe />
                <Divider />
                <WebsiteAndSocial />
            </VStack>
            <VStack className={'p-8 bg-white w-auto'}>
                <TopInfoPanel />

                <ExperienceSection t={"Work Experience"} experiences={[
                    {
                        company: 'GlowPixel LTD',
                        date: '2015-2016',
                        role: 'Senior Graphic Designer',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
                    },
                    {
                        company: 'Sharesies Ltd',
                        date: '2015-2016',
                        role: 'Senior Graphic Designer',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
                    }
                ]} />

                <ExperienceSection t={"Education"} experiences={[
                    {
                        company: 'GlowPixel LTD',
                        date: '2015-2016',
                        role: 'Senior Graphic Designer',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
                    }
                ]} />
            </VStack>
        </HStack>
    )
}

export default MyResume;