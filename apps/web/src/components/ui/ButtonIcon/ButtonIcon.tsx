import clsx from "clsx";
import styles from "./ButtonIcon.module.css";

export type Size = "sm" | "md" | "lg";
export type Variant =
  | "default"
  | "primary"
  | "accent"
  | "danger"
  | "success"
  | "info"
  | "warning";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: Size;
  variant?: Variant;
};

export function ButtonIcon({
  size = "md",
  variant = "default",
  className,
  ...props
}: Props) {
  return (
    <button
      type="button"
      {...props}
      className={clsx(styles.button, styles[size], styles[variant], className)}
    />
  );
}
