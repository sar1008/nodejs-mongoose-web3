import axios from "axios";

export const handleMint = async (amount: number) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    console.log("accessToken", accessToken)
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post(
      "http://localhost:3000/api/erc20//mint",
      {
        amount,
      },
      {
        headers: headers,
      }
    );

    if (response) {
      alert("Minting Successfull");
      return response.data;
    }
  } catch (error) {
    console.error("Error during Minting:", error);
  }
};
