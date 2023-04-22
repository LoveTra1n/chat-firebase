import React from 'react';
import Login from "./Login";
import Chat from "../componnets/Chat";
import SideBar from "../componnets/SideBar";

const Home = () => {
    return (
        <div className={'home'}>
            <div className="container">
                <SideBar/>
                <Chat/>
            </div>
            
        </div>
    );
};

export default Home;