import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from "../../globalFunctions/Store/Store";


const Product = (props) => {
    const { state } = React.useContext(StoreContext);
    const isLoggedIn = !!state.user;
    const product = props.product;


    return <div key={product.webId} className="col-sm-4">
        <div className="product-image-wrapper">
            <div className="single-products">
                <div className="productinfo text-center">
                    <img src={product.imageUrl} alt="" />
                    <h2>${product.price}</h2>
                    <p>{product.title}</p>
                    <Link to="/" className="btn btn-default add-to-cart"><i
                        className="fa fa-shopping-cart"></i>Add to cart</Link>
                </div>
                <div className="product-overlay">
                    <div className="overlay-content">
                        <h2>${product.price}</h2>
                        <p>{product.title}</p>
                        <Link to="/" className="btn btn-default add-to-cart"><i
                            className="fa fa-shopping-cart"></i>Add to cart</Link>
                        <h2>
                            <Link to={`/product-details/${product._id}`} className="btn btn-default add-to-cart">
                                <i className="fa fa-info-circle"></i>Product Info</Link>
                        </h2>
                        {isLoggedIn
                            ? <Fragment>
                                <h2>
                                    <Link to={`/product-edit/${product._id}`} className="btn btn-default add-to-cart">
                                        <i className="fa fa-edit"></i>Product edit</Link>
                                </h2>
                                <h2>
                                    <Link to={`/product-delete/${product._id}`} className="btn btn-default add-to-cart deleteBtn">
                                        <i className="fa fa-trash"></i>Product delete</Link>
                                </h2>
                            </Fragment>
                            : null
                        }
                    </div>
                </div>
            </div>
            <div className="choose">
                <ul className="nav nav-pills nav-justified">
                    <li><Link to="/"><i className="fa fa-plus-square"></i>Add to wishlist</Link></li>
                    <li><Link to="/"><i className="fa fa-plus-square"></i>Add to compare</Link></li>
                </ul>
            </div>
        </div>
    </div>
}

export default Product;