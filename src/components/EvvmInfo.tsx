"use client";

import { useEvvm } from "@/hooks/useEvvm";
import { Spinner } from "./ui/spinner";
import { evvmAddress } from "@/config";

export const EvvmInfo = () => {
  const { loading, evvmID } = useEvvm();

  return (
    <div className="bg-secondary rounded-xl p-3">
      <h2 className="text-xl">EVVM Info</h2>

      <p>EVVM Address: {evvmAddress}</p>

      <p>
        EVVM ID: {loading ? <Spinner className="inline" /> : evvmID?.toString()}
      </p>
    </div>
  );
};
