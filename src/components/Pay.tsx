"use client";

import { useAccount } from "wagmi";

export const Pay = () => {
  const account = useAccount();

  return (
    <div className="bg-secondary rounded-xl w-full p-3">
      <h2 className="text-xl">Pay</h2>
	  <p>boilerplate</p>
    </div>
  );
};
