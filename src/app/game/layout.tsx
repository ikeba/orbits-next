import GameNavigation from "@/components/game/GameNavigation";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="tw-h-full tw-grid tw-grid-cols-[240px_1fr]">
      <aside>
        <GameNavigation />
      </aside>
      <div className="tw-p-4">{children}</div>
    </div>
  );
}
