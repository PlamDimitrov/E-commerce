const getDataFromForm = (event, element) => {
    const { name, type } = event.target;
    if (type === 'checkbox') {
        if (event.target.checked && event.target.value === 'on') {
            element[name] = true;
        } else if (event.target.value === 'on') {
            element[name] = false;
        } else if (event.target.checked) {
            element[name] = event.target.value;
        } else {
            element[name] = ''
        }
    } else {
        element[name] = event.target.value
    }
}

export {
    getDataFromForm,

}