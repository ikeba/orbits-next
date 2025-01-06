import FlexWrap from "@/components/shared/FlexWrap";
import { Button, Input } from "@mantine/core";
import { IconCaretLeftFilled, IconCaretRightFilled } from "@tabler/icons-react";

interface ResourceTradeRowProps {
  name: string;
  sourceAmount: number;
  destinationAmount: number;
  sellPrice: number;
  buyPrice: number;
  onTransferToSource: (amount: number) => void;
  onTransferToDestination: (amount: number) => void;
}

export default function ResourceTradeRow({
  name,
  sourceAmount,
  destinationAmount,
  sellPrice,
  buyPrice,
  onTransferToSource,
  onTransferToDestination,
}: ResourceTradeRowProps) {
  return (
    <FlexWrap>
      <Input readOnly={true} value={sourceAmount} />
      <Button
        leftSection={<IconCaretLeftFilled />}
        onClick={() => onTransferToSource(1)}
        disabled={destinationAmount === 0}
      >
        {sellPrice}
      </Button>
      <div className="tw-w-[100px] tw-text-center">{name}</div>
      <Button
        rightSection={<IconCaretRightFilled />}
        onClick={() => onTransferToDestination(1)}
        disabled={sourceAmount === 0}
      >
        {buyPrice}
      </Button>
      <Input readOnly={true} value={destinationAmount} />
    </FlexWrap>
  );
}
