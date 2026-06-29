import { InputSkeleton } from "@/components/ui";
import styles from "./RecipesTopbar.module.css";
import stylesSkeleton from "@/features/recipes/styles/skeleton.module.css"

type Props = {
  isSkeleton?: boolean;
};

export function RecipesTopbar({ isSkeleton }: Props) {
  if (isSkeleton) {
    return (
      <InputSkeleton iconLeft/>
    );
  }

  return <div>ddd</div>;
}
