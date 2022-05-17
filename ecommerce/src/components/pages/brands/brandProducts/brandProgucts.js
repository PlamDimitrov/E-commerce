import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOneBrand } from '../../../../api';
import Product from '../../../product/product';

const BrandProgucts = (props) => {
    const brandId = { id: props.match.params.id };
    const [productsFromBrand, setProductsFromBrand] = useState([]);

    useEffect(() => {
        getOneBrand(brandId)
            .then(res => setProductsFromBrand(res[0].products))
            .catch(err => console.log(err))
    }, [])

    return <Fragment>
        {productsFromBrand.length !== 0
            ? productsFromBrand.map(product => <Product key={product.webId} product={product} />)
            : <span>No brands available! Please create a <Link to="/product-create">brand</Link>!</span>
        }

    </Fragment>


}

export default BrandProgucts;