import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOneCategory } from '../../../../api';
import Product from '../../../product/product';

const CategoryProgucts = (props) => {
    const categoryId = { id: props.match.params.id };
    const [productsFromCategory, setProductsFromCategory] = useState([]);

    useEffect(() => {
        getOneCategory(categoryId)
            .then(res => setProductsFromCategory(res[0].products))
            .catch(err => console.log(err))
    }, [])

    return <Fragment>
        {console.log(productsFromCategory)}
        {productsFromCategory.length !== 0
            ? productsFromCategory.map(product => <Product key={product.webId} product={product} />)
            : <span>No brands available! Please create a <Link to="/product-create">brand</Link>!</span>
        }
    </Fragment>


}

export default CategoryProgucts;