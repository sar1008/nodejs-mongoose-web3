import axios from "axios";

export const handleSignIn = async (userName: string, password: string) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      // Add any other headers you need
    };

    const response = await axios.post(
      "http://localhost:3000/api/auth/signin",
      {
        userName,
        password,
      },
      {
        headers: headers,
      }
    );

    if (response) {
      localStorage.setItem(
        "accessToken",
        response.data.data.tokens.accessToken.token
      );


      alert("Sign In Successfull");
      return response.data;
    }
  } catch (error) {
    // Handle errors
    console.error("Error during signIn:", error);
  }
};
