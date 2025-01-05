import { Button } from "@mantine/core";

export default function UiButton({
  children,
  onClick,
  variant = "outline",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "outline" | "light" | "filled";
}) {
  return (
    <Button onClick={onClick} variant={variant}>
      {children}
    </Button>
  );
}
