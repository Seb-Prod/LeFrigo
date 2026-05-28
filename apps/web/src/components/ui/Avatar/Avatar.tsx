import styles from "./Avatar.module.css";

type AvatarSize = "sm" | "md" | "lg";

type Props = {
  username: string;
  size?: AvatarSize;
  className?: string;
};

function getInitials(username: string): string {
  return username.slice(0, 2).toUpperCase();
}

export function Avatar({ username, size = "md", className = "" }: Props) {
  return (
    <div
      className={`${styles.avatar} ${styles[size]}  ${className} `}
      aria-label={`Avatar de ${username}`}
    >
      {getInitials(username)}
    </div>
  );
}
