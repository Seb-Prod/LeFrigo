import Link from "next/link";
import { Text } from "../Text";
import styles from "./ErrorState.module.css";
import { Surface } from "../Surface";

type Props = {
  title?: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
};

export function ErrorState({
  title = "Une erreur est survenue",
  message,
  actionLabel,
  actionHref,
}: Props) {
  return (
    <Surface fullScreen>
      <span className={styles.icon}>⚠️</span>

      <h2 className={styles.title}>{title}</h2>

      <Text>{message}</Text>

      {actionLabel && actionHref && (
        <Link href={actionHref}>{actionLabel}</Link>
      )}
    </Surface>
  );
}
