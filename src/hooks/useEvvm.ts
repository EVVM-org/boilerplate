"use client";

import { evvmAddress } from "@/config";
import { readContract, readContracts } from "@wagmi/core";
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

    const _id: any = await readContract(config, {
      abi: EvvmABI,
      address: evvmAddress,
      functionName: "getEvvmID",
      args: [],
    });

    const _stakingAdd: any = await readContract(config, {
      abi: EvvmABI,
      address: evvmAddress,
      functionName: "getStakingContractAddress",
      args: [],
    });

    const _nsAdd: any = await readContract(config, {
      abi: EvvmABI,
      address: evvmAddress,
      functionName: "getNameServiceAddress",
      args: [],
    });

    if (_id.result) setEvvmID(_id.result);
    if (_stakingAdd.result) setStakingAddress(_stakingAdd.result);
    if (_nsAdd.result) setNameserviceAddress(_nsAdd.result);

    setLoading(false);
  };

  return {
    loading,
    evvmID,
    stakingAddress,
    nameserviceAddress,
  };
};
