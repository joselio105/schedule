const authKey = 'auth';
const userKey = 'user';

export const saveAuth = auth => {
    localStorage.setItem(authKey, JSON.stringify(auth));
}

export const saveUser = user => {
    localStorage.setItem(userKey, JSON.stringify(user));
}

export const getAuth = () => {
    const response = localStorage.getItem(authKey);
    if(response){
        return JSON.parse(response);
    }
}

export const getUser = () => {
    const response = localStorage.getItem(userKey);
    
    return JSON.parse(response) || false;
}

export const getToken = () => {
    const auth = getAuth();
    if(auth){
        return auth.token;
    }
    
}

export const removeAuth = () => {
    localStorage.removeItem(authKey);
}

export const removeUser = () => {
    localStorage.removeItem(userKey);
}

export const isAuthenticated = () => {
    const auth = getAuth();
    const user = getUser();

    return authExists(auth) && userExists(user) && idIsValid(auth, user) && tokenIsValid(auth);
}

export const logout = () => {
    removeAuth();
    removeUser();
}

const authExists = auth => {
    return (auth ? true : false);
}

const userExists = user => {
    return (user ? true : false);
}

const idIsValid = (auth, user) => {
    return parseInt(auth.userId) === parseInt(user.id);
}

const tokenIsValid = auth => {
    const timestamp = new Date().getTime();
    
    return auth.expiration >= timestamp;
}