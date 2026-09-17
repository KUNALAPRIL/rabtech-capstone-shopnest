import { fetchProducts } from "./api.js";

import {
    getUser,
    loginUser,
    logoutUser
} from "./auth.js";

import {
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal
} from "./cart.js";

import {
    filterProducts,
    sortProducts,
    getStoredProducts,
    saveInitialProducts,
    addProduct,
    updateProduct,
    deleteProduct
} from "./products.js";

import {
    getOrders,
    createOrder
} from "./orders.js";


/* =========================================
   DOM ELEMENTS
========================================= */

const productGrid =
    document.getElementById("productGrid");

const categoryButtons =
    document.getElementById("categoryButtons");

const searchInput =
    document.getElementById("searchInput");

const sortSelect =
    document.getElementById("sortSelect");

const loading =
    document.getElementById("loading");

const errorBanner =
    document.getElementById("errorBanner");

const noResults =
    document.getElementById("noResults");

const resultCount =
    document.getElementById("resultCount");

const cartButton =
    document.getElementById("cartButton");

const cartCount =
    document.getElementById("cartCount");

const cartDialog =
    document.getElementById("cartDialog");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const clearCartButton =
    document.getElementById("clearCart");

const checkoutButton =
    document.getElementById("checkoutButton");

const loginButton =
    document.getElementById("loginButton");

const loginDialog =
    document.getElementById("loginDialog");

const closeLogin =
    document.getElementById("closeLogin");

const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");

const accountContent =
    document.getElementById("accountContent");

const ordersMessage =
    document.getElementById("ordersMessage");

const orderList =
    document.getElementById("orderList");


/* =========================================
   APPLICATION STATE
========================================= */

let products = [];

let selectedCategory = "all";


/* =========================================
   LOAD PRODUCTS
========================================= */

async function loadProducts() {

    loading.hidden = false;

    errorBanner.hidden = true;

    try {

        const apiProducts =
            await fetchProducts();

        products =
            saveInitialProducts(apiProducts);

        createCategories();

        displayProducts();

    } catch (error) {

        console.error(
            "Product loading error:",
            error
        );

        /*
            If the API fails but products were
            previously saved in localStorage,
            use those products.
        */

        const storedProducts =
            getStoredProducts();

        if (storedProducts.length > 0) {

            products = storedProducts;

            createCategories();

            displayProducts();

            errorBanner.textContent =
                "Using saved products because the API is temporarily unavailable.";

            errorBanner.hidden = false;

        } else {

            errorBanner.textContent =
                "Unable to load products. Please try again.";

            errorBanner.hidden = false;
        }

    } finally {

        loading.hidden = true;
    }
}


/* =========================================
   CREATE CATEGORY BUTTONS
========================================= */

function createCategories() {

    categoryButtons.innerHTML = `
        <button
            class="category-button active"
            type="button"
            data-category="all"
        >
            All
        </button>
    `;

    const categories = [
        ...new Set(
            products.map(
                product => product.category
            )
        )
    ];

    categories.forEach(category => {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "category-button";

        button.textContent =
            category;

        button.dataset.category =
            category;

        button.addEventListener(
            "click",
            () => {

                selectedCategory =
                    category;

                updateCategoryButtons(
                    button
                );

                displayProducts();
            }
        );

        categoryButtons.appendChild(
            button
        );
    });


    const allButton =
        categoryButtons.querySelector(
            '[data-category="all"]'
        );

    allButton.addEventListener(
        "click",
        () => {

            selectedCategory = "all";

            updateCategoryButtons(
                allButton
            );

            displayProducts();
        }
    );
}


/* =========================================
   UPDATE ACTIVE CATEGORY
========================================= */

function updateCategoryButtons(
    activeButton
) {

    document
        .querySelectorAll(
            ".category-button"
        )
        .forEach(button => {

            button.classList.remove(
                "active"
            );
        });

    activeButton.classList.add(
        "active"
    );
}


/* =========================================
   DISPLAY PRODUCTS
========================================= */

function displayProducts() {

    const filteredProducts =
        filterProducts(
            products,
            searchInput.value,
            selectedCategory
        );

    const sortedProducts =
        sortProducts(
            filteredProducts,
            sortSelect.value
        );

    productGrid.innerHTML = "";

    resultCount.textContent =
        `${sortedProducts.length} product(s) found`;

    noResults.hidden =
        sortedProducts.length !== 0;

    sortedProducts.forEach(product => {

        const card =
            createProductCard(product);

        productGrid.appendChild(card);
    });
}


/* =========================================
   CREATE PRODUCT CARD
========================================= */

