/**
 * Audit flow — the multi-step guided questionnaire.
 *
 * One question at a time, progress bar, Framer Motion transitions,
 * per-step validation, back navigation, and analytics events.
 * On completion, collects answers and routes to the report card.
 */

"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ProgressBar, PrimaryButton, GhostButton } from "@/components/ui/Primitives";
import { RoleStep, validateRoleStep, type RoleStepValue } from "./steps/RoleStep";
import { TaskStep, validateTaskStep } from "./steps/TaskStep";
import { HoursStep, validateHoursStep } from "./steps/HoursStep";
import { ToolsStep, validateToolsStep } from "./steps/ToolsStep";
import { OutputStep, validateOutputStep } from "./steps/OutputStep";
import { copy } from "@/content/copy";
import { track } from "@/lib/analytics";
import type { AuditInput } from "@/lib/engine";

const STEP_KEYS = ["role", "task", "hours", "tools", "output"] as const;
type StepKey = (typeof STEP_KEYS)[number];

interface AuditState {
  role: RoleStepValue;
  task: string;
  hours: number;
  tools: string[];
  output: string;
}

const TOTAL_STEPS = STEP_KEYS.length;

export default function AuditFlow() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const [state, setState] = useState<AuditState>({
    role: { role: "", industry: "" },
    task: "",
    hours: 5,
    tools: [],
    output: "",
  });

  const [errors, setErrors] = useState<Record<StepKey, string | undefined>>(
    {} as Record<StepKey, string | undefined>,
  );

  const currentKey = STEP_KEYS[stepIndex] as StepKey;
  const progress = useMemo(
    () => Math.round(((stepIndex + (started ? 1 : 0)) / (TOTAL_STEPS + 1)) * 100),
    [stepIndex, started],
  );

  const begin = useCallback(() => {
    setStarted(true);
    setStepIndex(0);
    setDirection(1);
    track("audit_started");
  }, []);

  /** Validate the step currently shown; return error string or undefined. */
  const validateCurrent = useCallback(
    (key: StepKey): string | undefined => {
      switch (key) {
        case "role":
          return validateRoleStep(state.role);
        case "task":
          return validateTaskStep(state.task);
        case "hours":
          return validateHoursStep(state.hours);
        case "tools":
          return validateToolsStep(state.tools);
        case "output":
          return validateOutputStep(state.output);
      }
    },
    [state],
  );

  /** Build the final AuditInput and route to the report card. */
  const complete = useCallback(() => {
    const input: AuditInput = {
      role: state.role.role.trim(),
      industry: state.role.industry.trim(),
      taskDescription: state.task.trim(),
      hoursPerWeek: state.hours,
      tools: state.tools,
      outputDescription: state.output.trim(),
    };
    track("step_completed", { step: "output", stepNumber: TOTAL_STEPS });
    track("report_generated", { hoursPerWeek: input.hoursPerWeek });
    // Pass answers as individual query params so the report route (XRO-16)
    // can read them and the URL stays human-readable / shareable.
    const params = new URLSearchParams({
      role: input.role,
      industry: input.industry,
      task: input.taskDescription,
      hours: String(input.hoursPerWeek),
      tools: input.tools.join(","),
      output: input.outputDescription,
    });
    router.push(`/report?${params.toString()}`);
  }, [router, state]);

  const handleNext = useCallback(() => {
    const error = validateCurrent(currentKey);
    if (error) {
      setErrors((prev) => ({ ...prev, [currentKey]: error }));
      return;
    }
    // Clear error + fire step_completed event.
    setErrors((prev) => ({ ...prev, [currentKey]: undefined }));
    track("step_completed", { step: currentKey, stepNumber: stepIndex + 1 });

    if (stepIndex < TOTAL_STEPS - 1) {
      setDirection(1);
      setStepIndex((i) => i + 1);
    } else {
      void complete();
    }
  }, [complete, currentKey, stepIndex, validateCurrent]);

  const handleBack = useCallback(() => {
    setErrors((prev) => ({ ...prev, [currentKey]: undefined }));
    if (stepIndex === 0) {
      setStarted(false);
      return;
    }
    setDirection(-1);
    setStepIndex((i) => i - 1);
  }, [currentKey, stepIndex]);

  // --- Pre-start intro screen -----------------------------------------------
  if (!started) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center text-center">
        <span className="mb-6 inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          {copy.hero.badge}
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          {copy.hero.title}
        </h2>
        <p className="mt-4 max-w-md text-lg text-zinc-600 dark:text-zinc-400">
          {copy.hero.subtitle}
        </p>
        <div className="mt-8">
          <PrimaryButton onClick={begin}>{copy.hero.cta}</PrimaryButton>
        </div>
        <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-600">
          {TOTAL_STEPS} questions · about 60 seconds · no signup
        </p>
      </div>
    );
  }

  // --- Active step screen ----------------------------------------------------
  const stepCopy = copy.audit.steps[currentKey];
  const question =
    "question" in stepCopy ? stepCopy.question : "Question";
  const help = "help" in stepCopy ? stepCopy.help : undefined;
  const progressLabel = copy.audit.progressLabel
    .replace("{current}", String(stepIndex + 1))
    .replace("{total}", String(TOTAL_STEPS));

  const isLast = stepIndex === TOTAL_STEPS - 1;

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-xl flex-col">
      {/* Progress header */}
      <div className="pt-6">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <span>{progressLabel}</span>
          <span className="tabular-nums">{progress}%</span>
        </div>
        <ProgressBar value={progress} />
      </div>

      {/* Question + animated step body */}
      <div className="flex flex-1 flex-col justify-center py-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentKey}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
              {question}
            </h2>
            {help && (
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                {help}
              </p>
            )}
            <div className="mt-6">
              <StepBody
                stepKey={currentKey}
                state={state}
                setState={setState}
                error={errors[currentKey]}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav buttons */}
      <div className="flex items-center justify-between gap-3 pb-8">
        <GhostButton onClick={handleBack}>
          {stepIndex === 0 ? copy.audit.startLabel : copy.audit.backLabel}
        </GhostButton>
        <PrimaryButton onClick={handleNext}>
          {isLast ? copy.audit.completeLabel : copy.audit.nextLabel}
        </PrimaryButton>
      </div>
    </div>
  );
}

/**
 * Renders the active step body, wiring the right slice of state to its
 * onChange handler.
 */
function StepBody({
  stepKey,
  state,
  setState,
  error,
}: {
  stepKey: StepKey;
  state: AuditState;
  setState: React.Dispatch<React.SetStateAction<AuditState>>;
  error?: string;
}) {
  switch (stepKey) {
    case "role":
      return (
        <RoleStep
          value={state.role}
          onChange={(role) => setState((s) => ({ ...s, role }))}
          error={error}
        />
      );
    case "task":
      return (
        <TaskStep
          value={state.task}
          onChange={(task) => setState((s) => ({ ...s, task }))}
          error={error}
        />
      );
    case "hours":
      return (
        <HoursStep
          value={state.hours}
          onChange={(hours) => setState((s) => ({ ...s, hours }))}
          error={error}
        />
      );
    case "tools":
      return (
        <ToolsStep
          value={state.tools}
          onChange={(tools) => setState((s) => ({ ...s, tools }))}
          error={error}
        />
      );
    case "output":
      return (
        <OutputStep
          value={state.output}
          onChange={(output) => setState((s) => ({ ...s, output }))}
          error={error}
        />
      );
  }
}
