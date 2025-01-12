import { Button } from "@mantine/core";
import { Menu } from "@mantine/core";

import { Station } from "@/types/Station";

export default function TravelMenu({
  targets,
  onSelect,
  disabled,
}: {
  targets: Station[];
  onSelect: (id: string) => void;
  disabled?: boolean;
}) {
  return (
    <Menu width={200}>
      <Menu.Target>
        <Button variant="outline" size="xs" radius="xs" disabled={disabled}>
          Travel
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Stations</Menu.Label>
        {targets.map((station) => (
          <Menu.Item key={station.id} onClick={() => onSelect(station.id)}>
            {station.name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
