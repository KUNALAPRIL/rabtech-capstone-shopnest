const ORDER_KEY = "shopnestOrders";

export function getOrders() {

    return JSON.parse(
        localStorage.getItem(ORDER_KEY)
    ) || [];
}


export function createOrder(cart, email) {

    if (!cart.length) {
        return null;
    }

    const orders = getOrders();

    const total = cart.reduce(
        (sum, product) =>
            sum + Number(product.price),
        0
    );

    const order = {
        id: Date.now(),
        email: email,
        items: cart,
        total: total,
        date: new Date().toLocaleString(),
        status: "Confirmed"
    };

    orders.push(order);

    localStorage.setItem(
        ORDER_KEY,
        JSON.stringify(orders)
    );

    return order;
}