function createProductCard(product) {

    const card =
        document.createElement("article");

    card.className =
        "product-card";

    card.innerHTML = `
        <img
            class="product-image"
            src="${product.image}"
            alt="${product.title}"
            loading="lazy"
        >

        <span class="product-category">
            ${product.category}
        </span>

        <h3 class="product-title">
            ${product.title}
        </h3>

        <p class="product-description">
            ${product.description}
        </p>

        <div class="product-bottom">

            <strong class="product-price">
                $${Number(
                    product.price
                ).toFixed(2)}
            </strong>

            <button
                class="add-button"
                type="button"
            >
                Add to Cart
            </button>

        </div>
    `;


    const addButton =
        card.querySelector(
            ".add-button"
        );


    addButton.addEventListener(
        "click",
        () => {

            addToCart(product);

            updateCart();

            /*
                Refresh cart if dialog is open.
            */

            if (cartDialog.open) {
                displayCart();
            }

            alert(
                "Product added to cart."
            );
        }
    );


    return card;
}


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    () => {

        displayProducts();
    }
);


/* =========================================
   SORT
========================================= */

sortSelect.addEventListener(
    "change",
    () => {

        displayProducts();
    }
);


/* =========================================
   CART COUNT
========================================= */

function updateCart() {

    const cart =
        getCart();

    cartCount.textContent =
        cart.length;
}


/* =========================================
   DISPLAY CART
========================================= */

function displayCart() {

    const cart =
        getCart();

    cartItems.innerHTML = "";


    if (!cart.length) {

        cartItems.innerHTML = `
            <p>
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent =
            "0.00";

        return;
    }


    cart.forEach(
        (product, index) => {

            const item =
                document.createElement("div");

            item.className =
                "cart-item";


            item.innerHTML = `
                <div>

                    <strong class="cart-item-title">
                        ${product.title}
                    </strong>

                    <br>

                    <small>
                        $${Number(
                            product.price
                        ).toFixed(2)}
                    </small>

                </div>

                <button
                    class="danger-button remove-item"
                    type="button"
                >
                    Remove
                </button>
            `;


            item
                .querySelector(
                    ".remove-item"
                )
                .addEventListener(
                    "click",
                    () => {

                        removeFromCart(index);

                        updateCart();

                        displayCart();
                    }
                );


            cartItems.appendChild(item);
        }
    );


    cartTotal.textContent =
        getCartTotal().toFixed(2);
}


/* =========================================
   OPEN CART
========================================= */

cartButton.addEventListener(
    "click",
    () => {

        displayCart();

        if (!cartDialog.open) {
            cartDialog.showModal();
        }
    }
);


/* =========================================
   CLOSE CART
========================================= */

closeCart.addEventListener(
    "click",
    () => {

        cartDialog.close();
    }
);


/* =========================================
   CLEAR CART
========================================= */

clearCartButton.addEventListener(
    "click",
    () => {

        clearCart();

        updateCart();

        displayCart();
    }
);


/* =========================================
   CHECKOUT
========================================= */

checkoutButton.addEventListener(
    "click",
    () => {

        const user =
            getUser();

        const cart =
            getCart();


        /*
            User must be logged in.
        */

        if (!user) {

            cartDialog.close();

            loginMessage.textContent =
                "Please login before checkout.";

            loginDialog.showModal();

            return;
        }


        /*
            Cart must contain products.
        */

        if (!cart.length) {

            alert(
                "Your cart is empty."
            );

            return;
        }


        /*
            Create the order.
        */

        const order =
            createOrder(
                cart,
                user.email
            );


        /*
            Clear cart after successful order.
        */

        clearCart();

        updateCart();

        displayCart();

        cartDialog.close();


        alert(
            `Order #${order.id} confirmed!`
        );


        displayOrders();
    }
);


/* =========================================
   ACCOUNT UI
========================================= */

function updateAccount() {

    const user =
        getUser();


    /*
        Guest user
    */

    if (!user) {

        loginButton.textContent =
            "Login";


        accountContent.innerHTML = `
            <p>
                You are currently browsing as a guest.
            </p>

            <button
                id="accountLoginButton"
                class="primary-button"
                type="button"
            >
                Login
            </button>
        `;


        document
            .getElementById(
                "accountLoginButton"
            )
            .addEventListener(
                "click",
                () => {

                    loginMessage.textContent = "";

                    loginDialog.showModal();
                }
            );


        return;
    }


    /*
        Logged-in user
    */

    loginButton.textContent =
        "Logout";


    accountContent.innerHTML = `
        <div class="management-section">

            <div class="management-header">

                <p class="eyebrow">
                    Account
                </p>

                <h3>
                    Welcome back
                </h3>

                <p>
                    Logged in as:
                    <strong>
                        ${user.email}
                    </strong>
                </p>

                <br>

                <button
                    id="logoutButton"
                    class="danger-button"
                    type="button"
                >
                    Logout
                </button>

            </div>

        </div>
    `;


    document
        .getElementById(
            "logoutButton"
        )
        .addEventListener(
            "click",
            () => {

                logoutUser();

                updateAccount();

                displayOrders();
            }
        );


    /*
        Add CRUD interface
        below account information.
    */

    renderProductManagement();
}


