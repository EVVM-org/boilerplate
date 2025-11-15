"use client";

import { DUMMY_ACCOUNT, ETH_TOKEN, MATE_TOKEN } from "@/lib/evvm/constants";
import { useAccount } from "wagmi";
import { Input } from "./ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "./ui/select";
import { usePayments } from "@/hooks/usePayments";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

const tokens: { name: string; value: `0x${string}` }[] = [
  {
    name: "MATE",
    value: MATE_TOKEN,
  },
  {
    name: "ETH",
    value: ETH_TOKEN,
  },
];

interface IProps {
  onPayment: () => void;
}

export const Pay: React.FC<IProps> = ({ onPayment }) => {
  const { isConnected, address } = useAccount();
  const [amount, setAmount] = useState("10000000");
  const [token, setToken] = useState<`0x${string}`>(tokens[0].value);
  const { pay, loading } = usePayments();

  const shortAcc: string = useMemo(() => {
    const firstPart = DUMMY_ACCOUNT.slice(0, 4);
    const secondPart = DUMMY_ACCOUNT.slice(
      DUMMY_ACCOUNT.length - 6,
      DUMMY_ACCOUNT.length,
    );
    return `${firstPart}...${secondPart}`;
  }, [DUMMY_ACCOUNT]);

  const onExecute = async () => {
    await pay(DUMMY_ACCOUNT, token, BigInt(amount), 0n);
    onPayment();
  };

  if (!isConnected || !address) return null;

  return (
    <div className="flex flex-wrap text-center items-center justify-center align-middle gap-3 bg-secondary rounded-xl p-3">
      <p className="text-xl">Pay</p>
      <Input
        type="number"
        className="w-[180px]"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Select
        onValueChange={(v) => setToken(v as `0x${string}`)}
        defaultValue={token}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Token" />
        </SelectTrigger>
        <SelectContent>
          {tokens.map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xl">to</p>
      <p className="text-xl">{shortAcc}</p>
      <Button className="cursor-pointer" onClick={onExecute} disabled={loading}>
        {loading ? <Spinner /> : "Execute"}
      </Button>
    </div>
  );
};
