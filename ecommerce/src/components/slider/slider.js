import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../api';
import { Link } from 'react-router-dom';

const Slider = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts()
            .then(res => setProducts(res))
            .catch(err => console.log(err))
    }, [])


    return <section id="slider">
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <div id="slider-carousel" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#slider-carousel" data-slide-to="0" className="active"></li>
                            <li data-target="#slider-carousel" data-slide-to="1"></li>
                            <li data-target="#slider-carousel" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            {!!products.length
                                ? products
                                    .filter(product => product.recommended === true)
                                    .map((product, index) => <div key={product.webId} className={index === 0 ? 'item active' : 'item'}>
                                        <div className="col-sm-6">
                                            <h1><span>E</span>-SHOPPER</h1>
                                            <h2>{product.name}</h2>
                                            <p>{product.description} </p>
                                            <button type="button" className="btn btn-default get">Get it now</button>
                                        </div>
                                        <div className="col-sm-6">
                                            <img src={product.imageUrl} className="girl img-responsive" alt={product.name} />
                                        </div>
                                    </div>)
                                : <div className="item active">
                                    <div className="col-sm-6">
                                        <h1><span>E</span>-SHOPPER</h1>
                                        <h2>Dummy item!</h2>
                                        <p> No products are available! Please create a <Link to="/product-create">product</Link> and make it recommended!</p>
                                        <button type="button" className="btn btn-default get">Get it now</button>
                                    </div>
                                    <div className="col-sm-6">
                                        <img src="images/home/girl1.jpg" className="girl img-responsive" alt="" />
                                    </div>
                                </div>
                            }
                        </div>
                        <a href="#slider-carousel" className="left control-carousel hidden-xs" data-slide="prev">
                            <i className="fa fa-angle-left"></i>
                        </a>
                        <a href="#slider-carousel" className="right control-carousel hidden-xs" data-slide="next">
                            <i className="fa fa-angle-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
};

export default Slider;