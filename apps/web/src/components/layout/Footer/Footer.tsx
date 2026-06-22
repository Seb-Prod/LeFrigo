"use client";

import Link from "next/link";
import { Logo, Text, Highlight, SocialLink } from "@/components/ui";
import styles from "./Footer.module.css";
import { Heading } from "../../ui/Heading/Heading";
import { NAVIGATION } from "@/lib/navigation/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* ── Footer principal ───────────────────────────────── */}
      <footer className={styles.footer}>
        {/* ── Présentation de l'application ───────────────── */}
        <section className={styles.presentation}>
          <Logo display="both" />

          <Text align="justify">
            Conçue pour les familles et colocations,{" "}
            <Highlight>leFrigo</Highlight> centralise la gestion des repas
            collaboratifs : recettes partagées, planning hebdomadaire, votes
            entre membres et génération automatique des listes de courses.
          </Text>
        </section>

        {/* Liens utiles */}

        <section className={styles.section}>
          <Heading>Liens utiles</Heading>

          <nav className={styles.links}>
            <ul>
              {NAVIGATION.map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.links}>
                      <Icon />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </section>

        {/* ── Liens externes ───────────────────────────────── */}
        {/* Développeur */}

        <section className={styles.section}>
          <Heading>Développeur</Heading>

          <Text>Sébatien Drillaud</Text>
          
          <nav className={styles.socialLinks}>
            <SocialLink social="gitHub" />
            <SocialLink social="linkedin" />
            <SocialLink social="youtube" />
          </nav>
          
        </section>
      </footer>

      {/* ── Copyright ─────────────────────────────────────── */}
      <div className={styles.bottom}>
        <Logo variant="dev" display="both" />
        <Text align="center">
          © {currentYear} LeFrigo & Seb-Prod — Tous droits réservés.
        </Text>
      </div>
    </>
  );
}
