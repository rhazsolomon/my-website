import HStack from "../components/HStack";
import VStack from "../components/VStack";
import SocialLinks from "../components/SocialLinks";


const MyResumeSmallScreen = (props) => {
    return (
        <VStack className={`${props.className} p-16 gap-8 h-full text-slate-400 text-lg justify-center`}>
            <p className="text-slate-500">Hello, thank you for taking an interest in me.</p>
            <p>This page is a lot better with a wider screen.  I'd recommend checking it out on a computer.</p>

            <SocialLinks className='justify-center' />

        </VStack>
    )
}

export default MyResumeSmallScreen;