"use client";

import { Button, Input } from "@/components/ui";
import { SyntheticEvent, useState } from "react";
import styles from "./RecipeForm.module.css";

type Props = {
  onSubmit: (name: string) => Promise<void>;
};

export function RecipeForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) return;

    try {
      setIsSubmitting(true);

      await onSubmit(name);
      setName("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        className={styles.input}
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Nom de la recette"
      />

      <Button type="submit" disabled={isSubmitting}>Ajouter</Button>
    </form>
  );
}
