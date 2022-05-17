import React from 'react';
import './feature-items.css';
import Product from '../../../../product/product';


const FeatureItems = (props) => {
    const featuredItemsOnly = props.products.filter(product => product.featuredItem === true);
    if (featuredItemsOnly.length !== 0) {
        return <div className="features_items">
            <h2 className="title text-center">Features Items</h2>
            {featuredItemsOnly.map(product => <Product key={product.webId} product={product} />)}
        </div>
    } else {
        return <div className="features_items">
            <h2 className="title text-center">No feature products to show!</h2>
        </div>
    }
}

export default FeatureItems;