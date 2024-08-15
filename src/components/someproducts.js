const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    return response.text().then(text => {
        const error = new Error(`${response.statusText}: ${text}`);
        error.response = response;
        return Promise.reject(error);
    });
}

export const getAllProducts = () =>
    fetch("/api/v1/products/products")
        .then(checkStatus);
