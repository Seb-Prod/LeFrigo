"use client";

import styles from "./AuthForm.module.css";
import {
  Modal,
  Heading,
  Logo,
  Text,
  Button,
  Checkbox,
  Alert,
  InputUserName,
  InputEmail,
  InputPassword,
} from "@/components/ui";
import Link from "next/link";
import { useAuthForm } from "../../hooks/useAuthForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

/**
 * Modal d'authentification affichant un formulaire de connexion ou d'inscription.
 *
 * - Délègue toute la logique métier à `useAuthForm`
 * - Bascule entre les modes `login` et `register` via `handleToggleMode`
 * - Affiche une alerte de succès après un register confirmé
 * - Affiche les erreurs Zod par champ et les erreurs globales en bas de formulaire
 */
export function AuthForm({ open, onClose }: Props) {
  const form = useAuthForm(onClose);

  const isLogin = form.mode === "login";

  return (
    <Modal open={open} onClose={onClose} animation="slideUp" header={<Logo />}>
      {/* ── Titre ── */}
      <Heading align="center">{form.label.heading}</Heading>

      {/* ── Bascule login / register ── */}
      <div className={styles.toggle}>
        <Text>{form.label.question}</Text>
        <button
          type="button"
          className={styles.toggleLink}
          onClick={form.handleToggleMode}
        >
          <Text>{form.label.toggle}</Text>
        </button>
      </div>

      {/* ── Succès register ── */}
      {form.success ? (
        <Alert color="success">
          Votre compte a bien été créé ! Vérifiez votre boîte mail et cliquez
          sur le lien de confirmation pour activer votre compte.
        </Alert>
      ) : (
        /* ── Formulaire ── */
        <form
          onSubmit={isLogin ? form.handleLogin : form.handleRegister}
          className={styles.form}
        >
          {/* ── Champs register uniquement ── */}
          {!isLogin && (
            <InputUserName
              placeholder="Pseudo"
              required
              error={!!form.errors.userName}
              value={form.fields.userName}
              onChange={form.setField("userName")}
            />
          )}

          {/* ── Champs communs ── */}
          <InputEmail
            placeholder="Email"
            required
            error={!!form.errors.email}
            value={form.fields.email}
            onChange={form.setField("email")}
          />
          <InputPassword
            placeholder="Mot de passe"
            required
            error={!!form.errors.password}
            value={form.fields.password}
            onChange={form.setField("password")}
          />

          {/* ── Confirmation mot de passe (register uniquement) ── */}
          {!isLogin && (
            <InputPassword
              placeholder="Confirmez le mot de passe"
              required
              error={!!form.errors.confirmPassword}
              value={form.fields.confirmPassword}
              onChange={form.setField("confirmPassword")}
            />
          )}

          <Link href={form.label.link} className={styles.link}>
            {form.label.linkLabel}
          </Link>

          <Checkbox
            id="signupcheck"
            label={form.label.checkbox}
            checked={isLogin ? form.fields.rememberMe : form.fields.accept}
            onChange={form.setField(isLogin ? "rememberMe" : "accept")}
            className={styles.checkbox}
          />

          <Button type="submit" disabled={form.loading}>
            {form.loading ? form.label.buttonLoading : form.label.button}
          </Button>

          {/* ── Erreurs globales ── */}
          {form.errorMessages.length > 0 && (
            <Alert color="error">
              <ul>
                {form.errorMessages.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}
        </form>
      )}
    </Modal>
  );
}