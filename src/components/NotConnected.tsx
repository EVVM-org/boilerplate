import { IconAlertCircle } from "@tabler/icons-react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "./ui/empty";
import { ConnectButton } from "./ConnectButton";

export const NotConected = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia className="rounded-full" variant="default">
          <IconAlertCircle />
        </EmptyMedia>
        <EmptyTitle>You are not connected</EmptyTitle>
        <EmptyDescription>Connect a wallet to continue</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <ConnectButton />
      </EmptyContent>
    </Empty>
  );
};
