import Image from "next/image";
import { ConnectButton } from "./ConnectButton";
import { ModeToggle } from "./ui/theme-toggle";

export const Navbar = () => {
  return (
    <nav className="flex justify-around h-auto w-full p-3 sticky top-0">
      <Image
        className="rounded-full"
        src="/evvm.svg"
        alt="Evvm"
        width={32}
        height={32}
        priority
      />
      <div className="flex">
        <ConnectButton />
        <div className="ms-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
