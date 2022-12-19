import React from 'react';
import './layout.scss'
import Header from "../header/Header.tsx";
import Footer from "../footer/Footer.tsx";

const Layout = ({children , containerClass}) => {
    return (
        <div className={`app`}>
            <Header />
            <main className={`${containerClass}`}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
