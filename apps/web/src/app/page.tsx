import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <h1 className={styles.title}>LeFrigo</h1>

        <p className={styles.subtitle}>
          Monorepo SaaS Next.js + Express + Prisma
        </p>

        <div className={styles.status}>
          <div className={styles.badge}>
            Frontend : Ready
          </div>

          <div className={styles.badge}>
            API : Pending
          </div>

          <div className={styles.badge}>
            Database : Pending
          </div>
        </div>
      </section>
    </main>
  );
}