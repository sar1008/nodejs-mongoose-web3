import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleSignIn } from "@/services/signin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      const response = await handleSignIn(userName, password);
      console.log("response", response);
      if (response) {
        navigate("/me", { state: { user: response.data.user } });
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div>
        <Input
          className="my-3"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
        />

        <Input
          className="my-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <Button onClick={signIn}>Sign In</Button>
      </div>
    </div>
  );
};
