"use client";

import { evvmAddress } from "@/config";
import { readContracts } from "@wagmi/core";
import { EvvmABI } from "@evvm/viem-signature-library";
import { useEffect, useState } from "react";
import { config } from "@/config";

const contracts = [
  {
    abi: EvvmABI as any,
    address: evvmAddress,
    functionName: "getEvvmID",
    args: [],
  },
  {
    abi: EvvmABI as any,
    address: evvmAddress,
    functionName: "getStakingContractAddress",
    args: [],
  },
  {
    abi: EvvmABI as any,
    address: evvmAddress,
    functionName: "getNameServiceAddress",
    args: [],
  },
];

export const useEvvm = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [evvmID, setEvvmID] = useState<bigint | undefined>();
  const [stakingAddress, setStakingAddress] = useState<string | undefined>();
  const [nameserviceAddress, setNameserviceAddress] = useState<
    string | undefined
  >();

  useEffect(() => {
    _fetchEvvmInfo();
  }, []);

  /**
   * Fetch summary info for EVVM contract: evvmID, stakingAddress, and NameService address
   */
  const _fetchEvvmInfo = async () => {
    setLoading(true);
    const [evvmIDResult, stakingAddrResult, nsAddrResult] = await readContracts(
      config,
      { contracts },
    );

    console.log({
      evvmIDResult,
      stakingAddrResult,
      nsAddrResult,
    });

    setEvvmID(
      evvmIDResult.result ? BigInt(String(evvmIDResult.result)) : undefined,
    );
    setStakingAddress(
      typeof stakingAddrResult?.result === "string"
        ? stakingAddrResult.result
        : undefined,
    );
    setNameserviceAddress(
      typeof nsAddrResult?.result === "string"
        ? nsAddrResult.result
        : undefined,
    );

    setLoading(false);
  };

  return {
    loading,
    evvmID,
    stakingAddress,
    nameserviceAddress,
  };
};
