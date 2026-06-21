import { Surface } from "@/components/ui";
import {
  DiscoverHero,
  MemberPerks,
  RecipeHighlight,
  RecipeSpotlight,
} from "../components";
import styles from "./DiscoverPage.module.css";

export function DiscoverPage() {
  return (
    <Surface fullScreen>
      <>
        <DiscoverHero />
        <RecipeHighlight />
        <div className={styles.body}>
          <MemberPerks />
          <RecipeSpotlight />
        </div>
      </>
    </Surface>
  );
}