/* =========================================
   LOGIN BUTTON
========================================= */

loginButton.addEventListener(
    "click",
    () => {

        const user =
            getUser();


        if (user) {

            logoutUser();

            updateAccount();

            displayOrders();

            return;
        }


        loginMessage.textContent = "";

        loginDialog.showModal();
    }
);


/* =========================================
   LOGIN FORM
========================================= */

loginForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const password =
            document
                .getElementById("password")
                .value;


        /*
            Basic client-side validation.
        */

        if (!email) {

            loginMessage.textContent =
                "Please enter your email.";

            return;
        }


        if (password.length < 6) {

            loginMessage.textContent =
                "Password must contain at least 6 characters.";

            return;
        }


        /*
            Simulated authentication.
        */

        loginUser(email);


        loginMessage.textContent =
            "Login successful!";


        loginForm.reset();


        updateAccount();

        displayOrders();


        setTimeout(
            () => {

                if (loginDialog.open) {
                    loginDialog.close();
                }

            },
            300
        );
    }
);


/* =========================================
   CLOSE LOGIN
========================================= */

closeLogin.addEventListener(
    "click",
    () => {

        loginDialog.close();

        loginMessage.textContent = "";
    }
);


/* =========================================
   PRODUCT CRUD MANAGEMENT
========================================= */

function renderProductManagement() {

    const user =
        getUser();


    if (!user) {
        return;
    }


    const management =
        document.createElement("div");

    management.className =
        "management-section";


    management.innerHTML = `
        <div class="management-header">

            <p class="eyebrow">
                Admin Demo
            </p>

            <h3>
                Product Management
            </h3>

            <p>
                Add, edit, and delete products.
            </p>

        </div>


        <form id="productForm">

            <input
                type="hidden"
                id="editingProductId"
            >


            <div class="form-group">

                <label for="productTitle">
                    Product Name
                </label>

                <input
                    id="productTitle"
                    type="text"
                    required
                    placeholder="Product name"
                >

            </div>


            <div class="form-group">

                <label for="productPrice">
                    Price
                </label>

                <input
                    id="productPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    placeholder="99.99"
                >

            </div>


            <div class="form-group">

                <label for="productCategory">
                    Category
                </label>

                <input
                    id="productCategory"
                    type="text"
                    required
                    placeholder="electronics"
                >

            </div>


            <div class="form-group">

                <label for="productImage">
                    Image URL
                </label>

                <input
                    id="productImage"
                    type="url"
                    required
                    placeholder="https://..."
                >

            </div>


            <div class="form-group">

                <label for="productDescription">
                    Description
                </label>

                <textarea
                    id="productDescription"
                    required
                    rows="4"
                    placeholder="Product description"
                ></textarea>

            </div>


            <div class="management-actions">

                <button
                    type="submit"
                    class="primary-button"
                >
                    Save Product
                </button>

                <button
                    type="button"
                    id="cancelEdit"
                    class="secondary-button"
                >
                    Cancel
                </button>

            </div>

        </form>


        <div class="admin-product-list">

            <h3>
                Existing Products
            </h3>

            <div id="adminProductList">
            </div>

        </div>
    `;


    accountContent.appendChild(
        management
    );


    setupProductForm();

    renderAdminProducts();
}


/* =========================================
   PRODUCT FORM
========================================= */

function setupProductForm() {

    const form =
        document.getElementById(
            "productForm"
        );

    const cancelButton =
        document.getElementById(
            "cancelEdit"
        );


    if (!form || !cancelButton) {
        return;
    }


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const id =
                document.getElementById(
                    "editingProductId"
                ).value;


            const title =
                document
                    .getElementById(
                        "productTitle"
                    )
                    .value
                    .trim();


            const price =
                document
                    .getElementById(
                        "productPrice"
                    )
                    .value;


            const category =
                document
                    .getElementById(
                        "productCategory"
                    )
                    .value
                    .trim();


            const image =
                document
                    .getElementById(
                        "productImage"
                    )
                    .value
                    .trim();


            const description =
                document
                    .getElementById(
                        "productDescription"
                    )
                    .value
                    .trim();


            const productData = {

                title,

                price,

                category,

                image,

                description
            };


            /*
                UPDATE
            */

            if (id) {

                updateProduct(
                    id,
                    productData
                );

            }


            /*
                CREATE
            */

            else {

                addProduct(
                    productData
                );
            }


            /*
                Refresh application state.
            */

            products =
                getStoredProducts();


            selectedCategory =
                "all";


            createCategories();

            displayProducts();

            renderAdminProducts();


            /*
                Reset form.
            */

            form.reset();

            document.getElementById(
                "editingProductId"
            ).value = "";
        }
    );


    cancelButton.addEventListener(
        "click",
        () => {

            form.reset();

            document.getElementById(
                "editingProductId"
            ).value = "";
        }
    );
}


