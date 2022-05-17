import React, { Fragment, useEffect, useState } from 'react';
import { getAllCategories } from '../../../api';
import { Link } from 'react-router-dom';


const Category = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories()
            .then(res => setCategories(res))
            .catch(err => console.log(err))
    }, [])

    return <Fragment>
        <h2>Category</h2>
        <div className="panel-group category-products" id="accordian">
            {!!categories.length
                ? categories.map(category => <div key={category.name} className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title"><Link to={`/category/${category._id}`}>{category.name}</Link></h4>
                    </div>
                </div>
                )
                : <span>No categories available! Please create a <Link to="/category-create">category</Link>!</span>
            }
        </div>
    </Fragment >
};

export default Category;