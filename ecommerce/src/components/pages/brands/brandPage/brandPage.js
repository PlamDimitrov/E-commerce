import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../../../propmts/loader/loader';
import Brand from '../../../brand/brand';
import { getAllBrands } from '../../../../api';

class BrandPage extends Component {
    state = {
        isLoading: true,
        brands: [],
    }

    componentDidMount() {
        getAllBrands()
            .then(response => {
                this.setState({
                    isLoading: false,
                    brands: response
                })
            })
    }

    render() {
        return <Fragment>
            {this.state.isLoading ?
                <Loader /> :
                <div className="col-sm-9 padding-right">
                    <div className="features_items">
                        <h2 className="title text-center">Brands:</h2>
                        {
                            this.state.brands.length !== 0
                                ? this.state.brands.map(brand => <Brand key={brand.name} brand={brand} />)
                                : <span>No brands available! Please create a <Link to="/brand-create">brand</Link>!</span>
                        }
                    </div>
                </div>
            }
        </Fragment >
    }
}
export default BrandPage;