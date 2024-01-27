import axios from "axios";

export const handleSignup = async (
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  password: string
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      // Add any other headers you need
    };

    const response = await axios.post(
      "http://localhost:3000/api/auth/signup",
      {
        firstName,
        lastName,
        userName,
        email,
        password,
        // Add other required fields here
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
      alert("Sign Up Successfull");
      return response.data;
    }
  } catch (error) {
    // Handle errors
    console.error("Error during signup:", error);
  }
};
