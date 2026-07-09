/* ── Couleurs sémantiques ─────────────────────────────────── */

export type Color =
  | "primary"
  | "accent"
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger";

/* ── Variantes communes ───────────────────────────────────── */

export type CommonVariant =
  | "soft"
  | "outline";

/* ── Button ───────────────────────────────────────────────── */

export type ButtonVariant =
  | CommonVariant
  | "solid"
  | "ghost";

/* ── Input ────────────────────────────────────────────────── */

export type InputVariant =
  | CommonVariant
  | "filled"
  | "underlined"
  | "flushed";

/* ── Select ───────────────────────────────────────────────── */

export type SelectVariant = InputVariant;

/* ── Textarea ─────────────────────────────────────────────── */

export type TextareaVariant = InputVariant;



/* ── Variantes ────────────────────────────────────────────── */

export type Variant =
  | "solid"
  | "soft"
  | "ghost"
  | "outline";

/* ── Tailles ──────────────────────────────────────────────── */

export type Size =
  | "xs"
  | "sm"
  | "md"
  | "lg";

/* ── Alignements ──────────────────────────────────────────── */

export type Align =
  | "left"
  | "center"
  | "right";