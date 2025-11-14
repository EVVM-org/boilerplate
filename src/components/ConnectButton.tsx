"use client";

import { useClientMounted } from "@/hooks/useClientMount";

export const ConnectButton = () => {
  const isMounted = useClientMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <appkit-button />
    </div>
  );
};
