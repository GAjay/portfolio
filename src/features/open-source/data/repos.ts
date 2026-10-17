import type { OpenSourceRepo } from "./repos.types";
import generated from "./repos.generated.json";

export const openSourceRepos: OpenSourceRepo[] = generated as OpenSourceRepo[];
