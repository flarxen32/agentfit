/**
 * Engine barrel export.
 *
 * Re-exports the public API of the scoring engine so downstream code
 * can `import { classifyTask, estimateRoi } from "@/lib/engine"`.
 */

export {
  classifyTask,
  type AuditInput,
  type ClassificationResult,
  type FeasibilityBand,
} from "./classifier";

export { estimateRoi, type RoiBand, type RoiResult } from "./roi";
