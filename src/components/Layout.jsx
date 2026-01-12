import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ThemeToggle from './ThemeToggle';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                {children}
            </main>
            <Footer />
            <ThemeToggle />
        </div>
    );
};

export default Layout;
