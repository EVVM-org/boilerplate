import { ConnectButton } from "./ConnectButton";
import { ModeToggle } from "./ui/theme-toggle";
import { Avatar, AvatarImage } from "./ui/avatar";

export const Navbar = () => {
  return (
    <nav className="flex justify-around h-auto w-full p-3 sticky top-0">
      <Avatar>
        <AvatarImage src="/evvm.svg" alt="EVVM logo" />
      </Avatar>
      <div className="flex">
        <ConnectButton />
        <div className="ms-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
