"use client";

import { useState } from "react";
import type { Color, Size, Variant } from "@/components/types";
import { NavLink } from "@/components/ui";
import styles from "./NavLinkShowcase.module.css";
import { SizeSelector } from "../SizeSelector/SizeSelector";
import { ShowcaseSection } from "../ShowcaseSection/ShowcaseSection";
import { PropsTable } from "../PropsTable/PropsTable";

/* ── Configuration ─────────────────────────────────────────── */

const COLORS: Color[] = [
  "primary",
  "accent",
  "success",
  "warning",
  "danger",
  "info",
  "neutral",
];

const VARIANTS: Variant[] = ["solid", "soft", "ghost", "outline"];

/* ── Types ─────────────────────────────────────────────────── */

type NavLinkState = {
  id: string;
  label: string;
  activeStyle?: boolean;
};

/* ── États ────────────────────────────────────────────────── */

const STATES: NavLinkState[] = [
  {
    id: "default",
    label: "Default",
  },
  {
    id: "active",
    label: "Active",
    activeStyle: true,
  },
];

/* ── State Table ───────────────────────────────────────────── */

type NavLinkStateTableProps = {
  variant: Variant;
  size: Size;
};

type PropDefinition = {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
};

const PROPS: PropDefinition[] = [
  {
    name: "href",
    type: "string",
    description: "URL de destination du lien.",
  },
  {
    name: "label",
    type: "string",
    description: "Texte affiché dans le lien.",
  },
  {
    name: "activeStyle",
    type: "boolean",
    defaultValue: "false",
    description: "Force l'affichage du lien dans son état actif.",
  },
  {
    name: "color",
    type: "Color",
    defaultValue: '"primary"',
    description: "Définit la couleur sémantique du lien.",
  },
  {
    name: "variant",
    type: "Variant",
    defaultValue: '"solid"',
    description: "Définit le style visuel du lien.",
  },
  {
    name: "size",
    type: "Size",
    defaultValue: '"md"',
    description: "Définit la taille du lien.",
  },
];

function NavLinkStateTable({ variant, size }: NavLinkStateTableProps) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.stateHeader}>État</th>

            {COLORS.map((color) => (
              <th key={color} className={styles.colorHeader}>
                {color}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {STATES.map((state) => (
            <tr key={state.id}>
              <th className={styles.stateCell}>{state.label}</th>

              {COLORS.map((color) => (
                <td key={color} className={styles.componentCell}>
                  <NavLink
                    href="#"
                    label="NavLink"
                    color={color}
                    variant={variant}
                    size={size}
                    activeStyle={state.activeStyle}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Showcase ──────────────────────────────────────────────── */

/**
 * NavLinkShowcase
 *
 * Présente les différentes variantes, couleurs,
 * états et tailles disponibles pour le composant NavLink.
 */
export function NavLinkShowcase() {
  const [size, setSize] = useState<Size>("md");

  return (
    <div className={styles.showcase}>
      {/* ── Présentation ──────────────────────────────────── */}

      <header className={styles.header}>
        <h2 className={styles.heading}>
          NavLink
        </h2>

        <p className={styles.description}>
          Lien de navigation utilisé pour permettre à
          l'utilisateur de naviguer entre les différentes
          sections de l'application.
        </p>
      </header>

      {/* ── Props ─────────────────────────────────────────── */}

      <ShowcaseSection title="Props">
        <PropsTable props={PROPS} />
      </ShowcaseSection>

      {/* ── Size ──────────────────────────────────────────── */}

      <ShowcaseSection title="Taille">
        <SizeSelector
          value={size}
          onChange={setSize}
        />
      </ShowcaseSection>

      {/* ── Variants ──────────────────────────────────────── */}

      {VARIANTS.map((variant) => (
        <ShowcaseSection
          key={variant}
          title={variant}
        >
          <NavLinkStateTable
            variant={variant}
            size={size}
          />
        </ShowcaseSection>
      ))}
    </div>
  );
}
