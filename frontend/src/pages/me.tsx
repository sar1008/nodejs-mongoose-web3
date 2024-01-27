import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleMint } from "@/services/me";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useConnect } from "wagmi";
import { useAccount, useDisconnect } from "wagmi";
// import {
//   prepareWriteContract,
//   waitForTransaction,
//   writeContract,
// } from "@wagmi/core";
// import { useReadContract } from "wagmi";
// import { tokenContractABI, tokenContractAddress } from "../../contract";

export const Me = () => {
  const { connectors, connect } = useConnect();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const connector = connectors[0];
  const location = useLocation();
  const user = location.state?.user;

  const [amount, setAmount] = useState<string>("");

  //   const { data: balance } = useReadContract({
  //     tokenContractABI,
  //   });

  const mint = async () => {
    try {
      await handleMint(parseInt(amount));
    } catch (error) {
      console.error("Error during minting", error);
    }
  };

  return (
    <div className="flex flex-col p-4">
      <p>Name: {`${user.firstName} ${user.lastName}`}</p>
      <p>Email: {`${user.email}`}</p>
      <p>userName: ${`${user.userName}`}</p>
      <div>
        {!address && (
          <Button onClick={() => connect({ connector })}>Connect Wallet</Button>
        )}

        <h3>Address: {address}</h3>

        {address && (
          <Button onClick={() => disconnect()}>Disconnect Wallet</Button>
        )}

        <h3>Call Mint API</h3>
        <Input
        className='w-[10rem]'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
        />
        <Button  onClick={mint}>Call Mint</Button>
      </div>
    </div>
  );
};
