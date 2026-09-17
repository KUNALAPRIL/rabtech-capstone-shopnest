const USER_KEY = "shopnestUser";

export function getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
}

export function loginUser(email) {
    const user = {
        email: email,
        loggedIn: true,
        loginTime: new Date().toISOString()
    };

    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return user;
}

export function logoutUser() {
    localStorage.removeItem(USER_KEY);
}

export function isLoggedIn() {
    return getUser() !== null;
}