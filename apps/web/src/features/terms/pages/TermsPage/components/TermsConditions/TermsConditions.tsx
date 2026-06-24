/* eslint-disable react/no-unescaped-entities */
import { Heading, Highlight } from "@/components/ui";
import {
  TermsList,
  TermsNote,
  TermsSection,
} from "@/features/terms/components";
import { EDITOR } from "@/features/terms/constant/editor";
import styles from "./TermsConditions.module.css";

/**
 * Bloc « Conditions Générales d'Utilisation » de la page légale.
 *
 * Affiche l'intégralité des CGU structurées en sections numérotées (1 à 8),
 * avec sous-sections imbriquées pour l'article 5 (contenu utilisateur).
 * Les métadonnées de l'éditeur (`EDITOR`) sont injectées dynamiquement
 * dans le texte via le composant `Highlight`.
 *
 * @remarks
 * Ce composant est purement déclaratif : aucun état, aucun effet.
 * Les sections sont rendues via `TermsSection`, qui gère le niveau
 * de titre (`h2` par défaut, `h3` pour les sous-sections).
 *
 * @example
 * <TermsConditions />
 */
export function TermsConditions() {
  return (
    <div className={styles.document}>
      {/* ── Titre du bloc CGU ── */}
      <Heading
        as="h2"
        size="lg"
        align="center"
        className={styles.documentTitle}
      >
        Conditions Générales d'Utilisation
      </Heading>

      {/* ── 1. Présentation de l'application et de l'éditeur ── */}
      <TermsSection title="1. Présentation">
        <Highlight>{EDITOR.appName}</Highlight> (ci-après « l'Application ») est
        une application web progressive (PWA) permettant à ses utilisateurs de
        créer, partager et organiser des recettes de cuisine, et de planifier
        leurs repas. L'Application est développée et exploitée par{" "}
        <Highlight>{EDITOR.name}</Highlight>, particulier, domicilié en France
        (ci-après « l'Éditeur »).
        <br />
        <br />
        Contact : <Highlight>{EDITOR.email}</Highlight>
        <br />
        Site web : <Highlight>{EDITOR.website}</Highlight>
      </TermsSection>

      {/* ── 2. Acceptation et mise à jour des conditions ── */}
      <TermsSection title="2. Acceptation des conditions">
        L'accès et l'utilisation de l'Application impliquent l'acceptation
        pleine et entière des présentes conditions. Si vous n'acceptez pas ces
        conditions, veuillez ne pas utiliser l'Application.
        <br />
        <br />
        Ces conditions peuvent être mises à jour à tout moment. Les utilisateurs
        seront informés des modifications par tout moyen approprié (notification
        dans l'application, email). L'utilisation continue de l'Application
        après modification vaut acceptation des nouvelles conditions.
      </TermsSection>

      {/* ── 3. Accès gratuit, droit de suspension, avertissement bêta ── */}
      <TermsSection title="3. Accès à l'Application">
        L'Application est accessible gratuitement à toute personne disposant
        d'un accès à internet. L'Éditeur se réserve le droit de suspendre,
        modifier ou interrompre l'accès à tout ou partie de l'Application, à
        tout moment, sans préavis ni indemnité.
        <br />
        <br />
        L'Application est actuellement en phase <Highlight>bêta</Highlight>. Des
        interruptions, bugs ou pertes de données peuvent survenir. L'Éditeur ne
        saurait être tenu responsable des dommages résultant de ces instabilités
        inhérentes à cette phase de développement.
      </TermsSection>

      {/* ── 4. Création de compte et confidentialité des identifiants ── */}
      <TermsSection title="4. Création de compte">
        Pour accéder aux fonctionnalités de l'Application, l'utilisateur doit
        créer un compte en fournissant :
        <TermsList>
          <li>Une adresse e-mail valide</li>
          <li>Un nom d'utilisateur</li>
          <li>Un mot de passe</li>
        </TermsList>
        L'utilisateur s'engage à fournir des informations exactes et à maintenir
        la confidentialité de ses identifiants. Tout accès via les identifiants
        d'un compte est réputé émaner du titulaire du compte. L'Éditeur se
        réserve le droit de supprimer tout compte sans préavis en cas de
        violation des présentes conditions.
      </TermsSection>

      {/* ── 5. Contenu utilisateur : droits, interdits, modération ── */}
      <TermsSection title="5. Contenu publié par les utilisateurs">
        {/* ── 5.1 Licence accordée à l'éditeur sur les recettes publiées ── */}
        <TermsSection title="5.1 Recettes et contenus" level="h3">
          Les recettes publiées sur <Highlight>{EDITOR.appName}</Highlight> sont
          accessibles publiquement. En publiant du contenu, l'utilisateur :
          <TermsList>
            <li>
              Certifie être l'auteur du contenu ou disposer des droits
              nécessaires à sa publication
            </li>
            <li>
              Accorde à l'Éditeur une licence non exclusive, gratuite, mondiale,
              pour afficher et diffuser ce contenu dans le cadre du
              fonctionnement de l'Application
            </li>
            <li>Reste seul responsable du contenu publié</li>
          </TermsList>
        </TermsSection>

        {/* ── 5.2 Types de contenus interdits sur la plateforme ── */}
        <TermsSection title="5.2 Contenu interdit" level="h3">
          Il est interdit de publier tout contenu :
          <TermsList>
            <li>
              Portant atteinte aux droits de tiers (droits d'auteur, marques,
              vie privée)
            </li>
            <li>
              À caractère illicite, diffamatoire, obscène, violent ou
              discriminatoire
            </li>
            <li>Constituant du spam ou de la publicité non sollicitée</li>
            <li>
              Copié mot pour mot depuis d'autres sources sans en détenir les
              droits
            </li>
          </TermsList>
          <TermsNote>
            Note sur les recettes : les listes d'ingrédients et techniques
            culinaires ne sont pas protégeables par le droit d'auteur. En
            revanche, la rédaction des étapes de préparation l'est.
            L'utilisateur s'engage à rédiger les étapes dans ses propres mots.
          </TermsNote>
        </TermsSection>

        {/* ── 5.3 Droit de suppression de contenu par l'éditeur ── */}
        <TermsSection title="5.3 Modération" level="h3">
          L'Éditeur se réserve le droit de supprimer tout contenu qui violerait
          les présentes conditions, sans préavis ni justification.
        </TermsSection>
      </TermsSection>

      {/* ── 6. Droits sur l'interface, le code et les assets propriétaires ── */}
      <TermsSection title="6. Propriété intellectuelle">
        L'Application, son interface, son code source, son logo et ses contenus
        propres (hors recettes utilisateurs) sont la propriété exclusive de
        l'Éditeur et sont protégés par les lois françaises et internationales
        relatives à la propriété intellectuelle. Toute reproduction,
        représentation ou exploitation non autorisée est strictement interdite.
      </TermsSection>

      {/* ── 7. Exclusions de garantie et avertissement allergènes ── */}
      <TermsSection title="7. Limitation de responsabilité">
        L'Application est fournie « en l'état », sans garantie d'aucune sorte.
        L'Éditeur ne saurait être tenu responsable :
        <TermsList>
          <li>
            De l'exactitude, l'exhaustivité ou la pertinence des recettes
            publiées par les utilisateurs
          </li>
          <li>
            Des dommages directs ou indirects résultant de l'utilisation ou de
            l'impossibilité d'utiliser l'Application
          </li>
          <li>De la perte de données</li>
          <li>
            Des allergènes ou effets sur la santé liés aux recettes publiées
          </li>
        </TermsList>
        <TermsNote>
          <Highlight>Avertissement allergènes</Highlight> : les recettes
          publiées sur {EDITOR.appName} sont fournies par des utilisateurs non
          professionnels. Elles peuvent contenir des allergènes non mentionnés.
          L'Éditeur ne saurait être tenu responsable de toute réaction
          allergique ou problème de santé lié à la préparation ou la
          consommation de recettes trouvées sur l'Application.
        </TermsNote>
      </TermsSection>

      {/* ── 8. Juridiction applicable en cas de litige ── */}
      <TermsSection title="8. Droit applicable">
        Les présentes conditions sont régies par le droit français. En cas de
        litige, les tribunaux français seront seuls compétents.
      </TermsSection>
    </div>
  );
}
