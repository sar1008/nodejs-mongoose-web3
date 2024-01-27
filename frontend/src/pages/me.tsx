import { Button } from "@/components/ui/button";
import React from "react";
import { useLocation } from "react-router-dom";
import { useConnect } from "wagmi";
import { useAccount, useDisconnect } from "wagmi";

export const Me = () => {
  const { connectors, connect } = useConnect();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const connector = connectors[0];
  const location = useLocation();
  const user = location.state?.user;
  return (
    <div className="flex flex-col">
      <p>Name: {`${user.firstName} ${user.lastName}`}</p>
      <p>Email: {`${user.email}`}</p>
      <p>userName: ${`${user.userName}`}</p>
      <div>
        {!address  && (
          <Button onClick={() => connect({ connector })}>Connect Wallet</Button>
        )}

        <h3>Address: {address}</h3>

        {address && (
          <Button onClick={() => disconnect()}>Disconnect Wallet</Button>
        )}
      </div>
    </div>
  );
};
