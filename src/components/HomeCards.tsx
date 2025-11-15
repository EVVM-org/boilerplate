"use client";

import { Balances } from "@/components/Balances";
import { EvvmInfo } from "@/components/EvvmInfo";
import { useAccount } from "wagmi";
import { NotConected } from "./NotConnected";
import { Pay } from "./Pay";
import { DUMMY_ACCOUNT } from "@/lib/evvm/constants";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import { useCallback, useState } from "react";

export const HomeCards = () => {
  const { isConnected, isConnecting, address } = useAccount();
  const [redrawKey, setRedrawKey] = useState<number>(0);

  const onPayment = useCallback(() => {
    setRedrawKey((prev) => prev + 1);
  }, []);

  if (!isConnected || !address) return <NotConected loading={isConnecting} />;

  return (
    <>
      <div className="flex flex-wrap w-[60%] mx-auto gap-3">
        <div className="w-full overflow-hidden shrink-0">
          <EvvmInfo />
        </div>
        <div className="w-full overflow-hidden sm:w-[calc(50%-0.375rem)] shrink-0">
          <Balances key={redrawKey} account={address} />
        </div>
        <div className="w-full overflow-hidden sm:w-[calc(50%-0.375rem)] shrink-0">
          <Balances key={redrawKey} account={DUMMY_ACCOUNT} />
        </div>
        <div className="w-full overflow-hidden shrink-0">
          <Pay onPayment={onPayment} />
        </div>
      </div>

      <div className="text-center mt-6">
        <Link
          href="https://evvm.info"
          target="_blank"
          className="text-gray-500 hover:text-primary cursor-pointer"
        >
          Learn more about the EVVM <IconArrowUpRight className="inline" />
        </Link>
      </div>
    </>
  );
};
