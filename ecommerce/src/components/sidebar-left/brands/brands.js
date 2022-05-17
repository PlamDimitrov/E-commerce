import React, { useEffect, useState } from 'react';
import { getAllBrands } from '../../../api';
import { Link } from 'react-router-dom';

const Brands = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        getAllBrands()
            .then(res => setBrands(res))
            .catch(err => console.log(err))
    }, [])


    return <div className="brands_products">
        <h2>Brands</h2>
        <div className="brands-name">
            <ul className="nav nav-pills nav-stacked">
                {!!brands.length
                    ? brands.map(brand => <li key={brand.name}><Link to={`/brand/${brand._id}`}> <span className="pull-right"></span>{brand.name}</Link></li>)
                    : <span>No brands available! Please create a <Link to="/brand-create">brand</Link>!</span>
                }
            </ul>
        </div>
    </div>
};

export default Brands;