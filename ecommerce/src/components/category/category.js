import React from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from "../../globalFunctions/Store/Store";
import { deleteCategory } from '../../api';

const Category = (props) => {
    const { state } = React.useContext(StoreContext);
    // const isLoggedIn = !!state.user;
    const isLoggedIn = true;  // Hard login just for test! To be removed!
    const category = props.category;

    return <div key={category.webId} className="col-sm-4">
        <div className="product-image-wrapper">
            <div className="single-products">
                <Link to={`/category/${category.id}`} >
                    <div className="productinfo text-center">
                        <img src={category.imageUrl} alt={category.name} />
                        <p>{category.name}</p>
                    </div>
                </Link>
                {isLoggedIn
                    ? <div className="product-overlay">
                        <div className="overlay-content">
                            <h2>
                                <Link to={`/category-edit/${category.id}`} className="btn btn-default add-to-cart">
                                    <i className="fa fa-edit"></i>Edit {category.name}</Link>
                            </h2>
                            <h2>
                                <Link to={`/`} onClick={() => deleteCategory(category)} className="btn btn-default add-to-cart deleteBtn">
                                    <i className="fa fa-trash"></i>Delete {category.name}</Link>
                            </h2>
                        </div>
                    </div>
                    : null
                }
            </div>
        </div>
    </div>
}

export default Category;