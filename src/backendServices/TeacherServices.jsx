import { myAxios } from "./Helper";

export const signUp = (data) => {
    return fetch('http://localhost:8080/ins/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (!response.ok) {
        // If response is not OK, check if there's text, then throw it as an error
        return response.text().then((text) => {
          throw new Error(text || 'Error occurred'); // Default message if no text
        });
      }
      
      // If there's a response body, try parsing it as JSON
      return response.text().then((text) => {
        return text ? JSON.parse(text) : {}; // If there's text, parse it; if not, return an empty object
      });
    })
    .catch((error) => {
      console.error("Error during sign up", error);
      throw error;  // Ensure the error is propagated so it can be caught in the component
    });
  };
  
export const signIn = (user) => {
    return myAxios.post('/ins/register', user)
        .then((response) => response.data)  // Axios automatically parses JSON responses
        .catch((error) => {
            console.error("Error during sign up", error);
            throw error;  // Ensure the error is propagated so it can be caught in the component
        });
};
