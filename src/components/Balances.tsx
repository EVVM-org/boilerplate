"use client";

import { useBalances } from "@/hooks/useBalances";
import { useMemo } from "react";
import { Spinner } from "./ui/spinner";
import { ETH_TOKEN, MATE_TOKEN } from "@/lib/evvm/constants";

interface IProps {
  account: `0x${string}`;
}
export const Balances: React.FC<IProps> = ({ account }) => {
  const shortAcc: string = useMemo(() => {
    const firstPart = account.slice(0, 4);
    const secondPart = account.slice(account.length - 6, account.length);
    return `${firstPart}...${secondPart}`;
  }, [account]);

  const { balances, loading } = useBalances(account, [MATE_TOKEN, ETH_TOKEN]);

  return (
    <div className="bg-secondary rounded-xl p-3">
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
