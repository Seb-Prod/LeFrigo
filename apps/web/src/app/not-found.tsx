import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Oups, page inexistante</h1>
      <p>Cette page n&apos;existe pas encore ou a été déplacée.</p>
      <Link href="/">Retour à l&apos;accueil</Link>
    </main>
  );
}