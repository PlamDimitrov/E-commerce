import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './middle-header.css';

const MiddleHeader = ({ user, isLogged }) => {
    return <div className="header-middle">
        <div className="container">
            <div className="row">
                <div className="col-md-4 clearfix">
                    <div className="logo pull-left">
                        <Link to="/home"><img src="/images/home/logo.png" alt="" /></Link>
                        {/* <img src="images/loading.gif" alt="" /> */}
                    </div>
                    <div className="btn-group pull-right clearfix">
                        <div className="btn-group">
                            <button type="button" className="btn btn-default dropdown-toggle usa"
                                data-toggle="dropdown">
                                USA
                                <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu">
                                <li><a href="/">Canada</a></li>
                                <li><a href="/">UK</a></li>
                            </ul>
                        </div>

                        <div className="btn-group">
                            <button type="button" className="btn btn-default dropdown-toggle usa"
                                data-toggle="dropdown">
                                DOLLAR
                                <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu">
                                <li><a href="/">Canadian Dollar</a></li>
                                <li><a href="/">Pound</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 clearfix">
                    <div className="shop-menu clearfix pull-right">
                        <ul className="nav navbar-nav">
                            {isLogged
                                ? <Fragment>
                                    <li><Link to="/account"><i className="fa fa-user"></i> {user && user.userName}'s Account</Link></li>
                                    <li><Link to="/logOut"><i className="fa fa-lock"></i> Logout</Link></li>
                                </Fragment>
                                : <Fragment>
                                    <li><Link to="/loginOrRegister"><i className="fa fa-lock"></i> Login/Register</Link></li>
                                </Fragment>
                            }
                            {/* <li><Link to="/wishList"><i className="fa fa-star"></i> Wishlist</Link></li>
                            <li><Link to="/checkout"><i className="fa fa-crosshairs"></i> Checkout</Link></li> */}
                            {/* <li><Link to="/cart"><i className="fa fa-shopping-cart"></i> Cart</Link></li> */}

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default MiddleHeader;