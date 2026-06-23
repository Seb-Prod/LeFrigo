/* eslint-disable react/no-unescaped-entities */

import { Heading, Highlight, Logo, Surface, Text, TermsSection } from "@/components/ui";
import styles from "./TermsPage.module.css";

/* ── Constantes éditeur ─────────────────────────────────────── */

/** Informations de l'éditeur — à mettre à jour avant mise en production */
const EDITOR = {
  appName:  "LeFrigo",
  name:     "Sébastien Drillaud",
  email:    "sebastien.drillaud@gmail.com",
  website:  "lefrigo.fr",
  version:  "juin 2025",
  release:  "1.0 (beta)",
} as const;

/* ── Page ───────────────────────────────────────────────────── */

/**
 * Page légale combinant CGU et Politique de Confidentialité.
 *
 * Structure :
 * - En-tête avec logo et titre
 * - Bloc CGU (articles 1–8)
 * - Séparateur visuel
 * - Bloc Politique de confidentialité (articles 9–18)
 */
export default function TermsPage() {
  return (
    <Surface fullScreen>
      <div className={styles.page}>

        {/* ── En-tête ── */}
        <header className={styles.header}>
          <Logo display="both" />
          <Heading as="h1" size="md" align="center">
            Conditions Générales d'Utilisation
            <br />& Politique de Confidentialité
          </Heading>
          <Text size="sm" align="center" className={styles.meta}>
            <Highlight>{EDITOR.appName}</Highlight> — Dernière mise à jour :{" "}
            <Highlight>{EDITOR.version}</Highlight> — Version{" "}
            <Highlight>{EDITOR.release}</Highlight>
          </Text>
        </header>

        {/* ── Conditions Générales d'Utilisation ── */}
        <div className={styles.document}>
          <Heading as="h2" size="lg" className={styles.documentTitle}>
            Conditions Générales d'Utilisation
          </Heading>

          <TermsSection title="1. Présentation">
            <Highlight>{EDITOR.appName}</Highlight> (ci-après « l'Application ») est une
            application web progressive (PWA) permettant à ses utilisateurs de créer,
            partager et organiser des recettes de cuisine, et de planifier leurs repas.
            L'Application est développée et exploitée par{" "}
            <Highlight>{EDITOR.name}</Highlight>, particulier, domicilié en France
            (ci-après « l'Éditeur »).
            <br /><br />
            Contact : <Highlight>{EDITOR.email}</Highlight>
            <br />
            Site web : <Highlight>{EDITOR.website}</Highlight>
          </TermsSection>

          <TermsSection title="2. Acceptation des conditions">
            L'accès et l'utilisation de l'Application impliquent l'acceptation pleine
            et entière des présentes conditions. Si vous n'acceptez pas ces conditions,
            veuillez ne pas utiliser l'Application.
            <br /><br />
            Ces conditions peuvent être mises à jour à tout moment. Les utilisateurs
            seront informés des modifications par tout moyen approprié (notification
            dans l'application, email). L'utilisation continue de l'Application après
            modification vaut acceptation des nouvelles conditions.
          </TermsSection>

          <TermsSection title="3. Accès à l'Application">
            L'Application est accessible gratuitement à toute personne disposant d'un
            accès à internet. L'Éditeur se réserve le droit de suspendre, modifier ou
            interrompre l'accès à tout ou partie de l'Application, à tout moment, sans
            préavis ni indemnité.
            <br /><br />
            L'Application est actuellement en phase <Highlight>bêta</Highlight>. Des
            interruptions, bugs ou pertes de données peuvent survenir. L'Éditeur ne
            saurait être tenu responsable des dommages résultant de ces instabilités
            inhérentes à cette phase de développement.
          </TermsSection>

          <TermsSection title="4. Création de compte">
            Pour accéder aux fonctionnalités de l'Application, l'utilisateur doit
            créer un compte en fournissant :
            <ul>
              <li>Une adresse e-mail valide</li>
              <li>Un nom d'utilisateur</li>
              <li>Un mot de passe</li>
            </ul>
            L'utilisateur s'engage à fournir des informations exactes et à maintenir
            la confidentialité de ses identifiants. Tout accès via les identifiants
            d'un compte est réputé émaner du titulaire du compte. L'Éditeur se réserve
            le droit de supprimer tout compte sans préavis en cas de violation des
            présentes conditions.
          </TermsSection>

          <TermsSection title="5. Contenu publié par les utilisateurs">

            <TermsSection title="5.1 Recettes et contenus" level="h3">
              Les recettes publiées sur <Highlight>{EDITOR.appName}</Highlight> sont
              accessibles publiquement. En publiant du contenu, l'utilisateur :
              <ul>
                <li>Certifie être l'auteur du contenu ou disposer des droits nécessaires à sa publication</li>
                <li>Accorde à l'Éditeur une licence non exclusive, gratuite, mondiale, pour afficher et diffuser ce contenu dans le cadre du fonctionnement de l'Application</li>
                <li>Reste seul responsable du contenu publié</li>
              </ul>
            </TermsSection>

            <TermsSection title="5.2 Contenu interdit" level="h3">
              Il est interdit de publier tout contenu :
              <ul>
                <li>Portant atteinte aux droits de tiers (droits d'auteur, marques, vie privée)</li>
                <li>À caractère illicite, diffamatoire, obscène, violent ou discriminatoire</li>
                <li>Constituant du spam ou de la publicité non sollicitée</li>
                <li>Copié mot pour mot depuis d'autres sources sans en détenir les droits</li>
              </ul>
              <br />
              Note sur les recettes : les listes d'ingrédients et techniques culinaires
              ne sont pas protégeables par le droit d'auteur. En revanche, la rédaction
              des étapes de préparation l'est. L'utilisateur s'engage à rédiger les
              étapes dans ses propres mots.
            </TermsSection>

            <TermsSection title="5.3 Modération" level="h3">
              L'Éditeur se réserve le droit de supprimer tout contenu qui violerait
              les présentes conditions, sans préavis ni justification.
            </TermsSection>

          </TermsSection>

          <TermsSection title="6. Propriété intellectuelle">
            L'Application, son interface, son code source, son logo et ses contenus
            propres (hors recettes utilisateurs) sont la propriété exclusive de
            l'Éditeur et sont protégés par les lois françaises et internationales
            relatives à la propriété intellectuelle. Toute reproduction, représentation
            ou exploitation non autorisée est strictement interdite.
          </TermsSection>

          <TermsSection title="7. Limitation de responsabilité">
            L'Application est fournie « en l'état », sans garantie d'aucune sorte.
            L'Éditeur ne saurait être tenu responsable :
            <ul>
              <li>De l'exactitude, l'exhaustivité ou la pertinence des recettes publiées par les utilisateurs</li>
              <li>Des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utiliser l'Application</li>
              <li>De la perte de données</li>
              <li>Des allergènes ou effets sur la santé liés aux recettes publiées</li>
            </ul>
            <br />
            <Highlight>Avertissement allergènes</Highlight> : les recettes publiées
            sur {EDITOR.appName} sont fournies par des utilisateurs non professionnels.
            Elles peuvent contenir des allergènes non mentionnés. L'Éditeur ne saurait
            être tenu responsable de toute réaction allergique ou problème de santé lié
            à la préparation ou la consommation de recettes trouvées sur l'Application.
          </TermsSection>

          <TermsSection title="8. Droit applicable">
            Les présentes conditions sont régies par le droit français. En cas de
            litige, les tribunaux français seront seuls compétents.
          </TermsSection>
        </div>

        {/* ── Séparateur entre les deux documents ── */}
        <hr className={styles.separator} />

        {/* ── Politique de confidentialité ── */}
        <div className={styles.document}>
          <Heading as="h2" size="lg" className={styles.documentTitle}>
            Politique de Confidentialité
          </Heading>
          <Text size="sm" className={styles.rgpdNote}>
            Conformément au Règlement Général sur la Protection des Données (RGPD)
          </Text>

          <TermsSection title="9. Responsable du traitement">
            Responsable : <Highlight>{EDITOR.name}</Highlight>
            <br />
            Contact : <Highlight>{EDITOR.email}</Highlight>
          </TermsSection>

          <TermsSection title="10. Données collectées">

            <TermsSection title="10.1 Données fournies lors de l'inscription" level="h3">
              <ul>
                <li><Highlight>Adresse e-mail</Highlight> — identification, vérification du compte, réinitialisation du mot de passe</li>
                <li><Highlight>Nom d'utilisateur</Highlight> — identification publique sur l'Application</li>
                <li><Highlight>Mot de passe (hashé)</Highlight> — authentification sécurisée</li>
              </ul>
            </TermsSection>

            <TermsSection title="10.2 Données collectées automatiquement" level="h3">
              <ul>
                <li><Highlight>User-Agent</Highlight> — gestion des sessions actives, sécurité</li>
                <li><Highlight>Date et heure de connexion</Highlight> — gestion des sessions, sécurité</li>
                <li><Highlight>Adresse IP</Highlight> — sécurité, protection contre les abus</li>
              </ul>
            </TermsSection>

            <TermsSection title="10.3 Données non collectées" level="h3">
              L'Application ne collecte pas de données de géolocalisation, de données
              de navigation à des fins publicitaires, ni de données sensibles (santé,
              origine, opinions politiques, etc.).
            </TermsSection>

          </TermsSection>

          <TermsSection title="11. Utilisation des e-mails">
            Les e-mails sont utilisés uniquement pour :
            <ul>
              <li>Vérifier l'adresse e-mail lors de l'inscription</li>
              <li>Réinitialiser le mot de passe à la demande de l'utilisateur</li>
            </ul>
            Aucun e-mail marketing ou newsletter n'est envoyé sans consentement explicite.
          </TermsSection>

          <TermsSection title="12. Durée de conservation">
            <ul>
              <li><Highlight>Données de compte</Highlight> — jusqu'à la suppression du compte par l'utilisateur</li>
              <li><Highlight>Tokens de session</Highlight> — 7 jours (expiration automatique)</li>
              <li><Highlight>Logs de connexion</Highlight> — 30 jours glissants</li>
              <li><Highlight>Liens de vérification / réinitialisation</Highlight> — 24 heures (expiration automatique)</li>
            </ul>
          </TermsSection>

          <TermsSection title="13. Hébergement des données">
            Les données sont hébergées au sein de l'Union Européenne. En cas de
            transfert hors UE, des garanties appropriées (clauses contractuelles
            types de la Commission européenne) seront mises en place.
          </TermsSection>

          <TermsSection title="14. Sécurité">
            L'Éditeur met en œuvre les mesures techniques suivantes pour protéger
            vos données :
            <ul>
              <li>Mots de passe hashés (bcrypt)</li>
              <li>Authentification par tokens JWT avec expiration</li>
              <li>Rotation des tokens de rafraîchissement</li>
              <li>Liaison des sessions au User-Agent</li>
              <li>Verrouillage de compte après tentatives échouées répétées</li>
            </ul>
          </TermsSection>

          <TermsSection title="15. Vos droits (RGPD)">
            Conformément au RGPD, vous disposez des droits suivants sur vos données :
            <ul>
              <li><Highlight>Accès</Highlight> — obtenir une copie de vos données personnelles</li>
              <li><Highlight>Rectification</Highlight> — corriger des données inexactes</li>
              <li><Highlight>Effacement</Highlight> — demander la suppression de votre compte et de vos données</li>
              <li><Highlight>Portabilité</Highlight> — recevoir vos données dans un format structuré</li>
              <li><Highlight>Opposition</Highlight> — vous opposer à certains traitements</li>
              <li><Highlight>Limitation</Highlight> — demander la limitation du traitement</li>
            </ul>
            <br />
            Pour exercer ces droits, contactez : <Highlight>{EDITOR.email}</Highlight>
            <br /><br />
            Vous disposez également du droit d'introduire une réclamation auprès de
            la <Highlight>CNIL</Highlight> : www.cnil.fr
          </TermsSection>

          <TermsSection title="16. Cookies">
            L'Application utilise uniquement des cookies strictement nécessaires à
            son fonctionnement :
            <ul>
              <li><Highlight>Token de session</Highlight> — maintenir la connexion de l'utilisateur (7 jours)</li>
            </ul>
            Aucun cookie publicitaire ou analytique tiers n'est utilisé.
          </TermsSection>

          <TermsSection title="17. Mineurs">
            L'Application n'est pas destinée aux personnes de moins de 15 ans.
            L'Éditeur ne collecte pas sciemment de données personnelles concernant
            des mineurs de moins de 15 ans.
          </TermsSection>

          <TermsSection title="18. Modifications de la politique">
            Cette politique peut être mise à jour pour refléter les évolutions de
            l'Application ou les exigences légales. La date de dernière mise à jour
            est indiquée en haut du document. En cas de modification substantielle,
            les utilisateurs seront notifiés par e-mail ou via l'Application.
          </TermsSection>
        </div>

        {/* ── Note de bas de page ── */}
        <footer className={styles.footer}>
          <Text size="sm" align="center" className={styles.footerText}>
            Document non contractuel — Version bêta — {EDITOR.version}
            <br />
            Pour toute question : <Highlight>{EDITOR.email}</Highlight>
          </Text>
        </footer>

      </div>
    </Surface>
  );
}