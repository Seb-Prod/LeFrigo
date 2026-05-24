import { z } from "zod";

export function zodErrorsToRecord(error: z.ZodError): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  for (const issue of error.issues) {
    const field = issue.path[0];

    if (typeof field !== "string") continue;

    errors[field] ??= [];
    errors[field].push(issue.message);
  }

  return errors;
}
