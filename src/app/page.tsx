import { Balances } from "@/components/Balances";
import { EvvmInfo } from "@/components/EvvmInfo";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="flex w-[60%] mx-auto gap-2">
        <EvvmInfo />
        <Balances />
      </div>
    </main>
  );
}
