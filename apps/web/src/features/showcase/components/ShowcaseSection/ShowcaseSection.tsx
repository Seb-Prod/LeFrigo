import type { ReactNode } from "react";
import styles from "./ShowcaseSection.module.css";

type ShowcaseSectionProps = {
  title: string;
  children: ReactNode;
};

export function ShowcaseSection({
  title,
  children,
}: ShowcaseSectionProps) {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>
        {title}
      </h3>

      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
}