import Home from './Home';
import SidebarContacts from './SidebarContacts';

const SideBar = (props) => {
    return <>
        <Home setActiveChartId={props.setActiveChartId} setActiveChartName={props.setActiveChartName} setActiveChartAvatar={props.setActiveChartAvatar}></Home>
        {/* <SidebarContacts></SidebarContacts> */}
    </>;
};

export default SideBar;