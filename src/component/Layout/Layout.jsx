import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Outlet,useLocation } from 'react-router-dom';

function Layout() {
    const location = useLocation();
    return (
        <>
            <NavBar />
            <Outlet key={location.pathname}/>   
            <Footer />
        </>
    );
}

export default Layout;