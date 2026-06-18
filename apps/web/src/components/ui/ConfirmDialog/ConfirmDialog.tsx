import { Modal } from "../Modal";
import { Button } from "../Button/Button";
import { Text } from "../Text";
import styles from "./ConfirmDialog.module.css";
import { Heading } from "../Heading";

type Props = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  onConfirm,
  onClose,
}: Props) {
  return (
    <Modal open={open} onClose={onClose} header={<Heading align="center">{title}</Heading>}>
      <div className={styles.content}>
        <Text size="lg">{description}</Text>

        <div className={styles.actions}>
          <Button onClick={onClose}>
            {cancelLabel}
          </Button>

          <Button variant="ghost" color="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}