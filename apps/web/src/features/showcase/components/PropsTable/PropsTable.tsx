import { ColumnDefinition, Table } from "@/components/ui/Table/Table";


export type PropDefinition = {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
};

type PropsTableProps = {
  props: PropDefinition[];
};

/** Colonnes du tableau de props, définies une seule fois hors du composant */
const columns: ColumnDefinition<PropDefinition>[] = [
  {
    key: "name",
    header: "Prop",
    render: (prop) => <code>{prop.name}</code>,
  },
  {
    key: "type",
    header: "Type",
    render: (prop) => <code>{prop.type}</code>,
  },
  {
    key: "default",
    header: "Défaut",
    render: (prop) =>
      prop.defaultValue ? <code>{prop.defaultValue}</code> : "—",
  },
  {
    key: "description",
    header: "Description",
    render: (prop) => prop.description,
  },
];

/**
 * Tableau affichant la documentation des props d'un composant.
 *
 * États visuels :
 * - Cas normal : une ligne par prop, avec nom / type / défaut / description
 * - Cas vide : message "Aucune prop" si `props` est vide
 */
export function PropsTable({ props }: PropsTableProps) {
  return (
    <Table
      data={props}
      columns={columns}
      getRowKey={(prop) => prop.name}
      emptyMessage="Aucune prop"
    />
  );
}