import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../../../propmts/loader/loader';
import Category from '../../../category/category';
import { getAllCategories } from '../../../../api';

class CategoryPage extends Component {
    state = {
        isLoading: true,
        categories: [],
    }

    componentDidMount() {
        getAllCategories()
            .then(response => {
                this.setState({
                    isLoading: false,
                    categories: response
                })
            })
    }

    render() {
        return <Fragment>
            {this.state.isLoading ?
                <Loader /> :
                <div className="col-sm-9 padding-right">
                    <div className="features_items">
                        <h2 className="title text-center">Categories:</h2>
                        {
                            this.state.categories.length !== 0
                                ? this.state.categories.map(category => <Category key={category.name} category={category} />)
                                : <span>No categories available! Please create a <Link to="/category-create">category</Link>!</span>
                        }
                    </div>
                </div>
            }
        </Fragment >
    }
}
export default CategoryPage;