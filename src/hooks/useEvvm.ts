"use client";

import { evvmAddress } from "@/config";
import { readContract } from "@wagmi/core";
import { EvvmABI } from "@evvm/viem-signature-library";
import { useEffect, useState } from "react";
import { config } from "@/config";

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

    if (_id) setEvvmID(_id);
    if (_stakingAdd) setStakingAddress(_stakingAdd);
    if (_nsAdd) setNameserviceAddress(_nsAdd);

    setLoading(false);
  };

  return {
    loading,
    evvmID,
    stakingAddress,
    nameserviceAddress,
  };
};
