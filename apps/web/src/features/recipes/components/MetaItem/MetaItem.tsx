import { IconType } from "react-icons";
import styles from "./MetaItem.module.css";
import { ReactNode } from "react";
import { TbChefHat, TbClockHour4, TbFlame, TbHourglass, TbUsers } from "react-icons/tb";

type RecipeMeta = "preparation" | "cooking" | "rest" | "total" | "serving";

const META_MAP: Record<RecipeMeta, {icon: ReactNode, label:string}> ={
    preparation: {
        icon: <TbChefHat />,
        label: "Préparation"
    },
    cooking: {
        icon: <TbFlame />,
        label: "Cuisson"
    },
    rest: {
        icon: <TbHourglass />,
        label: "Repos"
    },
    total: {
        icon: <TbClockHour4 />,
        label: "Total"
    },

    serving: {
        icon: <TbUsers/>,
        label: "Portions"
    }
}

type MetaItemProps = {
  recipeMeta: RecipeMeta;
  value: string | null;
};

export function MetaItem({ recipeMeta, value }: MetaItemProps) {
    const {icon, label} = META_MAP[recipeMeta];
  return (
    <div className={styles.metaItem}>
      <span className={styles.metaIcon}>{icon}</span>
      <span className={styles.metaLabel}>{label}</span>
      <span className={styles.metaValue}>{value}</span>
    </div>
  );
}
