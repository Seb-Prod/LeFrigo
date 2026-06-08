import { Heading } from "../Heading";
import { Text } from "../Text";
import styles from "./FormCard.module.css";

type Props = {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

export function FormCard({ icon, title, description, children }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        {icon && <div className={styles.icon}>{icon}</div>}
        {title && <Heading align="center">{title}</Heading>}
        {description && (
          <Text align="center" size="lg">
            {description}
          </Text>
        )}
        {children}
      </div>
    </div>
  );
}
