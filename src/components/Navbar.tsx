import Image from "next/image";
import { ConnectButton } from "./ConnectButton";

export const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "60%",
        margin: "8px auto",
        padding: "8px",
        boxShadow: "0px 2px 8px #CCCCCC",
        borderRadius: "24px",
      }}
    >
      <div className="flex">
        <Image
          className="rounded-full"
          src="/evvm.svg"
          alt="Evvm"
          width={32}
          height={32}
          priority
        />
        {/* <p className="ms-1 align-middle text-white">EVVM</p> */}
      </div>
      <ConnectButton />
    </nav>
  );
};
