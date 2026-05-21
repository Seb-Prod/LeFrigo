import styles from "./Button.module.css";

type Variant =
  | "primary"
  | "secondary"
  | "danger";

type Props =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
  };

export function Button({
  variant = "primary",
  className,
  ...props
}: Props) {
  return (
    <button
      className={[
        styles.button,
        styles[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}