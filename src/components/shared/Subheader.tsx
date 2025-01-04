import FlexWrap from "@/components/shared/FlexWrap";

export default function Subheader({ children }: { children: React.ReactNode }) {
  return (
    <FlexWrap
      direction="row"
      justify="space-between"
      align="center"
      className="tw-border-b tw-border-white tw-py-2 tw-px-4 tw-min-h-[51px]"
    >
      {children}
    </FlexWrap>
  );
}
