import { myAxios } from "./Helper";
//instructor signup
export const signUp = (user) => {
    return myAxios.post('/ins/register', user)
        .then((response) => response.data)  // Axios automatically parses JSON responses
        .catch((error) => {
            console.error("Error during sign up", error);
            throw error;  // Ensure the error is propagated so it can be caught in the component
        });
};
//instructor login 
export const login = (user) => {
    return myAxios.post('/auth/login', user)
        .then((response) => response.data)  // Axios automatically parses JSON responses
        .catch((error) => {
            console.error("Error during Login", error);
            throw error;  // Ensure the error is propagated so it can be caught in the component
        });
};