/* =========================================
   ADMIN PRODUCT LIST
========================================= */

function renderAdminProducts() {

    const list =
        document.getElementById(
            "adminProductList"
        );


    if (!list) {
        return;
    }


    const storedProducts =
        getStoredProducts();


    list.innerHTML = "";


    if (!storedProducts.length) {

        list.innerHTML = `
            <p>
                No products available.
            </p>
        `;

        return;
    }


    storedProducts.forEach(
        product => {

            const item =
                document.createElement("div");


            item.className =
                "admin-product-item";


            item.innerHTML = `
                <div>

                    <strong>
                        ${product.title}
                    </strong>

                    <p>
                        $${Number(
                            product.price
                        ).toFixed(2)}
                    </p>

                </div>


                <div class="admin-actions">

                    <button
                        type="button"
                        class="secondary-button edit-product"
                    >
                        Edit
                    </button>


                    <button
                        type="button"
                        class="danger-button delete-product"
                    >
                        Delete
                    </button>

                </div>
            `;


            /*
                EDIT PRODUCT
            */

            item
                .querySelector(
                    ".edit-product"
                )
                .addEventListener(
                    "click",
                    () => {

                        document.getElementById(
                            "editingProductId"
                        ).value =
                            product.id;


                        document.getElementById(
                            "productTitle"
                        ).value =
                            product.title;


                        document.getElementById(
                            "productPrice"
                        ).value =
                            product.price;


                        document.getElementById(
                            "productCategory"
                        ).value =
                            product.category;


                        document.getElementById(
                            "productImage"
                        ).value =
                            product.image;


                        document.getElementById(
                            "productDescription"
                        ).value =
                            product.description;


                        document.getElementById(
                            "productTitle"
                        ).focus();


                        window.scrollTo({
                            top:
                                document.getElementById(
                                    "account"
                                ).offsetTop,

                            behavior:
                                "smooth"
                        });
                    }
                );


            /*
                DELETE PRODUCT
            */

            item
                .querySelector(
                    ".delete-product"
                )
                .addEventListener(
                    "click",
                    () => {

                        const confirmed =
                            confirm(
                                "Delete this product?"
                            );


                        if (!confirmed) {
                            return;
                        }


                        deleteProduct(
                            product.id
                        );


                        products =
                            getStoredProducts();


                        createCategories();

                        displayProducts();

                        renderAdminProducts();
                    }
                );


            list.appendChild(item);
        }
    );
}


/* =========================================
   ORDERS
========================================= */

function displayOrders() {

    const user =
        getUser();

    const orders =
        getOrders();


    orderList.innerHTML = "";


    /*
        Guest
    */

    if (!user) {

        ordersMessage.textContent =
            "Login to view your order history.";

        return;
    }


    /*
        Only show orders belonging
        to the current simulated user.
    */

    const userOrders =
        orders.filter(
            order =>
                order.email === user.email
        );


    /*
        No orders
    */

    if (!userOrders.length) {

        ordersMessage.textContent =
            "You have no orders yet.";

        return;
    }


    ordersMessage.textContent =
        `${userOrders.length} order(s) found.`;


    userOrders
        .slice()
        .reverse()
        .forEach(order => {

            const orderCard =
                document.createElement("div");


            orderCard.className =
                "order-card";


            orderCard.innerHTML = `
                <div class="order-header">

                    <div>

                        <h3>
                            Order #${order.id}
                        </h3>

                        <p>
                            ${order.date}
                        </p>

                    </div>

                    <strong>
                        ${order.status}
                    </strong>

                </div>


                <div class="order-items">

                    ${order.items
                        .map(
                            item => `
                                <p>
                                    ${item.title}
                                    —
                                    $${Number(
                                        item.price
                                    ).toFixed(2)}
                                </p>
                            `
                        )
                        .join("")}

                </div>


                <div class="order-total">

                    Total:
                    <strong>
                        $${Number(
                            order.total
                        ).toFixed(2)}
                    </strong>

                </div>
            `;


            orderList.appendChild(
                orderCard
            );
        });
}


/* =========================================
   APPLICATION START
========================================= */

updateCart();

updateAccount();

displayOrders();

loadProducts();