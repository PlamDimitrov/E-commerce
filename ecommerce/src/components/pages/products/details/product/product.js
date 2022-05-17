import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

import './product.css';
import RecommendedItems from '../../../home/items/recommended-items/recommended-items';
import NotFound from '../../../notFound/notFound';

const Product = (props) => {
    const product = props.product;
    if (product) {
        return <Fragment>
            <div className="col-sm-9 padding-right">
                <div className="product-details">
                    {/* <!--product-details--> */}
                    <div className="col-sm-5">
                        <div className="view-product">
                            <img src={product.imageUrl} alt={product.title} />
                            <h3>ZOOM</h3>
                        </div>
                        <div id="similar-product" className="carousel slide" data-ride="carousel">

                            {/* <!-- Wrapper for slides --> */}
                            <div className="carousel-inner">
                                <div className="item active">
                                    <a href="/"><img src="/images/product-details/similar1.jpg" alt="" /></a>
                                    <a href="/"><img src="/images/product-details/similar2.jpg" alt="" /></a>
                                    <a href="/"><img src="/images/product-details/similar3.jpg" alt="" /></a>
                                </div>
                                <div className="item">
                                    <a href="/"><img src="/images/product-details/similar1.jpg" alt="" /></a>
                                    <a href="/"><img src="/images/product-details/similar2.jpg" alt="" /></a>
                                    <a href="/"><img src="/images/product-details/similar3.jpg" alt="" /></a>
                                </div>
                                <div className="item">
                                    <a href="/"><img src="/images/product-details/similar1.jpg" alt="" /></a>
                                    <a href="/"><img src="/images/product-details/similar2.jpg" alt="" /></a>
                                    <a href="/"><img src="/images/product-details/similar3.jpg" alt="" /></a>
                                </div>

                            </div>

                            {/* <!-- Controls --> */}
                            <a className="left item-control" href="#similar-product" data-slide="prev">
                                <i className="fa fa-angle-left"></i>
                            </a>
                            <a className="right item-control" href="#similar-product" data-slide="next">
                                <i className="fa fa-angle-right"></i>
                            </a>
                        </div>

                    </div>
                    <div className="col-sm-7">
                        <div className="product-information">
                            {/* <!--/product-information--> */}
                            <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                            <h2>{product.title}</h2>
                            <p>Web ID: {product.webId}</p>
                            <img src="images/product-details/rating.png" alt="" />
                            <span>
                                <span>US ${product.price}</span>
                                <label>Quantity:</label>
                                <input type="text" />
                                <button type="button" className="btn btn-fefault cart">
                                    <i className="fa fa-shopping-cart"></i>
                                    Add to cart
									</button>
                            </span>
                            <p><b>Availability:</b> {product.availability ? "Available" : "Not available"}</p>
                            <p><b>Condition:</b> {product.condition}</p>
                            <p><b>Brand:</b> <Link to={`/brand/${product.brand._id}`}>{product.brand.name}</Link></p>
                            <p><b>Categoey:</b><Link to={`/category/${product.category._id}`}>{product.category.name}</Link></p>
                        </div>
                        {/* <!--/product-information--> */}
                    </div>
                </div>
                {/* <!--/product-details--> */}
                <RecommendedItems />
            </div>
        </Fragment >
    }
    else {
        return <NotFound />
    }
};

export default Product;