import styles from "./SkeletonBox.module.css";

type Props = {
  width?: string | number;
  height?: string | number;
  radius?: string;
  className?: string;
};

export function SkeletonBox({
  width = "100%",
  height = "1rem",
  radius = "var(--radius-sm)",
  className,
}: Props) {
  return (
    <div
      className={[styles.skeleton, className]
        .filter(Boolean)
        .join(" ")}
      style={{
        width,
        height,
        borderRadius: radius,
      }}
      aria-hidden="true"
    />
  );
}