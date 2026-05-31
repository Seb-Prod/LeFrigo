import clsx from "clsx";
import styles from "./ButtonIcon.module.css";

type Size = "sm" | "md" | "lg";
type Variant = "default" | "primary" | "accent" |"danger" | "success" | "info" | "warning";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: Size;
  variant?: Variant;
};

export function ButtonIcon({ size = "md", variant = "default", ...props }: Props) {
  return (
    <button
      {...props}
      className={clsx(styles.button, styles[size], styles[variant])}
    />
  );
}