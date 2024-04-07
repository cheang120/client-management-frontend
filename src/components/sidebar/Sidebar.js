import React, {useState} from 'react'
import "./Sidebar.scss";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { RiMenuFoldLine } from "react-icons/ri";
import { RiProductHuntLine } from "react-icons/ri";
import { PiStudent } from "react-icons/pi";
import menu from "../../data/sidebar";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";



const Sidebar = ({children}) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
  
    const goHome = () => {
      navigate("/");
    };
  return (
    <div className="layout">
        <div className='sidebar' style={{width:isOpen ? "230px" : "60px"}}>

            <div className='top_section'>
                <div className='logo' style={{ display: isOpen ? "block" : "none" }}>
                    <PiStudent size={35} style={{cursor:"pointer"}} onClick={goHome}/>
                </div>

                {isOpen && <div className='bars' style={{ marginLeft: isOpen ? "100px" : "0px"}}>
                    <RiMenuFoldLine onClick={toggle} />
                </div>}

                {!isOpen && <div className='bars' style={{ marginLeft: isOpen ? "100px" : "0px"}}>
                    <RiMenuUnfoldFill onClick={toggle} />
                </div>}

                
            </div>
            {menu.map((item,index)=> {
                return <SidebarItem key={index} item={item} isOpen={isOpen}/>
            })}

        </div>
        <main style={{ paddingLeft: isOpen ? "230px" : "60px", transition: "all .5s" }}>
            {children}
        </main>
        
    </div>
  )
}

export default Sidebar
