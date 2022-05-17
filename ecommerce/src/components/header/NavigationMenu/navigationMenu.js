import React from 'react';
import './navigationMenu.css';
import { Link } from 'react-router-dom';

const NavigationMenu = ({ isLogged }) => {

    return <div className="header-bottom">
        <div className="container">
            <div className="row">
                <div className="col-sm-9">
                    <div className="mainmenu pull-left">
                        <ul className="nav navbar-nav collapse navbar-collapse">
                            <li>
                                <Link className="navLink" to="/" >Home</Link>
                            </li>
                            <li>
                                <Link className="navLink" to="/shop/0">Shop</Link>
                            </li>
                            <li>
                                <Link className="navLink" to="/brands">Brands</Link>
                            </li>
                            <li>
                                <Link className="navLink" to="/categories">Categories</Link>
                            </li>
                            <li>
                                <Link className="navLink" to="/contacts">Contact us</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {
                isLogged
                    ? <div className="row">
                        <div className="col-sm-9">
                            <div className="mainmenu pull-left">
                                <ul className="nav navbar-nav collapse navbar-collapse">
                                    <li>
                                        <Link className="navLink" to="/product-create" >Create product</Link>
                                    </li>
                                    <li>
                                        <Link className="navLink" to="/brand-create" >Create brand</Link>
                                    </li>
                                    <li>
                                        <Link className="navLink" to="/category-create" >Create category</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div>
    </div>
};

export default NavigationMenu;