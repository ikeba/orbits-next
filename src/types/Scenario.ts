import { ResourceName } from "./Resource";

export interface GameScenario {
  id: string;
  name: string;
  description: string;
  setup: () => void | Promise<void>;
  initialResources?: Partial<Record<ResourceName, number>>;
  startingCredits?: number;
}
