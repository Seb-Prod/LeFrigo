import { SkeletonBox } from "../../SkeletonBox";
import styles from "./InputSkeleton.module.css";

type Props = {
  iconLeft?: boolean;
  iconRight?: boolean;
};

export function InputSkeleton({
  iconLeft = false,
  iconRight = false,
}: Props) {
  return (
    <div className={styles.wrapper}>
      {iconLeft && (
        <span className={styles.iconLeft}>
          <SkeletonBox width={18} height={18} radius="50%" />
        </span>
      )}

      <SkeletonBox
        className={styles.input}
        height={48}
        radius="var(--radius-md)"
      />

      {iconRight && (
        <span className={styles.iconRight}>
          <SkeletonBox width={18} height={18} radius="50%" />
        </span>
      )}
    </div>
  );
}