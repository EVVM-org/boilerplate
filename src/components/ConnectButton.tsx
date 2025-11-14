"use client";

import { useClientMounted } from "@/hooks/useClientMount";
import { AppKitButton, useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import { Button } from "./ui/button";

export const ConnectButton = () => {
  const { isConnected } = useAccount();
  const { open } = useAppKit();
  const isMounted = useClientMounted();

  if (!isMounted) {
    return null;
  }

  if (!isConnected)
    return <Button className="rounded-full cursor-pointer" onClick={() => open()}>Connect wallet</Button>;

  return (
    <div>
      <AppKitButton />
    </div>
  );
};
