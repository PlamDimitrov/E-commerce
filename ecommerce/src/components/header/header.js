import React from 'react';
import './header.css';
import TopHeader from './top-header/top-header';
import MiddleHeader from './middle-header/middle-header';
import NavigationMenu from './NavigationMenu/navigationMenu';

const Header = ({ user, isLogged }) => {
    return <header id="header">
        <TopHeader />
        <MiddleHeader user={user} isLogged={isLogged} />
        <NavigationMenu isLogged={isLogged} />
    </header>
};

export default Header;