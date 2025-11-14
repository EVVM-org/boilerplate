"use client";

import { getBalance } from "@/lib/evvm/utils";
import { useEffect, useState } from "react";

type HexString = `0x${string}`;

export const useBalances = (
  user: HexString | undefined,
  tokens: HexString[],
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [balances, setBalances] = useState<
    Record<HexString, bigint | undefined>
  >({});

  useEffect(() => {
    _fetchBalances();
  }, [user]);

  /**
   * For each token provided, calls `getBalance` and saves the results
   * in state
   */
  const _fetchBalances = async () => {
    if (!user) return;
    setLoading(true);
    const _balances = await Promise.all(tokens.map((t) => getBalance(user, t)));

    let result: Record<HexString, bigint> = {};

    for (let i = 0; i < tokens.length; i++) {
      result[tokens[i]] = _balances[i];
    }

    setBalances(result);
    setLoading(false);
  };

  /**
   * Fetches the balances again
   */
  const refresh = () => {
    _fetchBalances();
  };

  return {
    loading,
    balances,

    refresh,
  };
};
