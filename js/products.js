const PRODUCTS_KEY = "shopnestProducts";

function saveProducts(products) {
    localStorage.setItem(
        PRODUCTS_KEY,
        JSON.stringify(products)
    );
}

export function getStoredProducts() {
    return JSON.parse(
        localStorage.getItem(PRODUCTS_KEY)
    ) || [];
}

export function saveInitialProducts(products) {

    const existing =
        getStoredProducts();

    if (!existing.length) {
        saveProducts(products);
    }

    return getStoredProducts();
}

export function addProduct(productData) {

    const products =
        getStoredProducts();

    const newProduct = {
        id: Date.now(),

        title: productData.title,

        price: Number(productData.price),

        category: productData.category,

        description: productData.description,

        image: productData.image
    };

    products.push(newProduct);

    saveProducts(products);

    return newProduct;
}

export function updateProduct(
    productId,
    productData
) {

    const products =
        getStoredProducts();

    const index =
        products.findIndex(
            product =>
                product.id === Number(productId)
        );

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],

        title: productData.title,

        price: Number(productData.price),

        category: productData.category,

        description: productData.description,

        image: productData.image
    };

    saveProducts(products);

    return products[index];
}

export function deleteProduct(productId) {

    const products =
        getStoredProducts();

    const updated =
        products.filter(
            product =>
                product.id !== Number(productId)
        );

    saveProducts(updated);

    return updated;
}

export function filterProducts(
    products,
    searchTerm,
    category
) {

    let result = [...products];

    if (category !== "all") {

        result = result.filter(
            product =>
                product.category === category
        );
    }

    if (searchTerm) {

        const search =
            searchTerm.toLowerCase().trim();

        result = result.filter(
            product =>
                product.title
                    .toLowerCase()
                    .includes(search)
        );
    }

    return result;
}

export function sortProducts(
    products,
    sortType
) {

    const result = [...products];

    if (sortType === "price-low") {

        result.sort(
            (a, b) =>
                Number(a.price) -
                Number(b.price)
        );
    }

    if (sortType === "price-high") {

        result.sort(
            (a, b) =>
                Number(b.price) -
                Number(a.price)
        );
    }

    if (sortType === "name") {

        result.sort(
            (a, b) =>
                a.title.localeCompare(
                    b.title
                )
        );
    }

    return result;
}