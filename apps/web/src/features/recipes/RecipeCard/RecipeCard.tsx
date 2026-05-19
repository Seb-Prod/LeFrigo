import { Card } from "@/components/ui";

type Props = {
  name: string;
};

export default function RecipeCard({ name }: Props) {
  return (
    <Card>
      <h3>{name}</h3>
    </Card>
  );
}
