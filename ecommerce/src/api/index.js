import route from './apiRoots'

const api = (route, method, data) => {
    const headers = {
        method: method, // *GET, POST, PUT, DELETE, etc.
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    }
    if (data) {
        headers.body = data ? JSON.stringify(data) : '' // body data type must match "Content-Type" header
    }
    return fetch(route, headers)
}

const post = (route, data) => {
    return api(route, 'POST', data)
}
const get = (route) => {
    return api(route, 'GET')
}
const put = (route, data) => {
    return api(route, 'PUT', data)
}
const _delete = (route, data) => {
    return api(route, 'DELETE', data)
}
// Services

// User
const registerUser = (user) => {
    return post(route.userRegister, user)
}
const logInUser = (user) => {
    return post(route.userLogIn, user)
}
const logOutUser = () => {
    return get(route.userLogOut)
}

// Product
const createProduct = (product) => {
    console.log("test here");
    console.log(JSON.stringify(product.brand));
    return post(route.productCreate, product)
}
const editProduct = (product) => {
    return put(route.productEditOne, product)
}
const deleteProduct = (product) => {
    return _delete(route.productDeleteOne, product)
}
const getAllProducts = () => {
    return get(route.productGetAll).then(res => res.json())
}
const getOneProduct = (product) => {
    return post(route.productGetOne, product).then(res => res.json())
}

// Category
const createCategory = (category) => {
    return post(route.categoryCreate, category)
}
const editCategory = (category) => {
    return put(route.categoryEditOne, category)
}
const deleteCategory = (category) => {
    return _delete(route.categoryDeleteOne, category)
}
const getAllCategories = () => {
    return get(route.categoryGetAll).then(res => res.json())
}
const getOneCategory = (category) => {
    return post(route.categoryGetOne, category).then(res => res.json())
}

// Brand
const createBrand = (brand) => {
    return post(route.brandCreate, brand)
}
const editBrand = (brand) => {
    return put(route.brandEditOne, brand)
}
const deleteBrand = (brand) => {
    return _delete(route.brandDeleteOne, brand)
}
const getAllBrands = () => {
    return get(route.brandGetAll).then(res => res.json())
}
const getOneBrand = (brand) => {
    return post(route.brandGetOne, brand).then(res => res.json())
}



export {
    registerUser,
    logInUser,
    createProduct,
    getAllProducts,
    getOneProduct,
    createCategory,
    getAllCategories,
    getOneCategory,
    createBrand,
    getAllBrands,
    getOneBrand,
    editProduct,
    deleteProduct,
    editCategory,
    deleteCategory,
    editBrand,
    deleteBrand,
    logOutUser,

}