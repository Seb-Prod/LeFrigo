const APP_URL = process.env.APP_URL ?? "http://localhost:5173";

export const verificationEmailTemplate = (token: string) => {
  const url = `${APP_URL}/verify-email?token=${token}`;

  return `
        <h1>Bienvenue sur LeFrogo</h1>

        <p>
            Cliquez sur le lien ci-sessous pour confirmer votre adresse email.
        </p>

        <a href=“${url}">
            Valider mon adresse email
        </a>
        `;
};

export const resetPasswordTemplate = (token: string) => {
  const url = `${APP_URL}/reset-password?token=${token}`;

  return `
        <h1>Réinitialisation du mot de passe</h1>

        <p>
            Cliquez sur le lien suivant pour définir un nouveau mot de passe.
        </p>

        <a href="${url}">
            Réinitialiser mon mot de passe
        </a>
        `;
};
