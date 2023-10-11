import Home from './Home';
import SidebarContacts from './SidebarContacts';

const SideBar = (props) => {
    return <>
        <Home setActiveChartId={props.setActiveChartId}></Home>
        {/* <SidebarContacts></SidebarContacts> */}
    </>;
};

export default SideBar;