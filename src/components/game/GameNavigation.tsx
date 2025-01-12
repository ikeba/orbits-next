import Link from "next/link";
import FlexWrap from "../shared/FlexWrap";
import { Button } from "@mantine/core";
import { usePathname } from "next/navigation";

export default function GameNavigation() {
  const pathname = usePathname();
  const linkClasses =
    "hover:tw-opacity-50 tw-cursor-pointer tw-transition-opacity tw-border-white tw-p-2";

  const isActiveLink = (path: string) => {
    return pathname === path;
  };

  return (
    <FlexWrap
      direction="row"
      className="tw-w-full tw-border-b tw-border-white tw-p-2 tw-gap-2"
    >
      <Link href="/game/fleet">
        <Button
          size="xs"
          variant={isActiveLink("/game/fleet") ? "filled" : "subtle"}
          className={linkClasses}
        >
          Fleet
        </Button>
      </Link>
      <Link href="/game/map">
        <Button
          size="xs"
          variant={isActiveLink("/game/map") ? "filled" : "subtle"}
          className={linkClasses}
        >
          Map
        </Button>
      </Link>
    </FlexWrap>
  );
}
