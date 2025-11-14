"use client";

import { Balances } from "@/components/Balances";
import { EvvmInfo } from "@/components/EvvmInfo";
import { useAccount } from "wagmi";
import { NotConected } from "./NotConnected";
import { Pay } from "./Pay";
import { DUMMY_ACCOUNT } from "@/lib/evvm/constants";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";

export const HomeCards = () => {
  const account = useAccount();

  if (!account.isConnected || !account.address) return <NotConected />;

  return (
    <>
      <div className="flex flex-wrap w-[60%] mx-auto gap-3">
        <div className="w-full overflow-hidden shrink-0">
          <EvvmInfo />
        </div>
        <div className="w-full overflow-hidden sm:w-[calc(50%-0.375rem)] shrink-0">
          <Balances account={account.address} />
        </div>
        <div className="w-full overflow-hidden sm:w-[calc(50%-0.375rem)] shrink-0">
          <Balances account={DUMMY_ACCOUNT} />
        </div>
        <div className="w-full overflow-hidden shrink-0">
          <Pay />
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
