"use client";

import { config, evvmAddress } from "@/config";
import { EvvmABI, EVVMSignatureBuilder } from "@evvm/viem-signature-library";
import {
  getTransactionReceipt,
  getWalletClient,
  readContract,
  writeContract,
} from "@wagmi/core";
import { useAccount } from "wagmi";
import { useEffect, useMemo, useState } from "react";
import { useEvvm } from "./useEvvm";
import { isValidAsyncNonce } from "@/lib/evvm/utils";

type HexString = `0x${string}`;

export const usePayments = () => {
  const { evvmID, loading: evvmLoading } = useEvvm();

  const [loading, setLoading] = useState<boolean>(true);
  const [currentSyncNonce, setCurrentSyncNonce] = useState<
    bigint | undefined
  >();
  const [executor, setExecutor] = useState<HexString>(
    "0x0000000000000000000000000000000000000000",
  );

  const account = useAccount();
  const signer = useMemo(() => account.address, [account]);

  useEffect(() => {
    if (evvmLoading) return;
    _fetchNextCurrentSyncNonce();
  }, [evvmLoading]);

  /**
   * Keeps track of the next available sync nonce to be used
   */
  const _fetchNextCurrentSyncNonce = async () => {
    if (!signer) return;
    setLoading(true);

    try {
      const _nonce = await readContract(config, {
        abi: EvvmABI,
        address: evvmAddress,
        functionName: "getNextCurrentSyncNonce",
        args: [signer],
      });

	  console.log({ _nonce })

      setCurrentSyncNonce(_nonce as bigint);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };

  /**
   * Performs a pay transaction
   */
  const pay = async (
    to: HexString,
    token: HexString,
    amount: bigint,
    priorityFee: bigint,
    asyncNonce?: bigint,
  ) => {
    if (!signer || currentSyncNonce === undefined || evvmID === undefined)
      return;
    setLoading(true);

    const signatureBuilder = new EVVMSignatureBuilder(
      await getWalletClient(config),
      account as any,
    );

    let nonce = currentSyncNonce;
    let priorityFlag = false;

    // assert that the provided async nonce is valid
    if (asyncNonce) {
      if (!(await isValidAsyncNonce(signer, asyncNonce))) {
        alert("Invalid nonce provided");
        setLoading(false);
        return;
      }
      nonce = asyncNonce;
      priorityFlag = true;
    }

    // create signature
    const signature: HexString = await signatureBuilder.signPay(
      evvmID,
      to,
      token,
      amount,
      priorityFee,
      nonce,
      priorityFlag,
      executor,
    );

    // execute payment
    const txHash = await writeContract(config, {
      abi: EvvmABI,
      address: evvmAddress,
      functionName: "pay",
      args: [
        signer,
        to,
        "",
        token,
        amount,
        priorityFee,
        nonce,
        priorityFlag,
        executor,
        signature,
      ],
    });

    const _res = await getTransactionReceipt(config, { hash: txHash });
	if(_res.status =='success') setCurrentSyncNonce(curr => curr! + 1n)

    setLoading(false);
  };

  return {
    // state
    currentSyncNonce,
    signer,
    loading,

    // methods
    setExecutor,
    pay,
  };
};
