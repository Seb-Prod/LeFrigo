import clsx from "clsx";
import styles from "./Card.module.css";

type Props = {
  variant?: "default" | "primary" | "danger" | "warning" | "info" | "success";
  clickable?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className, variant = "default", clickable = false }: Props) {
  return (
    <div className={clsx(styles.card, styles[variant], { [styles.clickable]: clickable }, className)}>
      {children}
    </div>
  );
}