import { Input } from "../../Input";
import { FiSearch } from "react-icons/fi";

type Props = Omit<React.ComponentProps<typeof Input>, "type">;

/**
 * Champ de saisie pour la recherche, avec icône loupe.
 *
 * @example
 * <InputSearch
 *   placeholder="Rechercher"
 *   value={search}
 *   onChange={(e) => setSearch(e.target.value)}
 * />
 */
export function InputSearch({ className, ...props }: Props) {
  return (
    <Input
      {...props}
      type="text"
      iconLeft={<FiSearch />}
      className={className}
    />
  );
}