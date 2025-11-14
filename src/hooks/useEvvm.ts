"use client";

import { readContract } from "@wagmi/core";
import { EvvmABI } from "@evvm/viem-signature-library";
import { useEffect, useState } from "react";
import { config, evvmAddress } from "@/config";

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

    try {
      const _id: any = await readContract(config, {
        abi: EvvmABI,
        address: evvmAddress,
        functionName: "getEvvmID",
        args: [],
      });
      setEvvmID(_id);

      const _stakingAdd: any = await readContract(config, {
        abi: EvvmABI,
        address: evvmAddress,
        functionName: "getStakingContractAddress",
        args: [],
      });
      setStakingAddress(_stakingAdd);

      const _nsAdd: any = await readContract(config, {
        abi: EvvmABI,
        address: evvmAddress,
        functionName: "getNameServiceAddress",
        args: [],
      });

      setNameserviceAddress(_nsAdd);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return {
    loading,
    evvmID,
    stakingAddress,
    nameserviceAddress,
  };
};
