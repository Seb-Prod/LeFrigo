import { Surface } from "@/components/ui";
import {
  DiscoverHero,
  RecipeHighlight,
  RecipeSpotlight,
} from "../components";
import styles from "./DiscoverPage.module.css";

export function DiscoverPage() {
  return (
    <Surface fullScreen>
      <>
        <DiscoverHero />
        
        <div className={styles.body}>
          <RecipeHighlight  />
          <RecipeSpotlight />
        </div>
      </>
    </Surface>
  );
}
