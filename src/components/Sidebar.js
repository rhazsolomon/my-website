import HStack from "./HStack";
import VStack from "./VStack";

const SidebarMenuItem = (props) => {
    return (
        <HStack className={'h-44 '}>
            <img src='https://picsum.photos/150' className="w-20 self-center"></img>
            <div>{props.title}</div>
        </HStack>
    )
}

const Sidebar = () => {
    return (
        <VStack className={'w-1/5 p-6'}>
            <img src='https://picsum.photos/200' className="w-20 self-center"></img>
            <div>Filetio</div>
            <img src='https://picsum.photos/150' className="w-20 self-center"></img>
            <div className="font-bold">Piyush</div>
            <div className="text-gray-500">Pro Plan</div>
            <div className="self-start">Menu</div>
            <SidebarMenuItem 
                src='https://picsum.photos/150'
                title='Dashboard'
            />
            <SidebarMenuItem 
                src='https://picsum.photos/150'
                title='Analytics'
            />
            <SidebarMenuItem 
                src='https://picsum.photos/150'
                title='Messages'
            />
            <SidebarMenuItem 
                src='https://picsum.photos/150'
                title='Settings'
            />
        
            <div></div>
            <SidebarMenuItem 
                src='https://picsum.photos/150'
                title='Logout'
            />
        
            <div className="self-start">V.1.2.4</div>
        </VStack>
    )
}


export default Sidebar;