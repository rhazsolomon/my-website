import HStack from '../components/HStack'
import { FiInstagram } from "react-icons/fi";
import { FaLinkedin } from 'react-icons/fa'
import { BsGithub } from 'react-icons/bs'
import { FiMail } from 'react-icons/fi'

const SocialLinks = (props) => {
    return (
        <HStack className={`${props.className} h-auto gap-4 text-slate-400 `}>
            <a href='https://www.instagram.com/rhazsolomon/'><FiInstagram size={'50px'} className="hover:text-slate-500 animate-bounce-slow-1" /></a>
            <a href='https://www.linkedin.com/in/rhaz-solomon/'><FaLinkedin size={'50px'} className="hover:text-slate-500 animate-bounce-slow-2" /></a>
            <a href="mailto:rhaz.solomon@gmail.com"><FiMail size={'50px'} className="hover:text-slate-500 animate-bounce-slow-3" /></a>
        </HStack>
    )
}

export default SocialLinks;

