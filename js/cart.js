const CART_KEY = "shopnestCart";

export function getCart() {
    return JSON.parse(
        localStorage.getItem(CART_KEY)
    ) || [];
}

export function addToCart(product) {

    const cart = getCart();

    cart.push(product);

    saveCart(cart);

    return cart;
}

export function removeFromCart(index) {

    const cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);

    return cart;
}

export function clearCart() {

    localStorage.removeItem(CART_KEY);

    return [];
}

export function getCartTotal() {

    const cart = getCart();

    return cart.reduce(
        (total, product) =>
            total + Number(product.price),
        0
    );
}

export function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );
}