import { BsAndroid2 } from "react-icons/bs";
import { FaApple } from "react-icons/fa";
import { MdDevicesOther } from "react-icons/md";
import clsx from "clsx";
import styles from "./DeviceIcon.module.css";
import { Os } from "../../hooks/usePwaInstall";

interface Props {
  device: Os;
}

/**
 * Icône représentant l'OS détecté sur l'appareil de l'utilisateur.
 * Applique une classe CSS spécifique à l'OS via `styles[device]`.
 */
export function DeviceIcon({ device }: Props) {
  return (
    <div className={clsx(styles.device, styles[device])}>
      {device === "ios" && <FaApple />}
      {device === "android" && <BsAndroid2 />}
      {device === "other" && <MdDevicesOther />}
    </div>
  );
}