"use client";

import { Balances } from "@/components/Balances";
import { EvvmInfo } from "@/components/EvvmInfo";
import { useAccount } from "wagmi";
import { NotConected } from "./NotConnected";

export const HomeCards = () => {
  const account = useAccount();

  if (!account.isConnected) return <NotConected />;

  return (
    <div className="flex w-[60%] mx-auto gap-3">
      <EvvmInfo />
      <Balances />
    </div>
  );
};
