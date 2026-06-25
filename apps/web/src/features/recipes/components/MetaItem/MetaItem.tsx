import styles from "./MetaItem.module.css";
import { ReactNode } from "react";
import {
  TbChefHat,
  TbClockHour4,
  TbFlame,
  TbHourglass,
  TbUsers,
} from "react-icons/tb";
import { formatMetaValue } from "../../utils/recipe-meta.utils";
import { Text } from "@/components/ui";
import clsx from "clsx";

/** Clés des métadonnées affichables sur une recette */
type RecipeMeta = "preparation" | "cooking" | "rest" | "total" | "serving";

/**
 * Configuration statique des métadonnées de recette.
 * Associe à chaque clé son icône, son libellé et son mode de formatage.
 *
 * @remarks
 * Déclaré hors du composant pour éviter de recréer les nœuds JSX à chaque rendu.
 */
const META_MAP: Record<
  RecipeMeta,
  { icon: ReactNode; label: string; isTime?: boolean }
> = {
  preparation: { icon: <TbChefHat />,    label: "Préparation", isTime: true  },
  cooking:     { icon: <TbFlame />,      label: "Cuisson",     isTime: true  },
  rest:        { icon: <TbHourglass />,  label: "Repos",       isTime: true  },
  total:       { icon: <TbClockHour4 />, label: "Total",       isTime: true  },
  serving:     { icon: <TbUsers />,      label: "Portions",    isTime: false },
};

type Props = {
  /** Clé de la métadonnée à afficher */
  recipeMeta: RecipeMeta;
  /** Valeur brute en minutes (durées) ou en unité entière (portions). `null` affiche "-" */
  value: number | null;
};

/**
 * Cellule affichant une métadonnée de recette (durée ou portions).
 *
 * Résout la configuration depuis `META_MAP` et délègue le formatage
 * à `formatMetaValue`. Les durées sont converties en format lisible
 * (`"90"` → `"1 h 30 min"`), les portions sont affichées telles quelles.
 * Les variantes `total` et `serving` reçoivent une couleur d'accentuation distincte.
 *
 * @example
 * <MetaItem recipeMeta="preparation" value={30} />  // "30 min"
 * <MetaItem recipeMeta="serving"     value={4} />   // "4"
 * <MetaItem recipeMeta="cooking"     value={null} /> // "-"
 */
export function MetaItem({ recipeMeta, value }: Props) {
  const { icon, label, isTime } = META_MAP[recipeMeta];

  /** Normalise `number | null` en `string | null` pour `formatMetaValue` */
  const formattedValue = formatMetaValue(
    value != null ? String(value) : null,
    isTime,
  );

  /** Classe de variante colorée pour `total` et `serving`, vide sinon */
  const variantClass = [
    recipeMeta === "total"   && styles.total,
    recipeMeta === "serving" && styles.serving,
  ].filter(Boolean).join(" ");

  return (
    <div className={clsx(styles.metaItem, variantClass)}>
      {/* ── Icône ── */}
      <Text className={styles.metaIcon}>{icon}</Text>

      {/* ── Libellé ── */}
      <Text className={styles.metaLabel}>{label}</Text>

      {/* ── Valeur formatée ── */}
      <Text className={styles.metaValue}>{formattedValue}</Text>
    </div>
  );
}