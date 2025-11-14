"use client";

import { useBalances } from "@/hooks/useBalances";
import { useMemo } from "react";
import { useAccount } from "wagmi";
import { Spinner } from "./ui/spinner";
import { ETH_TOKEN, MATE_TOKEN } from "@/lib/evvm/constants";

export const Balances = () => {
  const account = useAccount();

  const shortAcc: string = useMemo(() => {
    if (!account.address) return "...";
    const firstPart = account.address.slice(0, 4);
    const secondPart = account.address.slice(
      account.address.length - 6,
      account.address.length,
    );
    return `${firstPart}...${secondPart}`;
  }, [account]);

  const { balances, loading } = useBalances(account.address, [
    MATE_TOKEN,
    ETH_TOKEN,
  ]);

  return (
    <div className="bg-secondary rounded-xl w-full p-3">
      <h2 className="text-xl">Balances of {shortAcc}</h2>
      <p>
        MATE token:{" "}
        {loading ? <Spinner className="inline" /> : balances[MATE_TOKEN] || 0}
      </p>
      <p>
        ETH token:{" "}
        {loading ? <Spinner className="inline" /> : balances[ETH_TOKEN] || 0}
      </p>
    </div>
  );
};
