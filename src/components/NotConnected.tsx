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
import { Spinner } from "./ui/spinner";

interface IProps {
  loading: boolean;
}
export const NotConected: React.FC<IProps> = ({ loading }) => {
  if (loading)
    return (
      <div className="flex justify-center">
        <Spinner className="w-12 h-auto" />
      </div>
    );

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
