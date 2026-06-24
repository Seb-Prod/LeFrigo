/* eslint-disable react/no-unescaped-entities */
import { Heading, Text, Highlight } from "@/components/ui";
import { TermsList, TermsSection } from "@/features/terms/components";
import { EDITOR } from "@/features/terms/constant/editor";
import styles from "./PrivacyPolicy.module.css";

/**
 * Bloc « Politique de Confidentialité » de la page légale (articles 9 à 18).
 *
 * Couvre l'ensemble des obligations RGPD : responsable du traitement,
 * données collectées, durées de conservation, sécurité, droits des
 * utilisateurs, cookies et gestion des mineurs.
 *
 * @remarks
 * Ce composant est purement déclaratif : aucun état, aucun effet.
 * Les coordonnées de l'éditeur sont injectées via la constante `EDITOR`.
 * Les sections sont numérotées en continuité des CGU (qui couvrent 1 à 8).
 *
 * @example
 * <PrivacyPolicy />
 */
export function PrivacyPolicy() {
  return (
    <div className={styles.document}>
      {/* ── Titre du bloc et mention RGPD ── */}
      <Heading
        as="h2"
        size="lg"
        align="center"
        className={styles.documentTitle}
      >
        Politique de Confidentialité
      </Heading>
      <Text size="sm" className={styles.rgpdNote}>
        Conformément au Règlement Général sur la Protection des Données (RGPD)
      </Text>

      {/* ── 9. Identité et contact du responsable de traitement ── */}
      <TermsSection title="9. Responsable du traitement">
        Responsable : <Highlight>{EDITOR.name}</Highlight>
        <br />
        Contact : <Highlight>{EDITOR.email}</Highlight>
      </TermsSection>

      {/* ── 10. Inventaire complet des données collectées ── */}
      <TermsSection title="10. Données collectées">
        {/* ── 10.1 Données saisies volontairement à l'inscription ── */}
        <TermsSection
          title="10.1 Données fournies lors de l'inscription"
          level="h3"
        >
          <TermsList>
            <li>
              <Highlight>Adresse e-mail</Highlight> — identification,
              vérification du compte, réinitialisation du mot de passe
            </li>
            <li>
              <Highlight>Nom d'utilisateur</Highlight> — identification publique
              sur l'Application
            </li>
            <li>
              <Highlight>Mot de passe (hashé)</Highlight> — authentification
              sécurisée
            </li>
          </TermsList>
        </TermsSection>

        {/* ── 10.2 Données techniques collectées à chaque session ── */}
        <TermsSection
          title="10.2 Données collectées automatiquement"
          level="h3"
        >
          <TermsList>
            <li>
              <Highlight>User-Agent</Highlight> — gestion des sessions actives,
              sécurité
            </li>
            <li>
              <Highlight>Date et heure de connexion</Highlight> — gestion des
              sessions, sécurité
            </li>
            <li>
              <Highlight>Adresse IP</Highlight> — sécurité, protection contre
              les abus
            </li>
          </TermsList>
        </TermsSection>

        {/* ── 10.3 Données expressément exclues du périmètre de collecte ── */}
        <TermsSection title="10.3 Données non collectées" level="h3">
          L'Application ne collecte pas de données de géolocalisation, de
          données de navigation à des fins publicitaires, ni de données
          sensibles (santé, origine, opinions politiques, etc.).
        </TermsSection>
      </TermsSection>

      {/* ── 11. Usage transactionnel des e-mails, zéro marketing ── */}
      <TermsSection title="11. Utilisation des e-mails">
        Les e-mails sont utilisés uniquement pour :
        <TermsList>
          <li>Vérifier l'adresse e-mail lors de l'inscription</li>
          <li>Réinitialiser le mot de passe à la demande de l'utilisateur</li>
        </TermsList>
        Aucun e-mail marketing ou newsletter n'est envoyé sans consentement
        explicite.
      </TermsSection>

      {/* ── 12. Durées de rétention par catégorie de donnée ── */}
      <TermsSection title="12. Durée de conservation">
        <TermsList>
          <li>
            <Highlight>Données de compte</Highlight> — jusqu'à la suppression du
            compte par l'utilisateur
          </li>
          <li>
            <Highlight>Tokens de session</Highlight> — 7 jours (expiration
            automatique)
          </li>
          <li>
            <Highlight>Logs de connexion</Highlight> — 30 jours glissants
          </li>
          <li>
            <Highlight>Liens de vérification / réinitialisation</Highlight> — 24
            heures (expiration automatique)
          </li>
        </TermsList>
      </TermsSection>

      {/* ── 13. Localisation des serveurs et garanties de transfert hors UE ── */}
      <TermsSection title="13. Hébergement des données">
        Les données sont hébergées au sein de l'Union Européenne. En cas de
        transfert hors UE, des garanties appropriées (clauses contractuelles
        types de la Commission européenne) seront mises en place.
      </TermsSection>

      {/* ── 14. Mesures techniques de sécurité mises en œuvre ── */}
      <TermsSection title="14. Sécurité">
        L'Éditeur met en œuvre les mesures techniques suivantes pour protéger
        vos données :
        <TermsList>
          <li>Mots de passe hashés (bcrypt)</li>
          <li>Authentification par tokens JWT avec expiration</li>
          <li>Rotation des tokens de rafraîchissement</li>
          <li>Liaison des sessions au User-Agent</li>
          <li>Verrouillage de compte après tentatives échouées répétées</li>
        </TermsList>
      </TermsSection>

      {/* ── 15. Droits RGPD et modalités d'exercice auprès de l'éditeur ── */}
      <TermsSection title="15. Vos droits (RGPD)">
        Conformément au RGPD, vous disposez des droits suivants sur vos données
        :
        <TermsList>
          <li>
            <Highlight>Accès</Highlight> — obtenir une copie de vos données
            personnelles
          </li>
          <li>
            <Highlight>Rectification</Highlight> — corriger des données
            inexactes
          </li>
          <li>
            <Highlight>Effacement</Highlight> — demander la suppression de votre
            compte et de vos données
          </li>
          <li>
            <Highlight>Portabilité</Highlight> — recevoir vos données dans un
            format structuré
          </li>
          <li>
            <Highlight>Opposition</Highlight> — vous opposer à certains
            traitements
          </li>
          <li>
            <Highlight>Limitation</Highlight> — demander la limitation du
            traitement
          </li>
        </TermsList>
        Pour exercer ces droits, contactez :{" "}
        <Highlight>{EDITOR.email}</Highlight>
        <br />
        <br />
        Vous disposez également du droit d'introduire une réclamation auprès de
        la <Highlight>CNIL</Highlight> : www.cnil.fr
      </TermsSection>

      {/* ── 16. Politique cookies : session uniquement, zéro tiers ── */}
      <TermsSection title="16. Cookies">
        L'Application utilise uniquement des cookies strictement nécessaires à
        son fonctionnement :
        <TermsList>
          <li>
            <Highlight>Token de session</Highlight> — maintenir la connexion de
            l'utilisateur (7 jours)
          </li>
        </TermsList>
        Aucun cookie publicitaire ou analytique tiers n'est utilisé.
      </TermsSection>

      {/* ── 17. Restriction d'accès aux moins de 15 ans ── */}
      <TermsSection title="17. Mineurs">
        L'Application n'est pas destinée aux personnes de moins de 15 ans.
        L'Éditeur ne collecte pas sciemment de données personnelles concernant
        des mineurs de moins de 15 ans.
      </TermsSection>

      {/* ── 18. Procédure de mise à jour et notification des utilisateurs ── */}
      <TermsSection title="18. Modifications de la politique">
        Cette politique peut être mise à jour pour refléter les évolutions de
        l'Application ou les exigences légales. La date de dernière mise à jour
        est indiquée en haut du document. En cas de modification substantielle,
        les utilisateurs seront notifiés par e-mail ou via l'Application.
      </TermsSection>
    </div>
  );
}
