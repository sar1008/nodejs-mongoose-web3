import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleSignup } from "@/services/signup";
import { useState } from "react";
// import { useHistory } from "react-router-dom";

export const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      const response = await handleSignup(
        firstName,
        lastName,
        userName,
        email,
        password
      );
      console.log("response", response);
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div>
        <Input
          className="my-3"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <Input
          className="my-3"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <Input
          className="my-3"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
        />
        <Input
          className="my-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />

        <Input
          className="my-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <Button onClick={signUp}>Sign Up</Button>
      </div>
    </div>
  );
};
