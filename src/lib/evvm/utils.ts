import { EvvmABI } from "@evvm/viem-signature-library";
import { config, evvmAddress } from "@/config";
import { readContract } from "@wagmi/core";

/**
 * Retrieves the `token` balance of the given `user`
 */
export const getBalance = async (
  user: string,
  token: string,
): Promise<bigint> => {
  const result = await readContract(config, {
    abi: EvvmABI,
    address: evvmAddress,
    functionName: "getBalance",
    args: [user, token],
  });

  return result as bigint;
};

/**
 *  Checks if a specific async nonce has been used by a user
 */
export const isValidAsyncNonce = async (
  user: `0x${string}`,
  nonce: bigint,
): Promise<boolean> => {
  const result = await readContract(config, {
    abi: EvvmABI,
    address: evvmAddress,
    functionName: "getIfUsedAsyncNonce",
    args: [user, nonce],
  });

  return result as boolean;
};
