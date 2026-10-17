import generated from "./recommendations.generated.json";
import type { Recommendation } from "./recommendations.types";

export const recommendations: Recommendation[] = generated as Recommendation[];
